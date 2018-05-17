import WcShowcase from './moduleInfo';
import jsonpP from 'jsonp-p';
import profile from'../data/module-profiles/profile.json';

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return mergeDeep(target, ...sources);
}

 export default function merge(){

    return new Promise((resolve)=>{
      const site = WcShowcase.siteName;
      const moduleName     = WcShowcase.moduleName;
      const showcasePrefix = WcShowcase.showcasePrefix;
      const context = WcShowcase.context + ".json"

      let   contextPrefix  = "https://scontent.webcollage.net/showcase-partner-center/resources/"+ moduleName +"/" + site+"/"+ context;
      
      if(showcasePrefix.indexOf("localhost") !== -1 || 
        showcasePrefix.match(/media-itest\d\.webcollage\.net.*/) != null ){
        contextPrefix = showcasePrefix + "/partners/" + site + "/" + context;
      }

        const random = new Date().getMonth()+1 + Date().replace(/\s|:|[a-z|A-Z]|\+.*/g,"");
        let config = {
        param: 'callback',
        timeout: 1000,
        prefix: 'cbContext'
        }
        
        console.log('------------------------------------');
        console.log("contextPrefix ", contextPrefix);
        console.log('------------------------------------');
        jsonpP(`${contextPrefix}?${random}`, config).promise
        .then(result =>{
        resolve(mergeDeep({},profile, result));
        }).catch(function (err) {
          console.error("WC-ERROR: Context file for this partner is missing")
        });
    })
}