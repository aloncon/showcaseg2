import configuration from '../../custom_content/configuration';

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

//TODO: vika: live-->live - I didn`n fine example to such a link
let environmentId = "dev";

console.log("environmentId", environmentId);

function getSrcBase(scriptUrl) {
    if (scriptUrl.includes('rawgit.com')) {
            console.log('in git!',scriptUrl)
            //return `https://rawgit.com/aloncon/showcaseg2/master/build/`;
            environmentId = 'git';
            return scriptUrl.replace(/\/build\/.*/,"/build/");             
    }

    if (scriptUrl.includes('media-preview.')) {
            console.log('in stage!');
            environmentId = 'live';

            return `http://media-preview.webcollage.net/rwvfp/wc/live/99999991/module/webcollage/_wc/react_showcase/showcase-app-1/`; 
            //src = `http://media-preview.webcollage.net/rwvfp/wc/live/99999991/module/webcollage/_wc/react_showcase/showcase-app-1/${src}`;        
    }

    if (scriptUrl.includes('www.test.')) {
            console.log('in test!');
            environmentId = 'test';
            return `http://www.test.webcollage.webcollage.net/_wc/react_showcase/showcase-app-1/`;
    }

    if (scriptUrl.includes('localhost:')) {
            console.log('in test!')
            return `http://localhost:3000`;
    }

    //for testing only on real site
    if (scriptUrl.includes('scontent.webcollage.net/')) {
            console.log('in original site - testing only!!',scriptUrl)
            //return `https://rawgit.com/aloncon/showcaseg2/master/build/`;             
            scriptUrl.replace(/\/build\/.*/,"/build/");
    }    
    
  //localhost  
   return null; 
}

const scriptUrl = getScriptURL();
console.log('original JS src', scriptUrl);
const srcBase = getSrcBase(scriptUrl);
console.log('base Src' + srcBase);

export default function getModuleInfo () {
    let id= '168262d34ae47d7642f15af14eb6c95d';
    let script = getScriptURL();
    //script = 'https://itest2.webcollage.net/qa/creport/test-michal/build/static/js/main.js?module=xerox&site=cdw';
    //let module = script.replace(/.*www\.[^\.]*\.([^\.]*)\..*/,'$1');
    //let site = script.replace(/.*server\/([^\/]*)\/.*/,'$1');

    let site;
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

    if(script.indexOf('site=')!=-1){
        site = script.replace(/.*site=([^&]*)&?.*/,'$1');
        console.log("dev-site: " + site);
    }

    site = 'cdw';

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
