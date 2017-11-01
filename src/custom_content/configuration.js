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
 * headerDetails:: Hold the all the header information (headerTitle, manufacturerLogo, headerColor, backgroundColor)
 *
 * footerDetails:: Hold the all the footer information (imgProvidedBy, backgroundColor)
 *
 * staticRoutes:: Hold the all the routes information, [path,component,name]. Used for generate the routes, breadcrumbs and navigation.
 *
 * TODO: Change the 'staticRoutes' index to the route name
 */
const configuration = {
  moduleName: 'Symantec',
  moduleId: 'symantec',
  headerDetails:{
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
    },
    {
      path: '/Page3',
      component: Page3,
      name: 'Page 3',
    },
    {
      path: '/EndpointSolutions',
      component: EndpointSolutions,
      name: 'Endpoint Solutions',
    },
    {
      path: '/iframe',
      component: iframe,
      name: 'iframe',
    },
    {
      path: '/testingArea',
      component: testingArea,
      name: 'testing Area',
    },
    {
      path: '/ProductListing1',
      component: ProductListing1,
      name: 'Product Listing1',
    },
  ],
};

export default configuration;
