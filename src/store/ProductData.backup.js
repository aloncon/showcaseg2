import { observable, action } from 'mobx'
import VendorCategoryData from '../system/data/vendor-category-data.json'
import VendorData from '../system/data/vendor-data.json'
import api from './Api'
import jsonpP from 'jsonp-p';


let myLocalStorage = window.localStorage;

const ListingStore = observable({
   setSubCategoryLength : action(_length => {
    ListingStore.subCategoryLength = _length;
   }),
   setVendorCategoryList : action(item => { this.VendorCategoryList = item}),
   subCategoryLength : 0,
   VendorCategoryList : [],
   allProducts : new Map(),
   allIds :new Map(),

   getProductsData(ids){
    // need to save the same order the "ids" came from props
    // this way don't save on the order:
    // let dataObj = VendorCategoryData.filter((data) => ids.includes(data.id));
    this.VendorCategoryList = [];
    let tempData = [];
    ids.forEach((_id , i )=> {
        tempData.push({id:_id, priority:i})
        console.log("tempData",tempData[i])
    })
    let dataObj = [];
    dataObj = VendorCategoryData.filter((data) => (tempData.map(data=>{return data.id})).includes(data.id));

    this.setSubCategoryLength(dataObj.length);

    dataObj.forEach((item , i) =>{
        let wcpcs = item.wcpcs;
        let caption, products;
       
        
        
        api.getListOfVerifyWcpcs(wcpcs)
        .then(result => {
            let random = Math.floor(Math.random()*100)%10;
            // no need setTimeout, it's only for example
           
            caption = item.caption;
            products = VendorData.filter(list => result.includes(list.wcpc));
            
            let VendorDataProdutcs = { productData : products , caption : caption , priority : i};
            let indexInsert = 0;
            
            // blow functionallty is used for enter products in same priority
            if(this.VendorCategoryList.length > 0){
                this.VendorCategoryList.slice().forEach((item,i) => {
                    if(item.priority < VendorDataProdutcs.priority){
                        indexInsert++;
                        return;
                    }
                })
                this.VendorCategoryList.splice(indexInsert,0,VendorDataProdutcs)
            }
            else{
                this.VendorCategoryList.push(VendorDataProdutcs);
            }
            this.subCategoryLength--;
            if(i + 1 == dataObj.length) this.subCategoryLength = 0;
        })
        .catch(err => {
            if(err === "ErrorMsg Error: Timeout") this.subCategoryLength = 0;
            console.log(err)
        });
     })
   },
   get categoryLength(){
        return this.subCategoryLength;
   },
   //////////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////////
   getProductsDataByIds(ids,callback){
    
    ids.forEach((id , i) => { 
        if(!this.allIds.has(id)){
            
           // asyncFunc(this.allIds,id).then(res => {console.log("test");res});

            let asyncFunc = async ()=>{
               // console.log("id",id);
                let newId = { id : id , isEmpty : true ,apiHandle : false};
                this.allIds.set(id,newId);
                let wcpcsFromNewId = (VendorCategoryData.filter(item => id==item.id))[0].wcpcs.split(",");
               // console.log("ID",id,"wcpcs From NewId",wcpcsFromNewId)
                let wcpcsForApi = null;
                let promiseAwait = await Promise
                        .resolve(wcpcsFromNewId)
                        .then(wcpcsFromNewId => {
                            wcpcsFromNewId.forEach(wcpc => {
                                if(this.allProducts.has(wcpc)){
                                    if(this.allProducts.get(wcpc) != null){
                                        callback(true,"here1");
                                    }
                                        
                                }
                                else{
                                    wcpcsForApi = wcpcsForApi ? wcpcsForApi+","+wcpc : wcpc
                                }
                        })
                    })
                    return wcpcsForApi;

            
            }

            asyncFunc().then(result => {
                console.log("ID",id,"return wcpcsForApi",result);
                if(result){
                api.getListOfVerifyWcpcs(result)
                .then(verifyWcpcs => {
                    console.log("ID",id,"Verify", verifyWcpcs);
                    this.allIds.set(id,{id:id , isEmpty: true , apiHandle : true}) 
                    let filterProducts = VendorData.filter(item => verifyWcpcs.includes(item.wcpc))
                    //console.log("ID",id,"filterProducts",filterProducts);
                    if(filterProducts.length > 0){
                        this.allIds.set(id,{id:id , isEmpty: false , apiHandle : true}) 
                        callback(true,"here4");
                           
                    }
                    filterProducts.forEach(product => {
                        this.allProducts.set(product.wcpc,
                        {
                            type : product.type,
                            listDescription : product.listDescription,
                            listImage : product.listImage,
                            vendorProductName : product.vendorProductName
                        })
                    })
                
                    
                    
                })}

            });
        }
        else{
            if(!this.allIds.get(id).apiHandle){
               let interval = setInterval(()=>{
                    if(this.allIds.get(id).apiHandle){
                        this.allIds.get(id).isEmpty ? null : callback(true,"here2");
                        clearInterval(interval)
                    }
                },200)
            }
            this.allIds.get(id).isEmpty ? null : callback(true,"here3");
                

        }
         
    })    

   },
   getCatergoyData(ids){
    let promiseAwait = [];
       ids.forEach((id,i)=>{
        if(!this.allIds.has(id)){
        promiseAwait.push(
            new Promise(resolve=>{
                this.allIds.set(id,{id:id , isEmpty: true , apiHandle : false}) 
                let getAllWcpcs = VendorCategoryData.filter(item => item.id == id)[0].wcpcs;
                api.getListOfVerifyWcpcs(getAllWcpcs)
                .then(result => resolve({getAllWcpcs:result,id:id}))
                
           }))
           }
       })

       Promise.all(promiseAwait)
       .then(result => {
           
           result.forEach(res => {
               let products = VendorData.filter(item => res.getAllWcpcs.includes(item.wcpc))
               //console.log("products",products);
               if(products.length > 0){
                    products.forEach(product=>{
                        if(!this.allProducts.has(product.wcpc)){
                            this.allProducts.set(product.wcpc,
                                {
                                    type : product.type,
                                    listDescription : product.listDescription,
                                    listImage : product.listImage,
                                    vendorProductName : product.vendorProductName
                                })
                        }
                    })
                    this.allIds.set(res.id,{id:res.id , isEmpty: false , apiHandle : true}) 
               }
               else this.allIds.set(res.id,{id:res.id , isEmpty: false , apiHandle : true}) 
           })
        })
        .then(() => {
            console.log("this.allIds,this.allProducts  ",this.allIds,this.allProducts)
        })
   },
   //////////////////////////////////////////////////////
   //////////////////////////////////////////////////////
   //////////////////////////////////////////////////////
   //////////////////////////////////////////////////////
   //////////////////////////////////////////////////////
   //////////////////////////////////////////////////////
   //////////////////////////////////////////////////////
   //////////////////////////////////////////////////////
   //////////////////////////////////////////////////////
   //////////////////////////////////////////////////////
   //////////////////////////////////////////////////////
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
                    if(!idData.isEmpty){
                        callback(true)
                        return;
                    }
                        
                }
                else{
                      let interval = setInterval(()=>{
                        if(idData.apiHandle){
                            if(!idData.isEmpty){
                                callback(true)
                                return;
                            }
                            else clearInterval(interval);    
                        }
                      },200)  
                }
           } 
       })





   }
   
})

export default ListingStore;
