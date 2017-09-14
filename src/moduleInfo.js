import getModuleInfo from './init.js'

const moduleInfo =  getModuleInfo();
export const moduleName = moduleInfo.module;
export const siteName = moduleInfo.site;
export const id = moduleInfo.id;
export const showcaseprefix = moduleInfo.showcaseprefix;
export const scriptsrcbaseurl = moduleInfo.scriptsrcbaseurl;

export default moduleInfo;