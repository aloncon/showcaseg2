
import jsonpP from 'jsonp-p'
import {displayWithoutAssortment} from '../system/codes/moduleInfo'

//https://json-preview.wcvlab.net/apps/json/quill/method/partner-products-data-by-wcpc?wcpc=142685906755211&moduleId=keurig&product-details=true 

let moduleName = "xerox"
let partnerName = "cdw"
let apiKey = `moduleId=${moduleName}&product-details=true`
let url = `https://json-preview.wcvlab.net/apps/json/${partnerName}/method/partner-products-data-by-wcpc?`
let allA = false; // <--- should get from another component -- don't leave it  "true" nor "false"

class Api{
    // main function of the class 
    // first check if needed to go to service api for JSON result (or allassortment is allow)
    // after in case there is more then 25 wcpcs it will split them for several request (by using function 'splitRequsts')
    // and only after will get all the
    // responds he need he will send back one promise with the result
    getListOfVerifyWcpcs = (wcpcs) =>{
        if(!allA){
            let config = {
                param: 'callback',
                timeout: 15000,
                prefix: '__jp'
            }
            return new Promise((resolve,reject)=>{
                    //wcpcs=wcpcs.split(",");
                    let fixWcpcs="";  
                    wcpcs.map(wcpc => fixWcpcs+="wcpc="+wcpc+"&")
                    let request = url+fixWcpcs+apiKey;
                    let response; 
                    jsonpP(request,config).promise
                    .then(result =>{
                        let partnerKey = Object.keys(result)
                        let keys = Object.keys(result[partnerKey])
                        if(Boolean(keys.length)){
                            resolve(keys);
                        }
                        else reject({err:`message: ${JSON.stringify(result.errors)} , wcpcs: ${wcpcs}`});
                            
                    })
                    .catch((err) => {
                        reject(`ErrorMsg ${err}`); 
                    })
        
                })
        }
        else{
            
            let allWcpcs = wcpcs.split(",");
            allWcpcs = allWcpcs.map(item => { return parseInt(item)})
            return  Promise.resolve(allWcpcs);
        }
        
        
    }
}

const api = new Api();
export default api

// exapmle:
// http://api.walmartlabs.com/v1/items?ids=222,369677640,12417832,679562478,19336123,951908906&apiKey=rgzr9bdktsbm3d6qy8ppdevb