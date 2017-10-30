import React from 'react';
import RoutesGenerate from './routesGenerate';
import Navigation from './navigation';
import Breadcrumbs from './breadcrumbs';

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
const NavBreadcrumbsRoute = (props) => (
  <div>
    <Navigation config={props.config} routesExclude={props.options.routesExclude}/>
    <Breadcrumbs config={props.config} options={props.options} />
    <hr />
    <RoutesGenerate config={props.config} />
  </div>
);

export default NavBreadcrumbsRoute;
