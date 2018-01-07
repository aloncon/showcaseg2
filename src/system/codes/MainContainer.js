import React from 'react';
import MediaQuery from 'react-responsive';
import { NavigationVertical } from './Navigation';
import configuration from '../../custom_content/configuration';
import WcShowcase, {partnerDefPromise} from './moduleInfo';
import ShouldDisplay from './ShouldDisplay'

const { staticRoutes, moduleName } = configuration;
const { isStandalone } = WcShowcase;
/**
 * This is the App main container, it checks if there is a need to display the vertical navigation or not.
 * While handling the width for it children which are all the App components.
 *
 * The component decided to display the navigation by checking:
 *          * If `displayVerticalNavigation` is true.
 *            Which is mean that is not standalone and get true from the provider center.
 *          * Media query width.
 *          * If this is a mobile device.
 *          * The page have `meta[name="viewport"]` element.
 *
 * PROPS::
 *
 * `customExtraClasses` (OPTIONAL):: Add other classes to the main container.
 */
class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileJsonLoaded: false
    }
    this.classNameWidth = this.getClassContainerFull();
    this.VerticalNavigation = null;
    this.mainContentStyle = undefined;
  }
  componentWillMount(){
    Promise.resolve(partnerDefPromise)
    .then(function(value) {
      this.setState({profileJsonLoaded:true});
    }.bind(this));
  }
  getClassContainerFull() {
    return 'wcContainer wcContainerFull';
  }

  getClassContainerSmaller() {
    return 'wcContainer wcContainerSmallerVerticalNav';
  }

  mobileCheck() {
    const stringCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const viewPortElementCheck = document.querySelector('meta[name="viewport"]');

    return (stringCheck && viewPortElementCheck) ? true : false;
  }

  render() {
    const { customExtraClasses } = this.props;

    return (
      <MediaQuery query="(min-width: 641px)">
        {this.state.profileJsonLoaded ? matches => {
          if ( !isStandalone && ShouldDisplay({'wc_section': 'wc_navigation_vertical'}) && !this.mobileCheck() && matches ) {
            this.classNameWidth = this.getClassContainerSmaller();
            this.mainContentStyle = {
              paddingLeft: "5px"
            };
            this.VerticalNavigation = <NavigationVertical routesConfiguration={staticRoutes} moduleName={moduleName} />;
          } else {
            this.classNameWidth = this.getClassContainerFull();
            this.mainContentStyle = undefined;
            this.VerticalNavigation = null;
          }
          return (
            <div style={{ display: 'flex' }}>
              {this.VerticalNavigation}
              <div className={`${this.classNameWidth}${customExtraClasses ? ' ' + customExtraClasses: ''}`} style={this.mainContentStyle}>{this.props.children}</div>
            </div>
          );
        }: null}
      </MediaQuery>
    );
  }
}

export default MainContainer;
