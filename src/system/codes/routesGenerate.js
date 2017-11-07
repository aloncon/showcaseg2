import React from 'react';
import { Route } from 'react-router-dom';

/**
 * Generate the routes looping the static routes from the configuration data.
 *
 * Props::
 *
 * config (MANDATORY):: JSON object, holds the the static routes configuration.
 */
const RoutesGenerate = ({ config }) => {
  const routesConfig = config;
  return (
    <div>
      {Object.keys(routesConfig).map(route => {
        const propsRoutes = {
          key: routesConfig[route].path,
          path: routesConfig[route].path,
          component: routesConfig[route].component,
        };

        if (routesConfig[route].path === '/') propsRoutes['exact'] = true;

        return <Route {...propsRoutes} />;
      })}
    </div>
  );
};

export default RoutesGenerate;
