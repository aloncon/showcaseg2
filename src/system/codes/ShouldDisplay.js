/* eslint-disable no-eval */
import React from 'react';
import {partnerDef} from './moduleInfo'
import WcpcAssortment from './WcpcAssortment'



const checkSection = (wc_section) =>{
    return partnerDef.Sections[wc_section]=== undefined ? false : partnerDef.Sections[wc_section]
}
const reBuild = (expArray) => {
    if(expArray.match(/,/g) && !expArray.match(/&&|\|\||!|\(|\)/g)){

        expArray = expArray.replace(/,{2,}/g,",").replace(/,/g, "||")
    }
    const variables = expArray.replace(/\s?(&&|\|\||!|\(|\))\s?/g , ",").replace(/,{2,}/g,",").replace(/^,|,$/g ,"").split(",");
    variables.forEach(element => {
        expArray = expArray.replace(element , checkSection(element))
    });
    return expArray;
}



export default ({wc_section, children, ids, wc_property , wc_entryObj, wc_exitObj , wc_remove}) => {
    if(wc_entryObj){
        return partnerDef.Properties[wc_entryObj]
    }
    else if(wc_exitObj){
        return partnerDef.Exit_Points[wc_exitObj]
    }
    else{
        let content  = (ids) ? <WcpcAssortment ids={ids}> {children} </WcpcAssortment> : children
        let section  = wc_section ? eval(reBuild(wc_section)): undefined;



        if(section === undefined && content){
            return content
        }

        if((section || wc_property) && content){
            return <React.Fragment>{content}</React.Fragment>
        }

        if(wc_property !== "" && ((section && wc_property) || (!wc_section && wc_property))){
            return (<span>{partnerDef.Properties[wc_property]}</span>)
        }

        if(section){
            return section
        }

        else{
            return (null);
        }
    }
};



