import getModuleInfo from './init.js'
import mergeJson from './mergeJson';

const moduleInfo =  getModuleInfo();

const isStandalone = () => (window.location.href.indexOf('/standalone/') !== -1 ? true : false);
//object that contains info about the module
let WcShowcase = {
    moduleName : moduleInfo.module,
    siteName : moduleInfo.site,
    id : moduleInfo.id,
    showcasePrefix : moduleInfo.showcasePrefix,
    scriptsrcbaseurl : moduleInfo.scriptsrcbaseurl,
    presentationName : moduleInfo.presentationName,
    environmentId : moduleInfo.environmentId,
    isStandalone: isStandalone(),
}
WcShowcase.isDev = WcShowcase.environmentId === "localhost" ? true : false; 

export default WcShowcase;
export const partnerDef = mergeJson();
