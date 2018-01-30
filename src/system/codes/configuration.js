import React from 'react';
import ShouldDisplay from './ShouldDisplay';
import configurationJSON from '../../custom_content/configuration.json';
import { pageComponentsArray } from '../../custom_content/pages/pageComponentsArray';

/**
 * Configuration data for the showcase.
 *
 * headerDetails:: Holds all the header information
 * imgLogo[optional]: may be require('../custom_content/assets/images/SYM-BLK.png') or null or just delete it
 * headerTitle[optional]: may be text as "Symantec", empty string, or just delete it
 *
 * footerDetails:: Holds all the footer information (imgProvidedBy, backgroundColor)
 *
 * staticRoutes:: Holds all the routes information, [id, path, component, name, title, assort]. Used for generating the routes, breadcrumbs and navigation.
 * All routes by default are exact routes which mean that child route will only show their component, in case the need for them not be exact, add 'notExact : true' to the parent.
 *
 * `id`: The route ID.
 * `parent`: The route's parent relative path, if this is a root path it will be: '/' .
 * `path`: The route's relative path.
 * `component`: Which component to use for this route.
 * `name`: The name to use for the breadcrumbs / navigation.
 * `title` [optional]: Will display specific title for certain page, may be text, or empty string.
 * `assort` [optional]: If true will check against the allassortment / partner context to display or not.
 *
 * routesExclude:: String , hold the names which we wish to exclude from the navigation.
 *
 * functions inside staticRoutes:: =
 * routesExcludeCheck
 * getPath
 * getChildren
 * getRootRoutes
 */

const configurationTemplate = {
  moduleName: '',
  presentationName: '',
  moduleId: '',
  headerDetails: {
    imgLogo: '',
    headerTitle: ''
  },
  footerDetails: {
    imgProvidedBy: '',
    backgroundColor: ''
  },
  staticRoutes: {
    routesDetails: [],
    routesExclude: '()'
  }
}

// update the images paths in the configuration parameter to the actual images.
const loadImages = (configuration) => {
  configuration.headerDetails.imgLogo = require(`../../custom_content/assets/${configuration.headerDetails.imgLogo}`);
  configuration.footerDetails.imgProvidedBy = require(`../resources/${configuration.footerDetails.imgProvidedBy}`);
}

// update the components name string in the configuration parameter to the actual components.
const loadPageComponents = (configuration) => {
  configuration.staticRoutes.routesDetails.map((router => {
    const Component = pageComponentsArray[router.component];
    router.component = Component;
  }))
}

/**
 * Initialize the configuration object
 *
 *  * Load the configuration.json to the object using the template.
 *  * Load the actual images.
 *  * Load the actual components.
 **/
const configuration = Object.assign(configurationTemplate, configurationJSON);
loadImages(configuration);
loadPageComponents(configuration);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


/**
 * The function checks if the provided route ID needed to be excluded by assortment or by configuration.staticRoutes.routesExclude
 *
 * return a boolean result.
 *
 * routeID:: The route ID we wish to check if needed to be excluded.
 *
 */
configuration.staticRoutes.routesExcludeCheck = (routeID) => {
  // If the route have assort: true, it will check the context by ShouldDisplay.
  const assort = configuration.staticRoutes.routesDetails.filter(route => route.id === routeID)[0].assort;

  if (assort) {
    return !ShouldDisplay({ wc_section: routeID });
  }

  // Otherwise by the regex check - configuration.staticRoutes.routesExclude.
  let { routesExclude } = configuration.staticRoutes;
  if (!routesExclude || /^\(?\)?$/.test(routesExclude)) return false;

  const regexMatchName = /([a-zA-Z0-9-_$\s][\sa-zA-Z0-9-_$]*)/g;

  // wrap the string 'routesExclude' between the pipelines with '^' and '$'
  routesExclude = routesExclude.replace(regexMatchName, '^$1$');
  routesExclude = new RegExp(routesExclude);

  return routesExclude.test(routeID);
};

/**
 * Get the full path for the provided relative path.
 *
 * PARAMS::
 *
 * currentPath ::= The relative path.
 * parentPath ::= The parent path of the relative path
 */
configuration.staticRoutes.getPath = (currentPath, parentPath) => {
  const buildPath = (currentPath, parentPath) => {
    if (!parentPath || parentPath === '/') return currentPath;

    let parent = configuration.staticRoutes.routesDetails.find(route => route.path === parentPath);

    return buildPath(`${parentPath}${currentPath}`, parent.parent);
  };

  return buildPath(currentPath, parentPath);
};

/**
 * Get all the routes children according to the provided parent path, excludes the routes by the routesExcludeCheck.
 */
configuration.staticRoutes.getChildren = (parentPath) => {
  return configuration.staticRoutes.routesDetails.filter(route => route.parent === parentPath && !configuration.staticRoutes.routesExcludeCheck(route.id));
};

/**
 * Get all the root routes, excludes the routes by the routesExcludeCheck.
 */
configuration.staticRoutes.getRootRoutes = () => {
  return configuration.staticRoutes.routesDetails.filter(route => route.parent === '/' && !configuration.staticRoutes.routesExcludeCheck(route.id) && route.path !== '/');
}

export default configuration;
