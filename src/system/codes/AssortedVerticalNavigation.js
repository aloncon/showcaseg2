import React from 'react';
import { NavigationVertical } from './Navigation';
import configuration from '../../custom_content/configuration';
import WcShowcase from './moduleInfo';

const { staticRoutes, moduleName } = configuration;
const { displayVerticalNavigation } = WcShowcase;

const AssortedVerticalNavigation = () => {
  return displayVerticalNavigation && <NavigationVertical routesConfiguration={staticRoutes} moduleName={moduleName} />;
};

export default AssortedVerticalNavigation;
;