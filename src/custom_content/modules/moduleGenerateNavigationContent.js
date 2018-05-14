import React from 'react';
import GenerateNavigationContent from '../../system/codes/GenerateNavigationContent';

/**
 * Local Module GenerateNavigationContent
 *
 * In order to change the navigation/breadcrumbs or the routes, you needed to change the configuration.js in the custom content.
 *
 * options::->
 *
 * displayRootNameAsHome (OPTIONAL):: Boolean, true to display the word 'Home' when the path is: '/'. False by default.
 *
 * isDisplayBreadcrumbRoot (OPTIONAL):: Boolean, true to display the breadcrumbs in the root path: '/'. False by default.
 *
 * addHorizontalRule (OPTIONAL):: Boolean, true to display <hr /> element under the breadcrumbs. False by default.
 *
 * For more information, please look in the component itself.
 */
const ModuleGenerateNavigationContent = () => (
  <GenerateNavigationContent options={{displayRootNameAsHome: true, addHorizontalRule: false}} />
)

export default ModuleGenerateNavigationContent;