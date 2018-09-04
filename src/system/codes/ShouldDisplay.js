/* eslint-disable no-eval */
import React from 'react';
import WcShowcase , {partnerDef} from './moduleInfo'
import WcpcAssortment from './WcpcAssortment'
import profile from'../data/module-profiles/profile.json';
import WcLink from './WcResource/WcLink';
// import {WcReports} from './WcEvents';
import '../style/announcements.css';

const findOthersSection = (wc_section, others) =>{
    for( var key in others){
        if(wc_section in others[key]){
            return others[key][wc_section].display
        }
        else{
            if(typeof others[key] === 'object'){
                for (var property in others[key]){
                    if(wc_section in others[key][property]){
                        return others[key][property][wc_section].display
                    }
                }
            }
        }
    }
}
const findOthersProperty = (wc_property, others) =>{
    for( var key in others){
        if(wc_property in others[key]){
            return others[key][wc_property].value
        }
        else{
            if(typeof others[key] === 'object'){
                for (var property in others[key]){
                    if(wc_property in others[key][property]){
                        return others[key][property][wc_property].value
                    }
                }
            }
        }
    }
}

const checkSection = (wc_section) =>{
    if(wc_section.match("include-showcase-banner|include-showcase-nav-bar|wc_navigation_vertical|include-bread-crumbs|include-powered-by|display_all_vendor_products|IN2Ecosystem|enable-reporting")){
        return (partnerDef.Sections[wc_section] !== undefined) ? partnerDef.Sections[wc_section] : profile["Look_and_Feel"][wc_section]
    }
    if(partnerDef.Sections[wc_section] === undefined && findOthersSection(wc_section, profile.Others) === undefined){
        return false;
    }
    return (partnerDef.Sections[wc_section] !== undefined) ? partnerDef.Sections[wc_section] :findOthersSection(wc_section, profile.Others)
}

const announcementProperties = (wc_property, parent) =>{

    if(partnerDef.Properties[wc_property] === undefined && profile.Announcement[parent][wc_property] === undefined){
        return undefined;
    }
    return (partnerDef.Properties[wc_property] !== undefined) ? partnerDef.Properties[wc_property] : profile.Announcement[parent][wc_property].value
}
const announcementSection = (wc_section, parent) =>{

    if(partnerDef.Sections[wc_section] === undefined && profile.Announcement[parent][wc_section] === undefined){
        return undefined;
    }
    return (partnerDef.Sections[wc_section] !== undefined) ? partnerDef.Sections[wc_section] : profile.Announcement[parent][wc_section].display
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



export default ({wc_section, children, ids, wc_property , wc_entryObj, wc_exitObj , wc_announcement}) => {
    if(wc_entryObj){
        return (partnerDef.Properties[wc_entryObj] !== undefined)?partnerDef.Properties[wc_entryObj]:profile.Properties[wc_entryObj] ;
    }
    else if(wc_exitObj){
        return (partnerDef.Exit_Points[wc_exitObj] !== undefined)?partnerDef.Exit_Points[wc_exitObj]:profile.Exit_Points[wc_exitObj];
    }
    else if(wc_announcement){


        const site       = WcShowcase.siteName;
        const moduleName = WcShowcase.moduleName;
        const showcasePrefix = WcShowcase.showcasePrefix;
        let parent = ""
        for(var property in profile.Announcement){
            if(wc_announcement in profile.Announcement[property]){
                parent = property
                break
            }
        }
        const content = announcementSection(wc_announcement, parent);
        const index = wc_announcement.replace(/.*-/,"")
        const link = announcementProperties("landing-page-announcement-"+index+"-link", parent)
        const path = announcementProperties("landing-page-announcement-"+index+"-image", parent)
        const title = announcementProperties("landing-page-announcement-"+index+"-alt", parent)
        const popup = announcementProperties("landing-page-announcement-"+index+"-in-popup", parent)
        const reporting = announcementProperties("landing-page-announcement-"+index+"-code", parent)

        let   pathFull  = "https://scontent.webcollage.net/showcase-partner-center/resources/"+ moduleName +"/" + site+"/"+ path;

        if(showcasePrefix.indexOf("localhost") !== -1 ||
            showcasePrefix.match(/media-itest\d\.webcollage\.net.*/) != null ){
            pathFull = showcasePrefix + "/partners/" + site + "/" + path
        }

        if(content && path.length > 0) {
            const type = (popup)?'popup':'_blank';
            let WcOpenAs = {type:type};
            if(popup){
                if(content.width.length > 0){
                    WcOpenAs["WcWidth"] = content.width
                }
                if(content.height.length > 0){
                    WcOpenAs["WcHeight"] = content.height
                }

            }
            return (
                link.length > 0 ?
                <WcLink href={link} WcOpenAs={WcOpenAs} style={{textAlign : 'center'}}>
                    <img src={pathFull} alt={title} title={title}/>
                </WcLink>:<img src={pathFull} alt={title} title={title}/>
            ); //onClick={() => WcReports("custom-action",reporting)}
        }
        else {
            return (null)
        }
    }
    else{
        let content  = (ids) ? <WcpcAssortment ids={ids}> {children} </WcpcAssortment> : children;
        let section  = wc_section ? eval(reBuild(wc_section)): undefined;
        if(section === undefined && content){
            return content;
        }

        if((section || wc_property) && content){
            return <React.Fragment>{content}</React.Fragment>;
        }


        if(wc_property !== "" && ((section && wc_property) || (!wc_section && wc_property))){
            const property = (partnerDef.Properties[wc_property] !== undefined)?partnerDef.Properties[wc_property]:findOthersProperty(wc_property , profile.Others)
            if(children){
                return (<span>{property}</span>);
            }
            else return property;
        }

        if(section){
            return section;
        }

        else{
            return (null);
        }
    }
};


export const getNosaicConfiguration = () =>{
    return partnerDef ? partnerDef.mosaic_configurations : null;
}
