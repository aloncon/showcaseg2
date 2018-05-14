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

console.log('------------------------------------');
console.log('Module Information:');
console.log("  siteName ",WcShowcase.siteName);
console.log("  moduleName ",WcShowcase.moduleName);
console.log("  id ",WcShowcase.id);
console.log("  showcasePrefix ",WcShowcase.showcasePrefix);
console.log("  scriptsrcbaseurl ",WcShowcase.scriptsrcbaseurl);
console.log("  presentationName ",WcShowcase.presentationName);
console.log("  environmentId ",WcShowcase.environmentId);
console.log('------------------------------------');

export default WcShowcase;
export let partnerDef;
export let partnerDefPromise = Promise.resolve(mergeJson())
.then(function(value) {
  partnerDef = value;
  return value;
});