import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import configuration from './configuration';

const { staticRoutes } = configuration;

/**
 * Generate the routes looping the static routes from the configuration data.
 *
 */
const GenerateRoutes = () => {
   const landingpageRouteID = staticRoutes.getLandingpageRouteID(),
      routesConfig = staticRoutes.getRoutes(),
      getPath = staticRoutes.getPath;

   return (
      <Switch>
         {routesConfig.map(route => {
            const propsRoutes = {
               key: route.id,
               path: route.id,
               component: route.component,
            };

            propsRoutes.path = getPath(route.id, route.parent);

            if (route.notExact === undefined || route.notExact === false) propsRoutes['exact'] = true;

            return <Route {...propsRoutes} />;
         })}
         <Redirect from="/" to={landingpageRouteID} />
      </Switch>
   );
};

export default GenerateRoutes;
