/* eslint-disable no-eval */
import React from 'react';
import WcShowcase , {partnerDef} from './moduleInfo'
import WcpcAssortment from './WcpcAssortment'
import profile from'../data/module-profiles/profile.json';
import WcLink from './WcResource/WcLink';
// import {WcReports} from './WcEvents';
import '../style/announcements.css';


const checkSection = (wc_section) =>{
    
    if(partnerDef.Sections[wc_section] === undefined && profile.Sections[wc_section] === undefined){
        return false;
    }
    return (partnerDef.Sections[wc_section] !== undefined) ? partnerDef.Sections[wc_section] : profile.Sections[wc_section]
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
        const content = (partnerDef.Announcement !== undefined && partnerDef.Announcement[wc_announcement] !== undefined)?partnerDef.Announcement[wc_announcement]:false;
        const site       = WcShowcase.siteName;
        const moduleName = WcShowcase.moduleName;
        if(content){
            const showcasePrefix = WcShowcase.showcasePrefix;
            const display = content.display
            const link = content.link 
            const path = content.path
            const title = content.title
            const popup = content.popup
            const reporting = content.reporting_title

            let   pathFull  = "https://scontent.webcollage.net/showcase-partner-center/resources/"+ moduleName +"/" + site+"/"+ content.path;
            
            if(showcasePrefix.indexOf("localhost") !== -1 || 
                showcasePrefix.match(/media-itest\d\.webcollage\.net.*/) != null ){
                pathFull = showcasePrefix + "/partners/" + site + "/" + content.path
            }

            if(display && path.length > 0) {
                
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
            else return (null)
            
        }
        else{
            console.error("WC-ERROR: Please add Announcement key to the "+site+"'s "+moduleName+"-showcase.json")
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
            const property = (partnerDef.Properties[wc_property] !== undefined)?partnerDef.Properties[wc_property]:profile.Properties[wc_property] 
            return (<span>{property}</span>);
        }

        if(section){
            return section;
        }

        else{
            return (null);
        }
    }
};



