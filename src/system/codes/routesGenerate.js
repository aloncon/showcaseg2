import React from 'react';
import { Route } from 'react-router-dom';

/**
 * Generate the routes looping the static routes from the configuration data.
 *
 * Props::
 *
 * config (MANDATORY):: JSON object, holds the the static routes configuration.
 */
const RoutesGenerate = ({ config, getPath }) => {
  const routesConfig = config;
  return (
    <div>
      {routesConfig.map(route => {
        
        const propsRoutes = {
          key: route.path,
          path: route.path,
          component: route.component,
        };

        propsRoutes.path = getPath(route.path,route.parent);
        

        if (route.notExact === undefined || route.notExact === false) propsRoutes['exact'] = true;
        // TODO: Add provider center check, is there way if not exists in thr JSON file to show the content by default?
        return <Route {...propsRoutes} />;
      })}
    </div>
  );
};

export default RoutesGenerate;
