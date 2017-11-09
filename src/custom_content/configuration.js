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
 * headerDetails:: All the header information is optional
 * imgLogo: may be require('../custom_content/assets/images/SYM-BLK.png') or null
 *
 * footerDetails:: Hold all the footer information (imgProvidedBy, backgroundColor)
 *
 * staticRoutes:: Hold the all the routes information, [path,component,name]. Used for generate the routes, breadcrumbs and navigation.
 *
 */
const configuration = {
  moduleName: 'Symantec',
  moduleId: 'symantec',
  headerDetails:{
    imgLogo: require('../custom_content/assets/images/SYM-BLK.png'),
    headerTitle: 'Symantec',
    textColor: 'white',
    backgroundColor: 'black'
   },
   footerDetails:
   {
        imgProvidedBy: require('../system/resources/powered-by.png'),
        backgroundColor: 'white'
   },
  staticRoutes: [
    {
      path: '/',
      component: ShowcaseApp,
      name: 'Symantec Showcase',
    },
    {
      path: '/ShowcaseApp',
      component: ShowcaseApp,
      name: 'Symantec Showcase',
    },
    {
      path: '/EndpointManagement',
      component: EndpointManagement,
      name: 'Endpoint Management',
      title: 'Endpoint Management'
    },
    {
      path: '/Page3',
      component: Page3,
      name: 'Page 3',
    },
    {
      path: '/Page3/EndpointManagement',
      component: EndpointManagement,
      name: 'Page 3 child',
      title: 'Child Example breadcrumbs'
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
    },
    {
      path: '/testingArea',
      component: testingArea,
      name: 'testing Video',
      title: 'Video Gallery',
    },
    {
      path: '/ProductListing1',
      component: ProductListing1,
      name: 'Product Listing1',
    },
  ],
  "routesExclude": "(Product Listing1)", /* When there is no need for a value here, please use .^  */
};

export default configuration;
