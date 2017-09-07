
const getScriptURL = (function() {
    const scripts = document.getElementsByTagName('script');
    const index = scripts.length - 1;
    const myScript = scripts[index];
    console.log("script idddddddddd" + index);
    
    return function() { return myScript.src; };
})();

export default function getModuleInfo () {
   
    let id= '168262d34ae47d7642f15af14eb6c95d';
    let script = getScriptURL();
    script = 'http://www.test.xerox.webcollage.net/server/cdw/';
    let module = script.replace(/.*www\.[^\.]*\.([^\.]*)\..*/,'$1');
    let site = script.replace(/.*server\/([^\/]*)\/.*/,'$1');
    return{
        module : module,
        site: site,
        id:id
    }
}
