import WcShowcase from '../moduleInfo';
import WcMixPanel from './WcMixPanel'

let     reporterRoot = "http://rel.webcollage.net/apps/el";
let     enableReportingToDsplyDotCom = true;
let     dsplyDotComReporterRoot = "https://www.dsply.com/index.php?pid=rv4a0pklnx"; //TODO: check if alwase the same code
//let     p2bUrlTemplate = "http://content.webcollage.net/%PARTNER_ID%/actions?action=p2b&channel-product-id=%CHANNEL_PRODUCT_ID%"; //TODO: check when needed
let     enableReporting = true;
let     moduleId = "";
let     partnerId = "";
//let     languageCode = "en";//TODO: check when/if needed
//let     countryCode = "us";//TODO: check when/if needed
let     profilePath = "-showcase";//TODO: check if alwase like that? (probably yes)
let     contextPath = "allassortment-showcase";
let     pageId = new Date().getTime() + ("" + Math.random()).substr(2);
let     origin = "showcase";//TODO: check if alwase like that? (probably yes)
let     url = "/_wc/landingpage/landingpage.html";//TODO: check if alwase like that? (probably yes)
let     showcasePageTitle = "";
let     wcpc = "";//TODO: check when/if needed
let     channelProductId = "";//TODO: check when/if needed
let     channelProductName = "";//TODO: check when/if needed
let     vendorProductName = "";//TODO: check when/if needed
let     productCategory = "";//TODO: check when/if needed
let     tab = "";//TODO: check when/if needed
let     tabCaption = "";//TODO: check when/if needed
let     tabVar = "";//TODO: check when/if needed
let     subTab = "";//TODO: check when/if needed
let     tabCode = "";//TODO: check when/if needed

function reportEventToDsplyDotCom(wcReportingUrl) {
    if(enableReportingToDsplyDotCom) {
        var img = new Image(1, 1);
        img.onload = function(){};
        var qs = wcReportingUrl.replace(/[^?]+?(.+)/, "$1");
        img.src = dsplyDotComReporterRoot + "&" + qs;
    }
}

function wcReportEvent(event, parameters, callbackWhenReportingIsDone){
    
    moduleId = WcShowcase.moduleName;
    partnerId = WcShowcase.siteName;
    let mtrMediaBaseUrl = WcShowcase.showcasePrefix;
    showcasePageTitle = WcShowcase.moduleName;

    function isValid(_obj) {
        if(_obj === null) return false;
        switch (typeof(_obj)) {
            case "string": return _obj.length > 0;
            case "number": return true;
            case "boolean": return true;
            case "object": return false;
            case "function": return false;
            case "undefined": return false;
            default: return false;
        }
    }

    function normalizeTextValue(_obj) {
        //This function converts XML entities to plain text (for example: "&lt;" will be converted to "<").
        if(typeof _obj === "string") {
            var e = document.createElement('div');
            e.innerHTML = _obj.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return e.childNodes.length === 0 ? _obj : e.childNodes[0].nodeValue;
        }
        else {
            return _obj;
        }
    }

    if (enableReporting)             
    {
        //let {moduleId, url, profilePath, contextPath, pageId, partnerId, wcpc, origin, channelProductId, channelProductName, vendorProductName, productCategory, tab, tabCaption, tabVar, subTab, tabCode, reporterRoot, showcasePageTitle  } = this.init;          
        var defaultParams = {};
        if(isValid(moduleId)){defaultParams["module"] = moduleId;}                        
        if(isValid(url)){defaultParams["url"] = url;}                            
        if(isValid(profilePath)){defaultParams["profilepath"] = profilePath;}                 
        if(isValid(contextPath)){defaultParams["contextpath"] = partnerId.concat(profilePath);} /*I changed it so it will take the correct site original: defaultParams["contextpath"] = contextPath;*/
        if(isValid(pageId)) {defaultParams["pageId"] = pageId;}                          
        if(isValid(partnerId)){defaultParams["partnerid"] = partnerId;}                        
        if(isValid(wcpc)){defaultParams["wcpc"] = wcpc;} //TODO: check why needed                          
        if(isValid(origin)){defaultParams["origin"] = origin;}                           
        if(isValid(channelProductId)){defaultParams["channel-product-id"] = channelProductId;} //TODO: check why needed                  
        if(isValid(channelProductName)){defaultParams["channel-product-name"] = channelProductName;} //TODO: check why needed                
        if(isValid(vendorProductName)){defaultParams["mpn"] = vendorProductName;} //TODO: check why needed                
        if(isValid(productCategory)){defaultParams["prod-category"] = productCategory;} //TODO: check why needed  
        if(isValid(tab)){defaultParams["tab"] = tab;} //TODO: check why needed                              
        if(isValid(tabCaption)){defaultParams["tab-caption"] = tabCaption;} //TODO: check why needed                      
        if(isValid(tabVar)){defaultParams["tab-var"] = tabVar;} //TODO: check why needed                           
        if(isValid(subTab)){defaultParams["sub-tab"] = subTab;} //TODO: check why needed                           
        if(isValid(tabCode)){defaultParams["tab-code"] = tabCode;} //TODO: check why needed         
        if(origin === "showcase"){defaultParams["containerurl"] = document.location.href}else{defaultParams["containerurl"] = document.location.hostname}
        //TODO: check why needed 
        if(isValid(contextPath) && contextPath.indexOf('product')!==-1)
        {
            defaultParams["content-package"] = "mini-site";
        }else if(origin === "showcase"){
            defaultParams["content-package"] = "showcase";
        }
        defaultParams["localtimestamp"] = new Date().valueOf();


        if (typeof parameters === "object")
            parameters = Object.assign((event === "brand-level-pageview") ? {} : {"allow-pc": "false", "allow-tc": "false"}, parameters);
        else if (typeof parameters === "undefined" && event !== "brand-level-pageview")
            parameters = {"allow-pc": "false", "allow-tc": "false"};

        var reportingParams = Object.assign(true, {}, defaultParams, parameters || {});

        if (event === "brand-level-pageview")
        {
            reportingParams["page-domain"] = document.domain;
            if(document.referrer.length)
                reportingParams["referrer-domain"] = document.referrer.split("/")[2];
        }

        //bcs we activate the wcReportCustomAction function with 'custom-action' - it will concat it to the message string
        var reportingUrl = reporterRoot + "?e=" + event;
        //Gitit - I added it to take the correct module id
        
        for(var parameter in reportingParams)
            reportingUrl += "&" + parameter + "=" + encodeURIComponent(normalizeTextValue(reportingParams[parameter]));
        


        //TODO: CHECK WHAT IS IT:

        // if (escapedReportingFilters)
            // reportingUrl += "&" + escapedReportingFilters.replace(/^&|&$/g, '');

        if (showcasePageTitle){
            showcasePageTitle = moduleId;             
            showcasePageTitle = showcasePageTitle[0].toUpperCase().concat(showcasePageTitle.slice(1,showcasePageTitle.length));
            showcasePageTitle = showcasePageTitle.concat(" Store")
            reportingUrl += "&page-title=" + encodeURIComponent(showcasePageTitle);
        }
        
        //TODO: CHECK WHAT IS IT:
        // if (originRelatedParameters)
        //     reportingUrl += "&" + originRelatedParameters.replace(/^&|&$/g, '');

        //TODO: CHECK WHAT IS IT:
        // if (!multiTenantReporter)
        // {
        //     reportingUrl = wsmlMakeResourceUrl(reportingUrl);
        // }

        reportingUrl += "&_sof";

        reportEventToDsplyDotCom(reportingUrl);

        var reportingImage = new Image(1, 1);
        var doneFunction = function() {
            if (callbackWhenReportingIsDone)
            {
                callbackWhenReportingIsDone();
                callbackWhenReportingIsDone = null;
            }
        }

        reportingImage.onload = doneFunction;

        if (callbackWhenReportingIsDone)
            window.setTimeout(doneFunction, 2000);

        reportingImage.src = reportingUrl;

        
        // if (typeof WebCollage.callThirdPartyReporting != 'undefined')
        // {
        //     if (parameters == null)
        //         parameters = {};

        //     for (parameter in WebCollage)
        //     {
        //         if (typeof(WebCollage[parameter]) == "string" && typeof(parameters[parameter]) == "undefined")
        //             parameters[parameter] = WebCollage[parameter];
        //     }

        //     WebCollage.callThirdPartyReporting(event, parameters);
        // }

    }else if (callbackWhenReportingIsDone){
        callbackWhenReportingIsDone();
    }
        
}      

const WcReports = (type,reportCode) => {
    //console.log('gitit in reporting: type: '+type+' , reportCode: '+reportCode)
   let customActionCode = reportCode;
   switch (type) {    
    //On Page Load  
        case "brand-level-pageview":
            WcMixPanel("brand-level-pageview",customActionCode);
            return wcReportEvent('brand-level-pageview');
    //Announcments Events             
        case "promotion-view":
            WcMixPanel("promotion-view",customActionCode);
            return wcReportEvent("promotion-view", {"promotion-code":customActionCode});
        case "promotion-click":
            WcMixPanel("promotion-click",customActionCode);
            return wcReportEvent("promotion-click", {"promotion-code":customActionCode});
    //Custom Action Events             
        case "custom-action":
            WcMixPanel("custom-action",customActionCode);        
            return wcReportEvent('custom-action', {'action-name':customActionCode});   
    //Video Gallery Events                     
        case "video-view":
            WcMixPanel("video-view",customActionCode);  
            return wcReportEvent('video-view', {'video-view':customActionCode});
        case "video-click":
            WcMixPanel("video-click",customActionCode);  
            return wcReportEvent('video-click', {'video-click':customActionCode}); 
    //P2B Events               
        case "p2b":
            WcMixPanel("p2b",customActionCode);  
            return wcReportEvent('p2b', {'p2b':customActionCode});
    //Product Listing - Carousel Events                            
        case "product-listing-carousel-view":
            //WcMixPanel("product-listing-carousel-view",customActionCode);  
            return wcReportEvent('product-listing-view', {'product-listing-type':'carousel','wcpc':customActionCode});
        case "product-listing-carousel-click":
            //WcMixPanel("product-listing-carousel-click",customActionCode);  
            return wcReportEvent('product-listing-click', {'product-listing-type':'carousel','wcpc':customActionCode});
        
    //Product Listing - Wide Events             
        case "product-listing-wide-view-product":
            WcMixPanel("product-listing-wide-view-product",customActionCode);  
            return wcReportEvent('product-listing-view', {'product-listing-type':'wide','wcpc':customActionCode});                                                             
        case "product-listing-wide-view-family-product-wcpc":
            WcMixPanel("product-listing-wide-view-family-product-wcpc",customActionCode);  
            return wcReportEvent('product-listing-view', {'product-listing-type':'wide','family-product-wcpc':customActionCode});                                                             
        case "product-listing-wide-view-family-product-cpi":
            WcMixPanel("product-listing-wide-view-family-product-cpi",customActionCode);  
            return wcReportEvent('product-listing-view', {'product-listing-type':'wide','cpi':customActionCode});
        
        case "product-listing-wide-click-product":
            // WcMixPanel("product-listing-wide-view-product",customActionCode);  
            return wcReportEvent('product-listing-view', {'product-listing-type':'wide','wcpc':customActionCode});                                                             
        case "product-listing-wide-click-family-product-wcpc":
            // WcMixPanel("product-listing-wide-view-product",customActionCode);  
            return wcReportEvent('product-listing-click', {'product-listing-type':'wide','family-product-wcpc':customActionCode});                                                             
        case "product-listing-wide-click-family-product-cpi":
            // WcMixPanel("product-listing-wide-view-product",customActionCode);  
            return wcReportEvent('product-listing-click', {'product-listing-type':'wide','cpi':customActionCode}); 
            
    //Product Listing - Wide Events             
        case "product-listing-wide-view-product":
            // WcMixPanel("product-listing-wide-view-product",customActionCode);  
            return wcReportEvent('product-listing-view', {'product-listing-type':'wide','wcpc':customActionCode});                                                             
        case "product-listing-wide-view-family-product-wcpc":
            // WcMixPanel("product-listing-wide-view-product",customActionCode);  
            return wcReportEvent('product-listing-view', {'product-listing-type':'wide','family-product-wcpc':customActionCode});                                                             
        case "product-listing-wide-view-family-product-cpi":
            // WcMixPanel("product-listing-wide-view-product",customActionCode);  
            return wcReportEvent('product-listing-view', {'product-listing-type':'wide','cpi':customActionCode});
        
        case "product-listing-wide-click-product":
            // WcMixPanel("product-listing-wide-view-product",customActionCode);  
            return wcReportEvent('product-listing-view', {'product-listing-type':'wide','wcpc':customActionCode});                                                             
        case "product-listing-wide-click-family-product-wcpc":
            // WcMixPanel("product-listing-wide-view-product",customActionCode);  
            return wcReportEvent('product-listing-click', {'product-listing-type':'wide','family-product-wcpc':customActionCode});                                                             
        case "product-listing-wide-click-family-product-cpi":
            // WcMixPanel("product-listing-wide-view-product",customActionCode);  
            return wcReportEvent('product-listing-click', {'product-listing-type':'wide','cpi':customActionCode});   
    
    //Product Listing - Grid Events             
        case "product-listing-grid-view-product":
        // WcMixPanel("product-listing-grid-view-product",customActionCode);  
        return wcReportEvent('product-listing-view', {'product-listing-type':'grid','wcpc':customActionCode});                                                             
        case "product-listing-grid-view-family-product-wcpc":
            // WcMixPanel("product-listing-grid-view-product",customActionCode);  
            return wcReportEvent('product-listing-view', {'product-listing-type':'grid','family-product-wcpc':customActionCode});                                                             
        case "product-listing-grid-view-family-product-cpi":
            // WcMixPanel("product-listing-grid-view-product",customActionCode);  
            return wcReportEvent('product-listing-view', {'product-listing-type':'grid','cpi':customActionCode});
        
            case "product-listing-grid-click-product":
            // WcMixPanel("product-listing-grid-view-product",customActionCode);  
            return wcReportEvent('product-listing-view', {'product-listing-type':'grid','wcpc':customActionCode});                                                             
        case "product-listing-grid-click-family-product-wcpc":
            // WcMixPanel("product-listing-grid-view-product",customActionCode);  
            return wcReportEvent('product-listing-click', {'product-listing-type':'grid','family-product-wcpc':customActionCode});                                                             
        case "product-listing-grid-click-family-product-cpi":
            // WcMixPanel("product-listing-grid-view-product",customActionCode);  
            return wcReportEvent('product-listing-click', {'product-listing-type':'grid','cpi':customActionCode});                           
        
            default: return null
    }

};

export default WcReports;
