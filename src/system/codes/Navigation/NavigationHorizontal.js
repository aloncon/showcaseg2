import React from 'react';
import generateNavItems from './generateNavItems';

/**
 * Bootstrap navigation - Create the nav links with looping the static routes from the configuration data using the [path,name].
 *
 * Props::
 *
 * config (MANDATORY):: JSON object, holds the the static routes configuration.
 *
 * routesExcludeTest(routeName):: Function, check if the 'routeName' in the configuration.js need to be excluded by regex test the routesExclude string.
 *
 * TODO: Add implementation to add li.className="active" to the active item.
 */
class NavigationHorizontal extends React.Component {

  render() {
    const { config, routesExcludeTest } = this.props;

    return (
      <div className="wcContainer">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">

                {generateNavItems(config, routesExcludeTest)}

              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavigationHorizontal;
