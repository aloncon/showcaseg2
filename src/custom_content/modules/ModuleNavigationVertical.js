import React from 'react';
import { NavigationVertical } from '../../system/codes/Navigation';
import WcpcContent from '../../system/codes/WcpcContent';
import configuration from '../configuration';
import WcShowcase from '../../system/codes/moduleInfo';

const { staticRoutes, moduleName } = configuration;

const ModuleNavigationVertical = () => {
  
  return (
    <span>
    {!WcShowcase.isStandalone &&   
    <WcpcContent wc_section_code={'wc_navigation_vertical'}>
     
      <NavigationVertical routesConfiguration={staticRoutes} moduleName={moduleName}/>
    </WcpcContent>
    }
    </span>
  );
};

export default ModuleNavigationVertical;