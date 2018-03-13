import React from 'react';
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
const GenerateBodyContent = ({ options }) => (
  <div>
    <ShouldDisplay wc_section="wc_navigation_horizontal"> <NavigationHorizontal routesConfiguration={staticRoutes} responsiveStore={ResponsiveStore}/> </ShouldDisplay>
    <ShouldDisplay wc_section="wc_bread_crumbs"><Breadcrumbs config={staticRoutes.getRoutes()} options={options} getPath={staticRoutes.getPath}/> </ShouldDisplay>
    <RoutesGenerate config={staticRoutes.getRoutes()} getPath={staticRoutes.getPath}/>
  </div>
);

export default GenerateBodyContent;
