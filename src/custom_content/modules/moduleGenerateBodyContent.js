import React from 'react';
import GenerateBodyContent from '../../system/codes/GenerateBodyContent';

/**
 * Local Module GenerateBodyContent
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
const ModuleGenerateBodyContent = () => (
  <GenerateBodyContent options={{displayRootNameAsHome: true, addHorizontalRule: true}} />
)

export default ModuleGenerateBodyContent;