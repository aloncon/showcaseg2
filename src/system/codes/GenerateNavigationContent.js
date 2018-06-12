import React from 'react';
import { withRouter } from 'react-router-dom';
import { NavigationHorizontal } from './Navigation';
import Breadcrumbs from './breadcrumbs';
import configuration from './configuration';
import ShouldDisplay from '../../system/codes/ShouldDisplay';
import ResponsiveStore from '../../store/ResponsiveStore';

const { staticRoutes } = configuration;

/**
 * Component that hold the three components:
 *
 * Navigation, Breadcrumbs and GenerateRoutes
 *
 * props::
 *
 * config (MANDATORY):: JSON object, holds the the static routes configuration.
 *
 * options (OPTIONAL):: Options for the Breadcrumbs component. Holds displayRootNameAsHome, isDisplayBreadcrumbRoot and customRender.
 *
 */
const GenerateNavigationContent = ({ options, location }) => (
   <div>
      <ShouldDisplay wc_section="include-showcase-nav-bar">
         <NavigationHorizontal routesConfiguration={staticRoutes} responsiveStore={ResponsiveStore} location={location}/>
      </ShouldDisplay>
      <ShouldDisplay wc_section="include-bread-crumbs">
         <Breadcrumbs landingpageRouteID={staticRoutes.getLandingpageRouteID()} config={staticRoutes.getRoutes()} options={options} getPath={staticRoutes.getPath} />
      </ShouldDisplay>
   </div>
);

export default withRouter(GenerateNavigationContent);
