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

   return null;
}

function getSiteIdFromScriptSrc(script){
    let site;

    if(script.indexOf('site=')!=-1){
        site = script.replace(/.*site=([^&]*)&?.*/,'$1');
        console.log("dev-site: " + site);
    }
    else{
     site = 'quill';
    //site = 'cdw';
    }
   
    return site;
}

function getModuleIdFromScriptSrc(script){
    let module;

    if(script.indexOf('media-preview')!=-1){
        module = script.replace(/.*\/module\/([^\/]*)\/.*/,'$1');
        console.log("live: " + module);
    }
    else if(script.indexOf('media.stage')!=-1 || script.indexOf('www.test')!=-1){
        module = script.replace(/.*\.([^\.]*)\.webcollage.*/,'$1');
        console.log("stage/test: " + module);
    }
    else{ //if(script.indexOf('module=')!=-1)
        module = script.replace(/.*module=([^&]*)&?.*/,'$1');
         console.log("dev: " + module);
    }

    module='xerox';

    return module;
}


let script = getScriptURL();
let environmentId = 'dev';
let srcBase = getSrcBase(script);    


export default function getModuleInfo () {
    let id= '168262d34ae47d7642f15af14eb6c95d';
    let site;
    let module;

    let webcollageObj = window.WebcollageShowcase;
    
    if(typeof webcollageObj != 'undefined'){
        console.log("object from site page : " + webcollageObj);
        site = webcollageObj.partnerId;
        module = webcollageObj.moduleId;
        script = webcollageObj.scriptSrc;
        srcBase = webcollageObj.srcBase;
    }else{
        console.log("script src from site page : " + script);
        site   = getSiteIdFromScriptSrc(script);
        module = getModuleIdFromScriptSrc(script);
    }
   
    // const siteMosaic = allproducts() ? "generic" : site

    //Call Mosica (Product listing)
    window.Webcollage.loadProductContentForProductListing( site, 
                                                            {containerSelector : ".wcMosaic",  
                                                            layout : "hero-ribbon",
                                                            buttonType : "hidden",
                                                            // menuOrientation :"top-to-bottom",
                                                            buttonPosition : "left-top", 
                                                            cpiAttribute : "data-cpi" }) 

    console.log("default: module- " + module + " &&site- " + site);

const presentationName = configuration.presentationName;

    return{
        module : module,
        site: site,
        id:id,
        scriptsrcbaseurl:script,
        showcasePrefix:srcBase,
        presentationName:presentationName,
        environmentId: environmentId
    }
}
