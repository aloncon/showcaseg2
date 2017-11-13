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
      {routesConfig.map(route => {
        const propsRoutes = {
          key: route.path,
          path: route.path,
          component: route.component,
        };

        if (route.notExact === undefined || route.notExact === false) propsRoutes['exact'] = true;

        return <Route {...propsRoutes} />;
      })}
    </div>
  );
};

export default RoutesGenerate;
