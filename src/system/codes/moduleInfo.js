import getModuleInfo from './init.js'
import WcpcContent from './WcpcContent';

const moduleInfo =  getModuleInfo();

/*Provider Center Configurations */

//object that contains info about the module
let WcShowcase = {
    moduleName : moduleInfo.module,
    siteName : moduleInfo.site,
    id : moduleInfo.id,
    showcasePrefix : moduleInfo.showcasePrefix,
    scriptsrcbaseurl : moduleInfo.scriptsrcbaseurl,
    presentationName : moduleInfo.presentationName,
    environmentId : moduleInfo.environmentId,
    isStandalone : window.location.href.indexOf("/standalone/") !==-1 ? true:false,
    verticalNavigation : true
}
WcShowcase.isDev = WcShowcase.environmentId === "localhost" ? true : false; 

export default WcShowcase;
export const {displayHeader,displayNavigationHorizontal,displayNavigationVertical,displayBreadcrumbs,displayFooter,displayWithoutAssortment} = WcpcContent({call: "section"}); 
export const {entry} = WcpcContent({call: "entry"}); 
