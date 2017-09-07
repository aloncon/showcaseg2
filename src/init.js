
const getScriptURL = (function() {
    const scripts = document.getElementsByTagName('script');
    const index = scripts.length - 1;
    const myScript = scripts[index];
    return function() { return myScript.src; };
})();

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

    return{
        module : module,
        site: site,
        id:id
    }
}
