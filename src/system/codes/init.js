/* eslint-disable no-useless-escape */

import configuration from '../codes/configuration';

/*
const getScriptURL = (function() {
    const scripts = document.getElementsByTagName('script');
    const index = scripts.length - 1;
    const myScript = scripts[index];
    return function() { return myScript.src; };
})();
*/


const getScriptURL = (function() {
    const scripts = document.getElementsByTagName('script');
    const index = scripts.length - 1;
    const myScript = scripts[index];
    return function() { return myScript.src; };
})();

function getSrcBase(scriptUrl) {
    if (scriptUrl.includes('localhost:')) {
        environmentId = 'localhost';
        console.log('in DEV')
        return `http://localhost:3000`;
    }else{
        console.log('ENV: in others!',scriptUrl)
        environmentId = 'non_dev';
        return scriptUrl.replace(/\/build\/.*/,"/build/");
    }
}

function getSiteIdFromScriptSrc(script){
    let site;

    if(script.indexOf('ws-site=')!==-1){
        site = script.replace(/.*site=([^&]*)&?.*/,'$1');
        console.log("dev-site: " + site);
    }
    else{
        //  site = 'cdw';
        //  site = 'staples';
         site = 'quill';
        // site = 'allassortment';
    }

    return site;
}

function getModuleIdFromScriptSrc(script){
    let module;
     module= configuration.moduleId;


    return module;
}
function getContextNameFromScriptSrc(script){
    if(script.indexOf('ws-context=')!==-1){
        return script.replace(/.*ws\-context=([^&]+).*/,"$1");
    }
    return configuration.moduleId + "-showcase"
}

function getEntryIdFromScriptSrc(script){
    if(script.indexOf('ws-entry=')!==-1){
        if(script.replace(/.*ws\-entry=([^&]+).*/,"$1") === 'landingpage-default'){
            return false
        }
        else{
            let entry = false
            for (var property in configuration.staticRoutes) {
                if (property === script.replace(/.*ws\-entry=([^&]+).*/,"$1")) {
                    entry = script.replace(/.*ws\-entry=([^&]+).*/,"$1");
                    break;
                }
              }
            return entry;
        }
    }
    return false
}
let script = getScriptURL();
let environmentId = 'dev';
let srcBase = getSrcBase(script);


export default function getModuleInfo () {
    let id= '168262d34ae47d7642f15af14eb6c95d';
    let site;
    let module;
    let context;
    let entry;

    let webcollageObj = window.WebcollageShowcase;

    if(typeof webcollageObj !== 'undefined'){
        console.log("object from site page : " + webcollageObj);
        site = webcollageObj.partnerId;
        module = webcollageObj.moduleId;
        script = webcollageObj.scriptSrc;
        srcBase = webcollageObj.srcBase;
        context = webcollageObj.context;
        entry = webcollageObj.entry;
    }else{
        console.log("script src from site page : " + script);
        site   = getSiteIdFromScriptSrc(script);
        module = getModuleIdFromScriptSrc(script);
        context = getContextNameFromScriptSrc(script);
        entry = getEntryIdFromScriptSrc(script);
    }

    console.log("default: module- " + module + " &&site- " + site);

const presentationName = configuration.presentationName;

    return{
        module : module,
        site: site,
        id:id,
        scriptsrcbaseurl:script,
        showcasePrefix:srcBase,
        presentationName:presentationName,
        environmentId: environmentId,
        context: context,
        entry:entry
    }
}
