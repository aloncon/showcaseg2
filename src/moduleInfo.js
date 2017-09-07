import getModuleInfo from './init.js'

export const moduleDefaults = getModuleInfo();
/*export const moduleName = getModuleInfo().module;
export const siteName = getModuleInfo().site;
export const id = getModuleInfo().id;
*/
export const moduleName = moduleDefaults.module;
export const siteName = moduleDefaults.site;
export const id = moduleDefaults.id;
