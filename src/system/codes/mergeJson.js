import WcShowcase from './moduleInfo';
import jsonpP from 'jsonp-p';


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
        jsonpP(`${contextPrefix}?${random}`, config).promise
        .then(result =>{
          resolve(result); 
        }).catch(function (err) {
          console.error("WC-ERROR: Context file for this partner is missing")
        });
    })
}