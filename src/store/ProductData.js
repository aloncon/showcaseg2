import { observable, action } from 'mobx'
import VendorCategoryData from '../system/data/vendor-category-data.json'
import VendorData from '../system/data/vendor-data.json'
import api from './Api'
import jsonpP from 'jsonp-p';


let myLocalStorage = window.localStorage;

const ListingStore = observable({
   allProducts : new Map(),
   allIds :new Map(),
   //Used in Landing Page <--- need to delete
   getVerifiedData(ids,callback){
       let newIds = [];

       ids.forEach(id=>{
           if(!this.allIds.has(id)){
            this.allIds.set(id,{isEmpty:true,apiHandle:false , wcpcs:null, caption:null})
            //newIds.push(
            //    new Promise((resolve,reject)=>{
            let data = VendorCategoryData.filter(item => item.id == id)[0]
            let wcpcs = data.wcpcs;
            console.log("WCPCS",wcpcs)
            api.getListOfVerifyWcpcs(wcpcs)
            .then(result=>{
                if(result.err){
                    this.allIds.set(id,{isEmpty:true,apiHandle:true , wcpcs:null , caption : data.caption})
                    callback(false)
                    return;
                }
                else{
                    this.allIds.set(id,{isEmpty:false,apiHandle:true , wcpcs:result , caption : data.caption})
                    callback(true);
                    return
                }
                console.log("this.allIds.get",this.allIds.get(id))
            })
               // })
            //)
            
           }
           else{
                let idData  = this.allIds.get(id);
                if(idData.apiHandle){
                    if(!idData.isEmpty) callback(true)
                    else callback(false);
                    return;
                        
                }
                else{
                      let interval = setInterval(()=>{
                        if(idData.apiHandle){
                            if(!idData.isEmpty) callback(true)
                            else  callback(false);
                            clearInterval(interval);
                        }
                      },200)  
                }
           } 
       })
   },
   //Used in Catergoy Page <--- need to delete
   getCatergoyData(ids , callback){
        let verifyIds = [];
        ids.forEach(id=>{
            verifyIds.push(new Promise(resolve=>{
                this.getVerifiedData([id],(result)=>{
                    if(result) resolve(id)
                    else resolve(null);
                })
            }))
                
        })
        Promise.all(verifyIds)
        .then(result => callback(result))
    },
    //Used for any ProductListing in Pages <--- need to delete
    getProductsData(ids,callback){
        let verifyData = [];
        
        ids.forEach( (id , priority) =>{
            let updateIdsMap = false;
            verifyData.push(new Promise(resolve => {
                let data;
                if(!this.allIds.has(id)){
                    data = VendorCategoryData.filter(item => item.id == id)[0];
                    updateIdsMap = true;
                    api.getListOfVerifyWcpcs(data.wcpcs)
                    .then(result=>{
                        let productsData = null
                        if(result.length > 0 ){
                            productsData = VendorData.filter( (product) => { return result.includes(product.wcpc) })
                        }
                        if(productsData){
                            this.allIds.set(id,{isEmpty:false,apiHandle:true , wcpcs:result , caption : data.caption})
                           resolve({ caption : data.caption , priority : priority , id : id , productsData : productsData})
                        }
                        else {
                            this.allIds.set(id,{isEmpty:true,apiHandle:true , wcpcs:result , caption : data.caption})
                            resolve(null)
                        }
                    })
                }
                else{
                    let idData = this.allIds.get(id)
                    if(idData.isEmpty) resolve(null)
                    else{
                        data = idData;
                        let productsData = null
                        if(idData.wcpcs){
                            productsData = VendorData.filter( (product) => { return idData.wcpcs.includes(product.wcpc) })
                        }
                        resolve({ caption : data.caption , priority : priority , id : id , productsData : productsData})
                        
                    }
                }
                
                
                
            }))
         })

         Promise.all(verifyData)
         .then(result => 
            callback(result)
        )
    }
   
})

export default ListingStore;
