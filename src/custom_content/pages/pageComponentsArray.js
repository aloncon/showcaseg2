/* *
* This file export an array of all the pages which we use in the showcase.
* Import here the new page and add it to the export array.
* */
import ShowcaseApp from './landing-default/ShowcaseApp';
import EndpointManagement from './endpoint-management';
import Page3 from './page3';
import Page3Child1 from './page3Child1';
import Page3Child2 from './page3Child2';
import Page3Child1Grand1 from './page3Child1Grand1';
import EndpointSolutions from './endpoint-solutions';
import iframe from './iframe';
import testingArea from './testingArea';
import ProductListing1 from '../modules/product-listing1';
import ResTest from './ResTest';

export const pageComponentsArray = {
  ShowcaseApp,
  EndpointManagement,
  Page3,
  Page3Child1,
  Page3Child2,
  Page3Child1Grand1,
  EndpointSolutions,
  iframe,
  testingArea,
  ProductListing1,
  ResTest,
};