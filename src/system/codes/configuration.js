import ShouldDisplay from './ShouldDisplay';
import configurationJSON from '../../custom_content/configuration.json';
import WcShowcase from './moduleInfo';


/**
 * Configuration data for the showcase.
 *
 * headerDetails:: Holds all the header information
 * imgLogo[optional]: There is three options:
 *          * Image from the `src/custom_content/assets/` for example: `images/product-logo.jpg`.
 *          * Empty string - Will use the default logo: `src/system/resources/default_logo.jpg`.
 *          * Delete it if not needed.
 * headerTitle[optional]: may be text as "Module Name", empty string, or just delete it
 *
 * footerDetails::
 *          * imgProvidedBy - Always will be `src/system/resources/powered-by.png`.
 *
 * staticRoutes:: Holds all the routes information, [id, component, name, title, assort]. Used for generating the routes, breadcrumbs and navigation.
 * All routes by default are exact routes which mean that child route will only show their component, in case the need for them not be exact, add 'notExact : true' to the parent.
 *
 * `id`: The route ID. The convention is to take file name in lowercase with no spaces (use dash (`-`) instead).
 *
 * `parent`: The route's parent ID, if this is a root path it will be the first route ID.
 *
 * `component`: The path under the folder `src/custom_content/pages/` to the component to be used for this route. For example: `landingpage/landingpage-default`.
 *
 * `name`: The name to use for the breadcrumbs / navigation.
 *
 * `title` [optional]: Will display specific title for certain page, may be text, or empty string.
 *
 * `assort` [optional]: If true will check against the allassortment / partner context to display or not.
 *
 * routesExclude:: String , hold the names which we wish to exclude from the navigation.
 *
 * functions inside staticRoutes:: =
 * setEntry
 * getRoutes
 * routesExcludeCheck
 * getPath
 * getChildren
 * getLandingpageRouteID
 * getRootRoutes
 */


/**
 * Update the images paths in the configuration parameter to the actual images.
 * If there is no value for the logo, it won`t try to load from custom_content.
 */
const loadImages = (configuration) => {
  const regexCheckIsDefaultLogo = new RegExp(/default_logo.jpg|data:image/);
  const imageLogoExists = configuration.headerDetails.imgLogo !== undefined;
  const isNotDefaultImageLogo = !regexCheckIsDefaultLogo.test(configuration.headerDetails.imgLogo);

  // Finding an image logo in the configuration.json, and is not the default_logo.jpg.
  if (imageLogoExists && isNotDefaultImageLogo) {
    configuration.headerDetails.imgLogo = require(`../../custom_content/assets/${configuration.headerDetails.imgLogo}`);
  }

  // If there is a need to change the Provided by image, please change it here:
  configuration.footerDetails = {};
  configuration.footerDetails.imgProvidedBy = require('../resources/powered-by.png');
}

/**
 * Update the components name string in the configuration parameter to the actual components.
 */
const loadPageComponents = (configuration) => {
  for (var property in configuration.staticRoutes) {
    if (property !== "routesExclude") {
        configuration.staticRoutes[property].map((router => {
          const Component =  require(`../../custom_content/pages/${router.component}`).default;
          router.component = Component;
          return null;
        }))
    }
  }
}

/**
 * Load default values in case the input in configuration.json is empty.
 */
const loadDefaultValues = (configuration) => {
  if (!configuration.moduleName.length) {
    configuration.moduleName = 'SHOWCASE-TEMPLATE Module Name'
    console.error('WC-ERROR: Please set the `moduleName` in the custom_content/configuration.json');
  }
  if (!configuration.presentationName.length) {
    configuration.presentationName = 'SHOWCASE-TEMPLATE (presentation)';
    console.error('WC-ERROR: Please set the `presentationName` in the custom_content/configuration.json');
  }
  if (!configuration.moduleId.length) {
    configuration.moduleId = 'SHOWCASE-TEMPLATE-moduleId';
    console.error('WC-ERROR: Please set the `moduleId` in the custom_content/configuration.json');
  }
  if (configuration.headerDetails.imgLogo !== undefined && !configuration.headerDetails.imgLogo.length) {
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
const configuration = Object.assign({}, configurationJSON);
loadPageComponents(configuration);
loadDefaultValues(configuration);
loadImages(configuration);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Set the showcase entry-point according to the `entry` param.
 *
 *  * landingpage-default
 *  * landingpage-[PARTNER]
 *  * specific entry-point
 */
configuration.staticRoutes.setEntry = (entry) => {
  const configEntries = configuration.staticRoutes.entryPoints;
  let entryId

  if(entry.toLowerCase() !== 'landingpage-default'){
    entryId = configEntries.find(function (obj) { return obj.id.toLowerCase() === entry.toLowerCase(); });
    if(entryId){
      landingEntryPoint = [entryId];
    }
    else{
      entryId = configuration.staticRoutes[entry]
      if(entryId){
        landingEntryPoint = entryId
      }else{
        landingEntryPoint = "Wrong entry"
        console.error("WC-ERROR: wrong entry in context [" , entry ,"]");
      }
      
    }
  }
  else{
    const siteName    = WcShowcase.siteName
    const landingpage = "landingpage-"+siteName
    landingEntryPoint = (configuration.staticRoutes.hasOwnProperty(landingpage))?configuration.staticRoutes[landingpage]:configuration.staticRoutes['landingpage-default']
  }
}

/**
 * @return {object} All the showcase routes
 */
configuration.staticRoutes.getRoutes = () => {
  return landingEntryPoint;
}

/**
 * The function checks if the provided route ID needed to be excluded by assortment or by configuration.staticRoutes.routesExclude
 *
 * @param {string} routeID The route ID we wish to check if needed to be excluded.
 *
 * @return {boolean} True or false if this route can be used.
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
 * @param {string} currentPath The relative path.
 * @param {string} parentPath The parent path of the relative path
 */
configuration.staticRoutes.getPath = (currentPath, parentPath) => {

  const buildPath = (currentPath, parentPath) => {
    if (!parentPath || parentPath === configuration.staticRoutes.getLandingpageRouteID()) {
      return currentPath;

    }
    let parent = configuration.staticRoutes.getRoutes().find(route => route.id === parentPath);

    return buildPath(`${parentPath}/${currentPath}`, parent.parent);
  };

  return `/${buildPath(currentPath, parentPath)}`;
};

/**
 * Get all the routes children according to the provided parent path, excludes the routes by the routesExcludeCheck.
 */
configuration.staticRoutes.getChildren = (parentPath) => {
  return configuration.staticRoutes.getRoutes().filter(route => route.parent === parentPath && !configuration.staticRoutes.routesExcludeCheck(route.id));
};

/**
 * @returns {string} Return the main landingpage route ID.
 */
configuration.staticRoutes.getLandingpageRouteID = () => {
  return configuration.staticRoutes.getRoutes()[0].id;
}

/**
 * Get all the root routes, excludes the routes by the routesExcludeCheck.
 */
configuration.staticRoutes.getRootRoutes = () => {
  return configuration.staticRoutes.getRoutes().filter(route => route.parent === configuration.staticRoutes.getLandingpageRouteID() && !configuration.staticRoutes.routesExcludeCheck(route.id) && route.id !== configuration.staticRoutes.getLandingpageRouteID());
}

export default configuration;
