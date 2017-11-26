import React from 'react';
import RoutesGenerate from './routesGenerate';
import { NavigationHorizontal } from './Navigation';
import Breadcrumbs from './breadcrumbs';
import configuration from '../../custom_content/configuration';
import WcpcContent from '../../system/codes/WcpcContent';

const { staticRoutes, routesExcludeTest } = configuration;

/**
 * Component that hold the three components:
 *
 * Navigation, Breadcrumbs and RoutesGenerate
 *
 * props::
 *
 * config (MANDATORY):: JSON object, holds the the static routes configuration.
 *
 * options (OPTIONAL):: Options for the Breadcrumbs component. Holds displayHomeName, isDisplayBreadcrumbRoot and customRender.
 *
 */
const NavBreadcrumbsRoute = ({ options }) => (
  <div>
    <WcpcContent wc_section_code={'wc_navigation_bar'}>
      <NavigationHorizontal config={staticRoutes} routesExcludeTest={routesExcludeTest} />
    </WcpcContent>
    <Breadcrumbs config={staticRoutes} options={options} />
    <hr />
    <RoutesGenerate config={staticRoutes} />
  </div>
);

export default NavBreadcrumbsRoute;
