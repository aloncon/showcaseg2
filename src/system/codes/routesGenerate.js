import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

/**
 * Generate the routes looping the static routes from the configuration data.
 *
 * Props::
 *
 * config (MANDATORY):: JSON object, holds the the static routes configuration.
 */
const RoutesGenerate = ({ landingpageRouteID, config, getPath }) => {
  const routesConfig = config;

  return (
    <Switch>
      {routesConfig.map(route => {
        const propsRoutes = {
          key: route.id,
          path: route.id,
          component: route.component,
        };

        propsRoutes.path = getPath(route.id,route.parent);

        if (route.notExact === undefined || route.notExact === false) propsRoutes['exact'] = true;

        return <Route {...propsRoutes} />;
      })}
      <Redirect from="/" to={landingpageRouteID} />
    </Switch>
  );
};

export default RoutesGenerate;
