import React from 'react';
import configuration from '../../custom_content/configuration';
import NavBreadcrumbsRoute from '../../system/codes/navBreadcrumbsRoute';

/**
 * Local Module NavBreadcrumbsRoute
 *
 * In order to change the navigation/breadcrumbs or the routes, you needed to change the configuration.js in the custom content.
 *
 * config (MANDATORY):: JSON object, holds the the static routes configuration.
 *
 * options::->
 *
 * routesExclude (OPTIONAL):: String of regex expression of routes you wish to exclude from the navigation for example: routesExclude=`(Product Listing1|Endpoint Solutions|iframe)`
 *
 * displayHomeName (OPTIONAL):: Boolean, true to display the word 'Home' when the path is: '/'. False by default.
 *
 * isDisplayBreadcrumbRoot (OPTIONAL):: Boolean, true to display the breadcrumbs in the root path: '/'. False by default.
 *
 * customRender (OPTIONAL):: Function(name,path), a custom way to display the name breadcrumbs.
 *
 * For more information, please look in the component itself.
 */
const ModuleNavBreadcrumbsRoute = () => (
  <NavBreadcrumbsRoute config={configuration.staticRoutes} options={{displayHomeName: true, isDisplayBreadcrumbRoot: false, routesExclude: '(Product Listing1)'}} />
)

export default ModuleNavBreadcrumbsRoute;