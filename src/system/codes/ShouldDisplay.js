import React, { Children } from 'react';
import {partnerDef} from './moduleInfo'
import WcpcAssortment from './WcpcAssortment' 

export default ({wc_section, children, ids, wc_property ,wc_entry, wc_group}) => {
    if(wc_property){
        return (<span>{partnerDef.Properties[wc_property]}</span>)
    }
    else if(wc_entry === "entry"){
        return partnerDef.Entry
    }
    else if(wc_group !== undefined){
        if(partnerDef.Properties[wc_group].display){
        return React.cloneElement(children, {
        src: partnerDef.Properties[wc_group].image
        })
        }
        else{
        return (null);
        }
        }
    else{ 
        let content  = (ids && partnerDef.Sections.wc_all_products) ? <WcpcAssortment ids={ids}> {children} </WcpcAssortment> : children
        let section = partnerDef.Sections[wc_section]=== undefined ? true : partnerDef.Sections[wc_section] 
        if(!children){
            return section;
        }
        if(section && content){
            return (<span>
                       {content}
                    </span>)
        }
        else{
            return (null);
        }
    }
};