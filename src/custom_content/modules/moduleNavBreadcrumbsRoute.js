import React from 'react';
import NavBreadcrumbsRoute from '../../system/codes/navBreadcrumbsRoute';

/**
 * Local Module NavBreadcrumbsRoute
 *
 * In order to change the navigation/breadcrumbs or the routes, you needed to change the configuration.js in the custom content.
 *
 * options::->
 *
 * displayHomeName (OPTIONAL):: Boolean, true to display the word 'Home' when the path is: '/'. False by default.
 *
 * isDisplayBreadcrumbRoot (OPTIONAL):: Boolean, true to display the breadcrumbs in the root path: '/'. False by default.
 *
 * For more information, please look in the component itself.
 */
const ModuleNavBreadcrumbsRoute = () => (
  <NavBreadcrumbsRoute options={{displayHomeName: true, isDisplayBreadcrumbRoot: false}} />
)

export default ModuleNavBreadcrumbsRoute;