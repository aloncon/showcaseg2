import React from 'react';
import get from 'jsonp';
import WcShowcase from './moduleInfo';
import jsonpP from 'jsonp-p';
import profile from'../data/module-profiles/profile.json';
import { resolve } from 'url';

let DATA;

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
      const showcasePrefix = WcShowcase.showcasePrefix;
      // if localhost use the local profiles
      if(site === "allassortment"){
        resolve(profile);
      }
      else if(showcasePrefix.indexOf("localhost") != -1){
        const partnerDef = require('../data/module-profiles/'+site+'/context.json');
        resolve(mergeDeep({},profile, partnerDef));
      }
      else{
        const random = new Date().getMonth()+1 + Date().replace(/\s|\:|[a-z|A-Z]|\+.*/g,"");
        let config = {
        param: 'callback',
        timeout: 15000,
        prefix: 'cbContext'
        }
        jsonpP("https://scontent.webcollage.net/showcase-partner-center/resources/webcollage/"+site+"/context.json?"+random, config).promise
        .then(result =>{
        resolve(mergeDeep({},profile, result));
        })
        }
    })
}