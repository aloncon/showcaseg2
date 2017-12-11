import React from 'react';
import get from 'jsonp';
import providerCC from'../data/module-profiles/providerCenter.json';
import basic from'../data/module-profiles/basicModuleDisplay.json';
import WcShowcase from './moduleInfo'
import basicPartnerDef from'../data/module-profiles/basicModuleDisplay.json';


//json match
export default () => {
    // const site = WcShowcase.siteName;
    const partnerDef = require('../data/module-profiles/cdw/module-profile.json');
    const moduleDef = deepCompare(partnerDef);
    return moduleDef;
}

function deepCompare (partnerDef) {
    if(partnerDef.module === basic.module && partnerDef.partner === "cdw"){ // "cdw change to WcShowcase.siteName"
        if(JSON.stringify(partnerDef) === JSON.stringify(basic)){
            return basicPartnerDef;
        }
        else{
            
            return partnerDef;
        }
    } 
    else{
        alert("Problem with partner Json");
        return basicPartnerDef;
    }  
}