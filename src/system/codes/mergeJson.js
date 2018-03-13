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
      let   contextPrefix  = "https://scontent.webcollage.net/showcase-partner-center/resources/"+ moduleName +"/" + site+"/context.json";
      // if localhost use the local profiles
      if(site === "allassortment"){
        resolve(profile);
      }
      else if(showcasePrefix.indexOf("localhost") !== -1 || 
              showcasePrefix.match(/media-itest\d\.webcollage\.net.*/) != null ){
        //const partnerDef = require('../data/module-profiles/'+site+'/context.json');
        contextPrefix = showcasePrefix + "/partners/" + site + "/context.json";
        //const partnerDef = require('../../partners/'+site+'/context.json');
       
        //resolve(mergeDeep({},profile, partnerDef));
      }
      //else{
        const random = new Date().getMonth()+1 + Date().replace(/\s|\:|[a-z|A-Z]|\+.*/g,"");
        let config = {
        param: 'callback',
        timeout: 15000,
        prefix: 'cbContext'
        }
        //console.log("path xxxxxxxxxxxxx" , `${contextPrefix}?${random}`)
        jsonpP(`${contextPrefix}?${random}`, config).promise
        .then(result =>{
        resolve(mergeDeep({},profile, result));
        })
        //}
    })
}