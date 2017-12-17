import React from 'react';
import RoutesGenerate from './routesGenerate';
import { NavigationHorizontal } from './Navigation';
import Breadcrumbs from './breadcrumbs';
import configuration from '../../custom_content/configuration';
import WcpcContent from '../../system/codes/WcpcContent';

const { staticRoutes } = configuration;

/**
 * Component that hold the three components:
 *
 * Navigation, Breadcrumbs and RoutesGenerate
 *
 * props::
 *
 * config (MANDATORY):: JSON object, holds the the static routes configuration.
 *
 * options (OPTIONAL):: Options for the Breadcrumbs component. Holds displayRootNameAsHome, isDisplayBreadcrumbRoot and customRender.
 *
 */
const NavBreadcrumbsRoute = ({ options }) => (
  <div>
    <WcpcContent wc_section="wc_navigation_horizontal"> <NavigationHorizontal routesConfiguration={staticRoutes} /> </WcpcContent>
    <WcpcContent wc_section="wc_bread_crumbs"><Breadcrumbs config={staticRoutes.routesDetails} options={options} getPath={staticRoutes.getPath}/> </WcpcContent>
    <RoutesGenerate config={staticRoutes.routesDetails} getPath={staticRoutes.getPath}/>
  </div>
);

export default NavBreadcrumbsRoute;
