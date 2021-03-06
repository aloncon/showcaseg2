import WcShowcase from '../moduleInfo';
import mixpanel from 'mixpanel-browser';



const WcMixPanel = (message,reportCode) => {

    if(message === undefined){
        message = "Undetected Page";
    }
    if(reportCode === undefined){
        reportCode = "Undetected Message";
    }


    if(WcShowcase.environmentId!=='live'){

        const moduleId = WcShowcase.moduleName;
        const partnerId = WcShowcase.siteName;
        const showcasePageTitle = WcShowcase.moduleName;  

        switch (message) {    
            case "brand-level-pageview":
                return mixpanel.track(message,{
                    "Page Load Event"       : 'brand-level-pageview',
                    "Page Name:"            : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });
            case "promotion-view":
                return mixpanel.track(message,{
                    "Announcment Event"     : 'promotion-view',
                    "Announcment Title"     : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });
            case "promotion-click":
                return mixpanel.track(message,{
                    "Announcment Event"     : 'promotion-click',
                    "Announcment Title"     : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });            
            case "custom-action":
                return mixpanel.track(message,{
                    "Announcment Event"     : 'custom-action',
                    "customActionCode"      : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });             
            case "video-view":
                return mixpanel.track(message,{
                    "Video Event"           : 'video-view',
                    "Video Title"           : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });              
            case "video-click":
                return mixpanel.track(message,{
                    "Video Event"           : 'video-click',
                    "Video Title"           : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });  
            case "product-listing-carousel-view":
                return mixpanel.track(message,{
                    "Product Listing Event" : 'product-listing-view',
                    "Product Listing Type"  : 'Carousel',
                    "Product Wcpc"          : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });              
            case "product-listing-carousel-click":
                return mixpanel.track(message,{
                    "Product Listing Event" : 'product-listing-click',
                    "Product Listing Type"  : 'Carousel',
                    "Product Wcpc"          : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });  
            case "product-listing-wide-view-product":
                return mixpanel.track(message,{
                    "Product Listing Event" : 'product-listing-view',
                    "Product Listing Type"  : 'Wide',
                    "Product Wcpc"          : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });                  
            case "product-listing-wide-view-family-product-wcpc":
                return mixpanel.track(message,{
                    "Product Listing Event" : 'product-listing-view',
                    "Product Listing Type"  : 'Wide',
                    "Product Wcpc"          : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });  
            case "product-listing-wide-view-family-product-cpi":
                return mixpanel.track(message,{
                    "Product Listing Event" : 'product-listing-view',
                    "Product Listing Type"  : 'Wide',
                    "Product CPI"          : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                }); 
            case "product-listing-wide-click-product":
                return mixpanel.track(message,{
                    "Product Listing Event" : 'product-listing-click',
                    "Product Listing Type"  : 'Wide',
                    "Product Wcpc"          : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });                  
            case "product-listing-wide-click-family-product-wcpc":
                return mixpanel.track(message,{
                    "Product Listing Event" : 'product-listing-click',
                    "Product Listing Type"  : 'Wide',
                    "Product Wcpc"          : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });  
            case "product-listing-wide-click-family-product-cpi":
                return mixpanel.track(message,{
                    "Product Listing Event" : 'product-listing-click',
                    "Product Listing Type"  : 'Wide',
                    "Product CPI"          : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });  
            case "product-listing-grid-view-product":
                return mixpanel.track(message,{
                    "Product Listing Event" : 'product-listing-view',
                    "Product Listing Type"  : 'Grid',
                    "Product Wcpc"          : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });                  
            case "product-listing-grid-view-family-product-wcpc":
                return mixpanel.track(message,{
                    "Product Listing Event" : 'product-listing-view',
                    "Product Listing Type"  : 'Grid',
                    "Product Wcpc"          : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });  
            case "product-listing-grid-view-family-product-cpi":
                return mixpanel.track(message,{
                    "Product Listing Event" : 'product-listing-view',
                    "Product Listing Type"  : 'Grid',
                    "Product CPI"          : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                }); 
            case "product-listing-grid-click-product":
                return mixpanel.track(message,{
                    "Product Listing Event" : 'product-listing-click',
                    "Product Listing Type"  : 'Grid',
                    "Product Wcpc"          : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });                  
            case "product-listing-grid-click-family-product-wcpc":
                return mixpanel.track(message,{
                    "Product Listing Event" : 'product-listing-click',
                    "Product Listing Type"  : 'Grid',
                    "Product Wcpc"          : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });  
            case "product-listing-grid-click-family-product-cpi":
                return mixpanel.track(message,{
                    "Product Listing Event" : 'product-listing-click',
                    "Product Listing Type"  : 'Grid',
                    "Product CPI"          : reportCode,
                    "Module Id"             : moduleId, 
                    "Partner Id"            : partnerId,
                    "Showcase Page Title"   : showcasePageTitle,
                });                                                                 
            default: return null
        }         
        

    }

    return null;
    

 };
 

export default WcMixPanel;
// export default withRouter(WcMixPanel);