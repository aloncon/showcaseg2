
import jsonpP from 'jsonp-p'
// import WcpcContent from '../system/codes/WcpcContent'

//https://json-preview.wcvlab.net/apps/json/quill/method/partner-products-data-by-wcpc?wcpc=142685906755211&moduleId=keurig&product-details=true 

let moduleName = "xerox"
let partnerName = "cdw"
let apiKey = `moduleId=${moduleName}&product-details=true`
let url = `https://json-preview.wcvlab.net/apps/json/${partnerName}/method/partner-products-data-by-wcpc?`

class Api{
    // main function of the class 
    // first check if needed to go to service api for JSON result (or allassortment is allow)
    // after in case there is more then 25 wcpcs it will split them for several request (by using function 'splitRequsts')
    // and only after will get all the
    // responds he need he will send back one promise with the result
    getListOfVerifyWcpcs = (wcpcs) =>{
        const {displayWithoutAssortment}= false; //WcpcContent({wc_section:"wc_all_module_products"}) 
        if(!displayWithoutAssortment){

            let config = {
                param: 'callback',
                timeout: 15000,
                prefix: '__jp'
            }
            return new Promise((resolve,reject)=>{
                    let fixWcpcs="";  
                    wcpcs.map(wcpc => fixWcpcs+="wcpc="+wcpc+"&")
                    let request = url+fixWcpcs+apiKey;
                    let response; 
                    jsonpP(request,config).promise
                    .then(result =>{
                        console.log("RESULT API" , result);
                        let partnerKey = Object.keys(result)
                        let resultPartner = result[partnerKey]
                        let keys = Object.keys(resultPartner)
                        if(Boolean(keys.length)){
                            let temp = keys.map(key => {return {wcpc:key,cp:Object.keys((resultPartner[key]).cpis)[0]}})
                            
                            console.log("RESULT API temp",temp)
                            resolve(temp);
                        }
                        else reject({err:`message: ${JSON.stringify(result.errors)} , wcpcs: ${wcpcs}`});
                            
                    })
                    .catch((err) => {
                        reject(`ErrorMsg ${err}`); 
                    })
        
                })
        }
        else{
            let allWcpcs = wcpcs
            return  Promise.resolve(allWcpcs);
        }
        
        
    }
}

const api = new Api();
export default api