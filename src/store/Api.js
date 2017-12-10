
import jsonpP from 'jsonp-p'
import {displayWithoutAssortment} from '../system/codes/moduleInfo'

let apiKey = "rgzr9bdktsbm3d6qy8ppdevb";
let url = "http://api.walmartlabs.com/v1/items?"


class Api{
    splitRequsts(wcpcs){
        let config = {
            param: 'callback',
            timeout: 15000,
            prefix: '__jp'
        }
        return new Promise((resolve,reject)=>{
            
            
                            let request = url+"ids="+wcpcs+"&apiKey="+apiKey;
                            let response; 
                            jsonpP(request,config).promise
                            .then(result =>{
                                if(result.items){
                                    response = result.items.map(item => {return item.itemId});
                                    resolve(response);
                                }
                                else resolve({err:`Error Cant Fetch Data, message: ${JSON.stringify(result.errors)} , wcpcs: ${wcpcs}`});
                                    
                            })
                            .catch((err) => {
                                reject(`ErrorMsg ${err}`); 
                            })
                
                        })
    }

    // main function of the class 
    // first check if needed to go to service api for JSON result (or allassortment is allow)
    // after in case there is more then 25 wcpcs it will split them for several request (by using function 'splitRequsts')
    // and only after will get all the
    // responds he need he will send back one promise with the result
    getListOfVerifyWcpcs = (wcpcs) =>{
        if(!displayWithoutAssortment){

            let allWcpcsVerify = [];
            let splitWcpcs = wcpcs.split(",")
            if(splitWcpcs.length > 25){
                let wcpcList = "";
                splitWcpcs.forEach((wcpc , i) => {
                    if((i+1)%26 != 0 && (i+1)<splitWcpcs.length)
                        wcpcList+=wcpc+","
                    else{
                        wcpcList+=wcpc;
                        allWcpcsVerify.push(
                            new Promise((resolve,reject)=>{
                                this.splitRequsts(wcpcList)
                                .then(result => {
                                    resolve(result)
                                })
                                .catch(err => reject(err))
                            })
                        )
                        wcpcList = "";
                    }
                        
                })

                return Promise.all(allWcpcsVerify)
                .then(result => {
                    let merged = [].concat.apply([], result);
                    return new Promise( res=> { res(merged) } )
                })
            }
            else{
                return new Promise((resolve,reject)=>{
                    this.splitRequsts(wcpcs)
                    .then( result =>  { resolve(result) } )
                    .catch( err => reject(err) )
                })
            }
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