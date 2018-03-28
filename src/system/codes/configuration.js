import ShouldDisplay from './ShouldDisplay';
import configurationJSON from '../../custom_content/configuration.json';
import { pageComponentsArray } from '../../custom_content/pages/pageComponentsArray';
import WcShowcase from './moduleInfo'


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
  moduleName: 'SHOWCASE-TEMPLATE Module Name',
  presentationName: 'SHOWCASE-TEMPLATE (presentation)',
  moduleId: 'SHOWCASE-TEMPLATE-moduleId',
  headerDetails: {
    imgLogo: 'images/default_logo.jpg',
    headerTitle: ''
  },
  footerDetails: {
    imgProvidedBy: 'powered-by.png',
    backgroundColor: ''
  },
  staticRoutes: {
    "landingpage-default": [
      {
        "id": "template-showcase",
        "parent": "/",
        "path": "/",
        "component": "ShowcaseApp",
        "name": "Template Showcase"
      },
    ],
    routesExclude: '()'
  }
}

/**
 * Update the images paths in the configuration parameter to the actual images.
 * If there was no value for the logo it will not try to load from custom_content.
 */
const loadImages = (configuration) => {
  const regexCheckIsDefaultLogo = new RegExp(/default_logo.jpg|data:image/);
  if (!regexCheckIsDefaultLogo.test(configuration.headerDetails.imgLogo)) {
    configuration.headerDetails.imgLogo = require(`../../custom_content/assets/${configuration.headerDetails.imgLogo}`);
  }
  configuration.footerDetails.imgProvidedBy = require(`../resources/${configuration.footerDetails.imgProvidedBy}`);
}

// update the components name string in the configuration parameter to the actual components.
const loadPageComponents = (configuration) => {
  for (var property in configuration.staticRoutes) {
    if (property !== "routesExclude") {
        configuration.staticRoutes[property].map((router => {
          const Component = pageComponentsArray[router.component];
          router.component = Component;
          return null;
        }))
    }
  }
}

// load default values in case the input in configuration.json is empty.
const loadDefaultValues = (configuration) => {
  if (!configuration.moduleName.length) {
    configuration.moduleName = 'SHOWCASE-TEMPLATE Module Name'
    console.error('Please set the `moduleName` in the custom_content/configuration.json');
  }
  if (!configuration.presentationName.length) {
    configuration.presentationName = 'SHOWCASE-TEMPLATE (presentation)';
    console.error('Please set the `presentationName` in the custom_content/configuration.json');
  }
  if (!configuration.moduleId.length) {
    configuration.moduleId = 'SHOWCASE-TEMPLATE-moduleId';
    console.error('Please set the `moduleId` in the custom_content/configuration.json');
  }
  if (!configuration.headerDetails.imgLogo.length) {
    configuration.headerDetails.imgLogo = require('../resources/default_logo.jpg');
  }
}
/**
 * Initialize the configuration object
 *
 *  * Load the configuration.json to the object using the template.
 *  * Load the actual images.
 *  * Load the actual components.
 **/

let landingEntryPoint;
const configuration = Object.assign(configurationTemplate, configurationJSON);
loadPageComponents(configuration);
loadDefaultValues(configuration);
loadImages(configuration);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


configuration.staticRoutes.setEntry = (entry) => {
  const configEntries = configuration.staticRoutes.entryPoints;
  let entryId
  
  if(entry.toLowerCase() !== 'landingpage-default'){
    entryId = configEntries.find(function (obj) { return obj.id.toLowerCase() === entry.toLowerCase(); });
    if(entryId){
      landingEntryPoint = [entryId];
    }
    else{
      landingEntryPoint = "Wrong entry"
      console.error("WC-ERROR: wrong entry in context [" , entryId ,"]");
    }
  }
  else{

    const siteName    = WcShowcase.siteName
    const landingpage = "landingpage-"+siteName 
    landingEntryPoint = (configuration.staticRoutes.hasOwnProperty(landingpage))?configuration.staticRoutes[landingpage]:configuration.staticRoutes['landingpage-default']
  }
}

configuration.staticRoutes.getRoutes = () => {
  if (landingEntryPoint) {
    return landingEntryPoint;
  }
 
  return configuration.staticRoutes['landingpage-default'];
}
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
  const assort = configuration.staticRoutes.getRoutes().filter(route => route.id === routeID)[0].assort;

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
    if (!parentPath || parentPath === '/') {
      return currentPath;
    
    }
    let parent = configuration.staticRoutes.getRoutes().find(route => route.path === parentPath);

    return buildPath(`${parentPath}${currentPath}`, parent.parent);
  };

  return buildPath(currentPath, parentPath);
};

/**
 * Get all the routes children according to the provided parent path, excludes the routes by the routesExcludeCheck.
 */
configuration.staticRoutes.getChildren = (parentPath) => {
  return configuration.staticRoutes.getRoutes().filter(route => route.parent === parentPath && !configuration.staticRoutes.routesExcludeCheck(route.id));
};

/**
 * Get all the root routes, excludes the routes by the routesExcludeCheck.
 */
configuration.staticRoutes.getRootRoutes = () => {
  return configuration.staticRoutes.getRoutes().filter(route => route.parent === '/' && !configuration.staticRoutes.routesExcludeCheck(route.id) && route.path !== '/');
}

export default configuration;
