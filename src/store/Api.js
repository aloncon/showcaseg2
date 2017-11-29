import React from 'react';
import jsonpP from 'jsonp-p'

let apiKey = "rgzr9bdktsbm3d6qy8ppdevb";
let url = "http://api.walmartlabs.com/v1/items?"


class Api{
    getListOfVerifyWcpcs = (wcpcs) =>{
        return new Promise((resolve,reject)=>{
            let request = url+"ids="+wcpcs+"&apiKey="+apiKey;
            let response;
            jsonpP(request).promise
            .then(result =>{
                if(result.items){
                    response = result.items.map(item => {return item.itemId});
                    resolve(response);
                }
                reject(`Error Cant Fetch Data, message: ${JSON.stringify(result.errors)} , wcpcs: ${wcpcs}`);
                    
            })
            .catch((err) => {
                reject(`ErrorMsg ${err}`); 
            })
            
            

        })
        
    }
}

const api = new Api();
export default api

// exapmle:
// http://api.walmartlabs.com/v1/items?ids=222,369677640,12417832,679562478,19336123,951908906&apiKey=rgzr9bdktsbm3d6qy8ppdevb