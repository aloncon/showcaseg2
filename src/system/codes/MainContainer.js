import React from 'react';
import { NavigationVertical } from './Navigation';
import configuration from './configuration';
import WcShowcase, { partnerDefPromise } from './moduleInfo';

const { staticRoutes, moduleName } = configuration;
const {  entry, displayVerticalNavigation } = WcShowcase;

/**
 * This is the App main container, it checks if there is a need to display the vertical navigation or not.
 * While handling the width for it`s children which are all the App components.
 *
 * The component decides whether to display the navigation by checking the following:
 *          * If `displayVerticalNavigation` is true.
 *            Which means that it is not standalone and get true from the provider center.
 *          * Media query width.
 *          * If this is a mobile device.
 *          * The page has `meta[name="viewport"]` element.
 *
 * PROPS::
 *
 * `customExtraClasses` (OPTIONAL):: Add other classes to the main container.
 */
class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileJsonLoaded: false,
    };
    this.classNameWidth = this.getClassContainerFull();
    this.VerticalNavigation = null;
    this.mainContentStyle = undefined;
  }
  componentWillMount() {
    Promise.resolve(partnerDefPromise).then(
      function(value) {
        const moduleEntry = (!entry)?staticRoutes.setEntry(value.landing_entry_point):staticRoutes.setEntry(entry);
        this.setState({ profileJsonLoaded: true });
      }.bind(this),
    );
  }
  getClassContainerFull() {
    return ' wcContainerFull';
  }

  getClassContainerSmaller() {
    return ' wcContainerSmallerVerticalNav';
  }

  setVariables(size) {
    if (displayVerticalNavigation(size)) {
      this.classNameWidth = this.getClassContainerSmaller();
      this.VerticalNavigation = <NavigationVertical routesConfiguration={staticRoutes} moduleName={moduleName} />;
    } else {
      this.classNameWidth = this.getClassContainerFull();
      this.mainContentStyle = undefined;
      this.VerticalNavigation = null;
    }

    return true;
  }

  render() {
    const { customExtraClasses } = this.props;
    const size = this.props.responsiveStore.wcRootSize;

    return (
      this.state.profileJsonLoaded ? this.setVariables(size) &&
      (<div style={{ display: 'flex' }}>
        {this.VerticalNavigation}
        <div className={`wcContainer${this.classNameWidth}${customExtraClasses ? ' ' + customExtraClasses : ''}`}>
          {this.props.children}
        </div>
      </div>)
      : null
    );
  }
}

export default MainContainer;
