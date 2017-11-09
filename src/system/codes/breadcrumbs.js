import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../style/breadcrumbs.css';

/**
 * Extract the path and the name values from the static routes configuration.
 *
 * Return new JSON object.
 *
 * KEY= path , VALUE= name
 */
const getRoutesConfig = (config) => {
  let newConfig = {};
  config.forEach(route => {
    const [path, name] = [route.path, route.name];
    newConfig[path] = name;
  });

  return newConfig;
};

/**
 * Return the correct name for the provided path
 *
 * PARAMS::
 *
 * routes ::=  Key-value array that contains paths and names.
 * breadcrumbPath ::= String of the path that we want the name for it.
 */
const findName = (routes, breadcrumbPath) => {
  const route = routes[breadcrumbPath];
  return route ? route : '404 Not Found';
}

/**
 * Generate the Breadcrumb Items
 *
 * PARAMS::
 *
 * pathsRoute ::= Array of all the paths routes.
 * routes ::= routes ::=  Key-value array that contains paths and names.
 * pathsRouteLength ::= The Length of the paths routes.
 */
const generateBreadcrumbItems =  (pathsRoute, routes, pathsRouteLength) => {
  return pathsRoute.map((path, index) => {
    const name = findName(routes, path);
    const props = { index, pathsRouteLength, name, path };
    return <BreadcrumbItem key={path} {...props} />;
  });
}

/**
 * BreadcrumbItem Component
 *
 * Represent the breadcrumb item.
 * Contains Link to the page path or if it is the last breadcrumbs shows only the name without a Link.
 *
 * PROPS::
 *
 * index (MANDATORY)::= The index of the item in the breadcrumbs.
 *
 * pathsRouteLength (MANDATORY)::= The Length of the paths routes.
 *
 * name (MANDATORY)::= The name of the current breadcrumb item.
 *
 * path (MANDATORY)::= The path of the current breadcrumb item.
 *
 */
const BreadcrumbItem = ({ index, pathsRouteLength, name, path}) => {
  return (
    <li>
      {( index === pathsRouteLength - 1 ) ? `${name}` : <Link to={path}>{name}</Link>}
    </li>
  );
};

/**
 * Breadcrumbs
 *
 * Props::
 *
 * config (MANDATORY)::= JSON object, holds the the static routes configuration.
 *
 *
 * options contains ::=
 *
 * displayHomeName (OPTIONAL):: Boolean, true to display the word 'Home' when the path is: '/'. False by default.
 *
 * isDisplayBreadcrumbRoot (OPTIONAL):: Boolean, true to display the breadcrumbs in the root path: '/'. False by default.
 *
 *
 * TODO: Add the option to change the style for the breadcrumbs.
 */
const Breadcrumbs = ({config, options, location}) => {
    const pathname = location.pathname;
    const routes = getRoutesConfig(config);
    const homePath = '/';
    const [isDisplayBreadcrumbRoot, displayHomeName] =
      options ?
      [options.isDisplayBreadcrumbRoot, options.displayHomeName] :
      [false, false];
    const pathsRoute = [];

    // return null for not to show the breadcrumbs in case of isDisplayBreadcrumbRoot is false
    if (!isDisplayBreadcrumbRoot && pathname === homePath) {
      return null;
    }

    // change the root route name to 'Home' in case of displayHomeName is true
    if (displayHomeName) {
      routes[homePath] = 'Home';
    }

    // add the root path
    pathsRoute[0] = homePath;

    if (pathname !== homePath) {
      pathname.split('/').reduce((previousPath, currentPath, index) => {
        pathsRoute[index] = `${previousPath}/${currentPath}`;
        return pathsRoute[index];
      });
    }

    const pathsRouteLength = pathsRoute.length;

    const breadcrumbs = generateBreadcrumbItems(pathsRoute, routes, pathsRouteLength);

    return (
      <ul className="wc-breadcrumbs">
        {breadcrumbs}
      </ul>
    );
  }

export default withRouter(Breadcrumbs);

