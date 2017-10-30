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
  constructor(props) {
    super(props);
    this.state = {
      config: props.config,
      routesExclude: new RegExp(props.routesExclude)
    };
  }

  render() {
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
              <NavLink to="/" className="navbar-brand">
                HOME
              </NavLink>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">

                {Object.keys(this.state.config).map(route => {
                  // Exclude routes from the navigation
                  if (this.state.routesExclude.test(this.state.config[route].name)) return;

                  // We handle the root path om the first NavLink above 'Home'
                  if (this.state.config[route].path === '/') return;

                  return (
                    <li key={this.state.config[route].path}>
                      <NavLink to={this.state.config[route].path}>{this.state.config[route].name}</NavLink>
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
