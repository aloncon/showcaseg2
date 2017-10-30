import React from 'react';
import { Route } from 'react-router-dom';

/**
 * Generate the routes looping the static routes from the configuration data.
 *
 * Props::
 *
 * config (MANDATORY):: JSON object, holds the the static routes configuration.
 */
class RoutesGenerate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { routesConfig: props.config };
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.routesConfig).map(route => {
          const propsRoutes = {
            key: this.state.routesConfig[route].path,
            path: this.state.routesConfig[route].path,
            component: this.state.routesConfig[route].component,
          };

          if (this.state.routesConfig[route].path === '/') propsRoutes['exact'] = true;

          return <Route {...propsRoutes}/>;
        })}
      </div>
    );
  }
}

export default RoutesGenerate;