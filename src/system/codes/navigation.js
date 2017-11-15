import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Bootstrap navigation - Create the nav links with looping the static routes from the configuration data using the [path,name].
 *
 * Props::
 *
 * config (MANDATORY):: JSON object, holds the the static routes configuration.
 *
 * routesExclude (OPTIONAL):: String of regex expression of routes you wish to exclude from the navigation for example: routesExclude=`(Product Listing1|Endpoint Solutions|iframe)`
 *
 * TODO: Add implementation to add li.className="active" to the active item.
 */
class navBarHorizontal extends React.Component {

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
             {/* <NavLink to="/" className="navbar-brand">
                HOME
    </NavLink> */}
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">

                {config.map(route => {
                  // Exclude routes from the navigation
                  if (routesExcludeTest(route.name)) return;

                  // We handle the root path om the first NavLink above 'Home'
                  if (route.path === '/') return;

                  return (
                    <li key={route.path}>
                      <NavLink to={route.path}>{route.name}</NavLink>
                    </li>
                  );
                })}

              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default navBarHorizontal;
