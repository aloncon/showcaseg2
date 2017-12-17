import React from 'react';
import get from 'jsonp';
import WcShowcase from './moduleInfo'
import jsonpP from 'jsonp-p'
import allassortment from'../data/module-profiles/allassortment.json';
import { resolve } from 'url';

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, ...sources) {
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

export default () => {
    const site = WcShowcase.siteName;
    const partnerDef = require('../data/module-profiles/'+site+'/module-profile.json');
    return mergeDeep({},allassortment, partnerDef);

}