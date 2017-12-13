import React from 'react';
import get from 'jsonp';
import mergeJson from './mergeJson'
import ShoulDisplay from './lisit/ShouldDisplay'

const partnerDef = mergeJson();

export default ({call, children,ids}) => {
    let answer= {};
    if(call == "section"){
        answer = displaySections();
        return answer;
    }
    else if(call == "entry"){
        answer = entryConfig();
        return answer;
    }
    else{ 
       return(propertiesConfig(call,children,ids)) 
    }
}

function propertiesConfig(call,children,ids){
    let content  = ids ? <ShoulDisplay ids={ids}> {children} </ShoulDisplay> : children
    if(partnerDef.Properties[call] || ids){
        return (<span>
                   {content}
                </span>)
    }
    else{
        return (<span>{null}</span>);
    }
}

function entryConfig(){
    return {
        "entry": partnerDef.Entry
    }
}

function displaySections (){
    let sections = {
        "showcase" : partnerDef.showcase,
        "displayHeader" : partnerDef.Sections.wc_header,
        "displayNavigationHorizontal":partnerDef.Sections.wc_navigation_horizontal,
        "displayNavigationVertical":partnerDef.Sections.wc_navigation_vertical,
        "displayBreadcrumbs": partnerDef.Sections.wc_bread_crumbs,
        "displayFooter": partnerDef.Sections.wc_footer,
        "displayWithoutAssortment" : partnerDef.Sections.wc_all_module_products
    }
    return sections;
}