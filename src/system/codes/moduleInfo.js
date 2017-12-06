import getModuleInfo from './init.js'

const moduleInfo =  getModuleInfo();

//object that contains info about the module
let WcShowcase = {
    moduleName : moduleInfo.module,
    siteName : moduleInfo.site,
    id : moduleInfo.id,
    showcasePrefix : moduleInfo.showcasePrefix,
    scriptsrcbaseurl : moduleInfo.scriptsrcbaseurl,
    presentationName : moduleInfo.presentationName,
    environmentId : moduleInfo.environmentId,
    isStandalone : window.location.href.indexOf("/standalone/") !==-1 ? true:false
}

export default WcShowcase;