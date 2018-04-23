import React from 'react';
import { withRouter } from 'react-router-dom';
import RoutesGenerate from './routesGenerate';
import { NavigationHorizontal } from './Navigation';
import Breadcrumbs from './breadcrumbs';
import configuration from './configuration';
import ShouldDisplay from '../../system/codes/ShouldDisplay';
import ResponsiveStore from '../../store/ResponsiveStore';

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
const GenerateBodyContent = ({ options, location }) => (
   <div>
      <ShouldDisplay wc_section="wc_navigation_horizontal">
         <NavigationHorizontal routesConfiguration={staticRoutes} responsiveStore={ResponsiveStore} location={location}/>
      </ShouldDisplay>
      <ShouldDisplay wc_section="wc_bread_crumbs">
         <Breadcrumbs landingpageRouteID={staticRoutes.getLandingpageRouteID()} config={staticRoutes.getRoutes()} options={options} getPath={staticRoutes.getPath} />
      </ShouldDisplay>
      <RoutesGenerate landingpageRouteID={staticRoutes.getLandingpageRouteID()} config={staticRoutes.getRoutes()} getPath={staticRoutes.getPath} />
   </div>
);

export default withRouter(GenerateBodyContent);
