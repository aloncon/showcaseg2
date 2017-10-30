import ShowcaseApp from '../custom_content/landing_pages/ShowcaseApp';
import EndpointManagement from '../custom_content/landing_pages/endpoint-management';
import Page3 from '../custom_content/landing_pages/page3';
import EndpointSolutions from '../custom_content/landing_pages/endpoint-solutions';
import iframe from '../custom_content/landing_pages/iframe';
import testingArea from '../custom_content/landing_pages/testingArea';
import ProductListing1 from '../custom_content/modules/product-listing1';

/**
 * Configuration data for the showcase.
 *
 * headerDetails:: Hold the all the header information (headerTitle, manufacturerLogo, headerColor, backgroundColor)
 *
 * footerDetails:: Hold the all the footer information (imgProvidedBy, backgroundColor)
 *
 * staticRoutes:: Hold the all the routes information, [path,component,name]. Used for generate the routes, breadcrumbs and navigation.
 */
const configuration = {
  headerDetails: {},
  footerDetails: {},
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
