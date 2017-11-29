import React from 'react';
import { NavigationVertical } from '../../system/codes/Navigation';
import WcpcContent from '../../system/codes/WcpcContent';
import configuration from '../configuration';

const { staticRoutes, routesExcludeTest, moduleName } = configuration;

const ModuleNavigationVertical = () => {
  return (
    <WcpcContent wc_section_code={'wc_navigation_vertical'}>
      <NavigationVertical config={staticRoutes.routesDetails} routesExcludeTest={routesExcludeTest} moduleName={moduleName}/>
    </WcpcContent>
  );
};

export default ModuleNavigationVertical;