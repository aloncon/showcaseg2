import React from 'react';
import {partnerDef} from './moduleInfo'
import WcpcAssortment from './WcpcAssortment' 


export default ({wc_section, children, ids, wc_property ,wc_entry, wc_entryObj, wc_exitObj}) => {
    if(wc_property){
        return (<span>{partnerDef.Properties[wc_property]}</span>)
    }
    else if(wc_entryObj){
        return partnerDef.Properties[wc_entryObj]
    }
    else if(wc_exitObj){
        return partnerDef.Exit_Points[wc_exitObj]
    }
    else{ 
        let content  = (ids && partnerDef.Sections.wc_all_products) ? <WcpcAssortment ids={ids}> {children} </WcpcAssortment> : children
        let section = partnerDef.Sections[wc_section]=== undefined ? true : partnerDef.Sections[wc_section] 
        if(!children){
            return section;
        }
        if(section && content){
            return <React.Fragment>{content} </React.Fragment>
        }
        else{
            return (null);
        }
    }
};