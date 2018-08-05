import getModuleInfo from './init.js'
import mergeJson from './mergeJson';
import ShouldDisplay from './ShouldDisplay.js';
import configuration from './configuration.js';
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
    context: moduleInfo.context,
    entry: moduleInfo.entry,
    isStandalone: isStandalone(),
}
WcShowcase.isDev = WcShowcase.environmentId === "localhost" ? true : false;
WcShowcase.displayVerticalNavigation = size => {

  const stringCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const viewPortElementCheck = document.querySelector('meta[name="viewport"]');
  const smallSize = /xs|sm/;

  const isMobile = (smallSize.test(size) || (stringCheck && viewPortElementCheck)) ? true : false;

  return !isStandalone &&
        ShouldDisplay({ wc_section: 'wc_navigation_vertical' }) &&
        !isMobile(size) &&
        configuration.staticRoutes.getRootRoutes().length > 0;
}

console.log('------------------------------------');
console.log('Module Information:');
console.log("  siteName ",WcShowcase.siteName);
console.log("  moduleName ",WcShowcase.moduleName);
console.log("  id ",WcShowcase.id);
console.log("  showcasePrefix ",WcShowcase.showcasePrefix);
console.log("  scriptsrcbaseurl ",WcShowcase.scriptsrcbaseurl);
console.log("  presentationName ",WcShowcase.presentationName);
console.log("  environmentId ",WcShowcase.environmentId);
console.log("  context ",WcShowcase.context);
console.log("  entry ",WcShowcase.entry);
console.log('------------------------------------');

export default WcShowcase;
export let partnerDef;
export let partnerDefPromise = Promise.resolve(mergeJson())
.then(function(value) {
  partnerDef = value;
  return value;
});