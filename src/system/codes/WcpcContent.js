import React from 'react';
import get from 'jsonp';
import mergeJson from './mergeJson'

const partnerDef = mergeJson();

export default ({call, children}) => {
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
       return(propertiesConfig(call,children)) 
    }
}

function propertiesConfig(call,children){
    if(partnerDef.Properties[call] ){
        return (<span>
                    {children}
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