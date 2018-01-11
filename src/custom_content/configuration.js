import ShowcaseApp from '../custom_content/pages/landing-default/ShowcaseApp';
import EndpointManagement from '../custom_content/pages/endpoint-management';
import Page3 from '../custom_content/pages/page3';
import Page3Child1 from '../custom_content/pages/page3Child1';
import Page3Child2 from '../custom_content/pages/page3Child2';
import Page3Child1Grand1 from '../custom_content/pages/page3Child1Grand1';
import EndpointSolutions from '../custom_content/pages/endpoint-solutions';
import iframe from '../custom_content/pages/iframe';
import testingArea from '../custom_content/pages/testingArea';
import ProductListing1 from '../custom_content/modules/product-listing1';
import ResTest from '../custom_content/pages/ResTest';

/**
 * Configuration data for the showcase.
 *
 * headerDetails:: Holds all the header information
 * imgLogo[optional]: may be require('../custom_content/assets/images/SYM-BLK.png') or null or just delete it
 * headerTitle[optional]: may be text as "Symantec", empty string, or just delete it
 *
 * footerDetails:: Holds all the footer information (imgProvidedBy, backgroundColor)
 *
 * staticRoutes:: Holds all the routes information, [path,component,name, title]. Used for generating the routes, breadcrumbs and navigation.
 * All routes by default are exact routes which mean that child route will only show their component, in case the need for them not be
 * exact, add 'notExact : true' to the parent.
 *
 * id: The route ID.
 * parent: The route's parent relative path, if this is a root path it will be: '/' .
 * path: The route's relative path.
 * component: Which component to use for this route.
 * name: The name to use for the breadcrumbs / navigation.
 * title[optional]: will display specific title for certain page, may be text, or empty string.
 *
 * routesExclude:: String , hold the names which we wish to exclude from the navigation.
 *
 * functions inside staticRoutes:: =
 * routesExcludeTest
 * getPath
 * getChildren
 * getRootRoutes
 */


const configuration = {
  moduleName: 'Avery',
  presentationName: 'Avery (presentation)',
  moduleId: 'avery',
  headerDetails: {
    imgLogo: require('../custom_content/assets/images/avery_logo.jpg'),
    headerTitle: 'Avery'
   },
   footerDetails:
   {
        imgProvidedBy: require('../system/resources/powered-by.png'),
        backgroundColor: 'white'
   },
   navigationDetails: {
    horizontal: {
      backgroundColor: "#e3f2fd",
      color: "rgba(0, 0, 0, 0.5)"
    },
    vertical: {
      backgroundColor: "#af0000",
      color: "#ffffff"
    }
   },
  staticRoutes: {
    routesDetails: [
      {
        id: 'symantec-showcase',
        parent: '/',
        path: '/',
        component: ShowcaseApp,
        name: 'Symantec Showcase',
      },
      {
        id: 'endpoint-management',
        parent: '/',
        path: '/EndpointManagement',
        component: EndpointManagement,
        name: 'Endpoint Management',
        title: '',
      },
      {
        id: 'endpoint-page-child',
        parent: '/EndpointManagement',
        path: '/EndpointPageChild',
        component: Page3Child1Grand1,
        name: 'Endpoint Page Child',
        title: 'Endpoint Page Child',
      },
      {
        id: 'res-test',
        parent: '/',
        path: '/resTest',
        component: ResTest,
        name: 'Responsive Test',
        title: 'Res Test',
      },
      {
        id: 'page3',
        parent: '/',
        path: '/Page3',
        component: Page3,
        name: 'Page 3',
        // assort: true
      },
      {
        id: 'page3-child1',
        parent: '/Page3',
        path: '/page3child1',
        component: Page3Child1,
        name: 'Page3 Child1',
        title: 'Page3 Child1',
      },
      {
        id: 'page3-child2',
        parent: '/Page3',
        path: '/page3child2',
        component: Page3Child2,
        name: 'Page3 Child2',
        title: 'Page3 Child2',
        // assort: true
      },
      {
        id: 'page3-child1-grand1',
        parent: '/page3child1',
        path: '/page3Child1Grand1',
        component: Page3Child1Grand1,
        name: 'Page3 Child1 Grand1',
        title: 'Page3 Child1 Grand1',
      },
      {
        id: 'endpoint-solutions',
        parent: '/',
        path: '/EndpointSolutions',
        component: EndpointSolutions,
        name: 'Endpoint Solutions',
        title: 'Endpoint Solutions',
      },
      {
        id: 'iframe',
        parent: '/',
        path: '/iframe',
        component: iframe,
        name: 'iframe',
        title: 'Iframe',
      },
      {
        id: 'testingArea',
        parent: '/',
        path: '/testingArea',
        component: testingArea,
        name: 'testing Video',
        title: '',
      },
      {
        id: 'product-listing-1',
        parent: '/',
        path: '/ProductListing1',
        component: ProductListing1,
        name: 'Product Listing1',
      },
    ],
    routesExclude: '(product-listing-1|res-test)',
    /* |endpoint-management|endpoint-solutions|page3-child1-grand1 */
  },
};

/**
 *
 * Function that checks if the provided route name needed to be excluded, return a boolean result.
 * The function takes 'routesExclude' and wrap the string between the pipelines with '^' and '$'
 *
 * routeID:: The route ID we wish to check if needed to be excluded.
 *
 */
configuration.staticRoutes.routesExcludeTest = (routeID) => {
  let { routesExclude } = configuration.staticRoutes;
  if (!routesExclude || /^\(?\)?$/.test(routesExclude)) return false;

  const regexMatchName = /([a-zA-Z0-9-_$\s][\sa-zA-Z0-9-_$]*)/g;

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
 * Get all the routes children according to the provided parent path.
 */
configuration.staticRoutes.getChildren = (parentPath) => {
  return configuration.staticRoutes.routesDetails.filter(route => route.parent === parentPath);
};

/**
 * Get all the root routes.
 */
configuration.staticRoutes.getRootRoutes = () => {
  return configuration.staticRoutes.routesDetails.filter(route => route.parent === '/' && !configuration.staticRoutes.routesExcludeTest(route.id) && route.path !== '/');
}
export let verticalBackgroundColor = configuration.navigationDetails.verticalBackgroundColor
export default configuration;
