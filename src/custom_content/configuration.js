import ShowcaseApp from '../custom_content/pages/landing-default/ShowcaseApp';
import EndpointManagement from '../custom_content/pages/endpoint-management';
import Page3 from '../custom_content/pages/page3';
import EndpointSolutions from '../custom_content/pages/endpoint-solutions';
import iframe from '../custom_content/pages/iframe';
import testingArea from '../custom_content/pages/testingArea';
import ProductListing1 from '../custom_content/modules/product-listing1';

/**
 * Configuration data for the showcase.
 *
 * headerDetails:: Holds all the header information
 * imgLogo[optional]: may be require('../custom_content/assets/images/SYM-BLK.png') or null or just delete it
 * headerTitle[optional]: may be text as "Symantec", empty string, or just delete it
 * marginBottom[optional]: may get all the css measurements (px, em etc.)
 *
 * footerDetails:: Holds all the footer information (imgProvidedBy, backgroundColor)
 *
 * staticRoutes:: Holds all the routes information, [path,component,name, title]. Used for generating the routes, breadcrumbs and navigation.
 * title[optional]: will display specific title for certain page, may be text, or empty string
 * All routes by default are exact routes which mean that child route will only show their component, in case the need for them not be
 * exact, add 'notExact : true' to the parent.
 *
 * routesExclude:: String , hold the names which we wish to exclude from the navigation.
 *
 * routesExcludeTest(routeName):: Function, check if the 'routeName' need to be excluded by regex test the routesExclude string.
 *
 *
 */
const configuration = {
  moduleName: 'Avery',
  moduleId: 'avery',
  headerDetails:{
    imgLogo: require('../custom_content/assets/images/avery_logo.jpg'),
    headerTitle: 'Avery'
   },
   footerDetails:
   {
        imgProvidedBy: require('../system/resources/powered-by.png'),
        backgroundColor: 'white'
   },
  staticRoutes: {
    routesDetails : [
      {
        path: '/',
        component: ShowcaseApp,
        name: 'Symantec Showcase',
      },
      {
        path: '/EndpointManagement',
        component: EndpointManagement,
        name: 'Endpoint Management',
        title: ''
      },
      {
        path: '/Page3',
        component: Page3,
        name: 'Page 3'
      },
      {
        path: '/Page3/EndpointManagement',
        component: EndpointManagement,
        name: 'Page 3 child',
        title: 'Page3/EndpointManagement'
      },
      {
        path: '/EndpointSolutions',
        component: EndpointSolutions,
        name: 'Endpoint Solutions',
        title: 'Endpoint Solutions',
      },
      {
        path: '/iframe',
        component: iframe,
        name: 'iframe',
        title: 'Iframe'
      },
      {
        path: '/testingArea',
        component: testingArea,
        name: 'testing Video',
        title: '',
      },
      {
        path: '/ProductListing1',
        component: ProductListing1,
        name: 'Product Listing1',
      },
    ],
    "routesExclude": "(Product Listing1)"
  }
};

/**
 *
 * Function that checks if the provided route name needed to be excluded, return a boolean result.
 * The function takes 'routesExclude' and wrap the string between the pipelines with '^' and '$'
 *
 * routeName:: The route name we wish to check if needed to be excluded.
 */
configuration.routesExcludeTest = (routeName) => {
  let { routesExclude } = configuration.staticRoutes;
  if (!routesExclude) return false;

  const regexMatchName = /([a-zA-Z0-9-_$\s][\sa-zA-Z0-9-_$]*)/g;

  routesExclude = routesExclude.replace(regexMatchName, '^$1$');
  routesExclude = new RegExp(routesExclude);

  return routesExclude.test(routeName);
}

export default configuration;
