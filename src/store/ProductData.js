import { observable, action } from 'mobx'
import VendorCategoryData from '../system/data/demo/v2/vendor-category-data-v2.json'
import VendorData from '../system/data/demo/v2/vendor-data-v2.json'
import api from './Api'
import jsonpP from 'jsonp-p';
const ProductStore = (id, callback) =>{
    const store = observable({
        id : id,
        caption : null,
        products : []
    })
    
    
    let _vendorCategoryData = VendorCategoryData.filter(item => item.id == id)[0];
    let wcpcs = _vendorCategoryData.wcpcs;
    store.caption = _vendorCategoryData.caption

    
    wcpcs = wcpcs.split(",")
    let wcpcLength = wcpcs.length
    let subWcpcs;

    while(wcpcLength > 0){

        if(wcpcLength > 50){
            subWcpcs = wcpcs.slice(0,50)
            wcpcs = wcpcs.slice(50)
        }
        else subWcpcs = wcpcs;

        wcpcLength-=50;

        api.getListOfVerifyWcpcs(subWcpcs)
        .then(wcpcs => store.products = store.products.concat(wcpcs))
        .catch(err => console.log("No Data Fatch",err))
        
    }
    return store;

}

class allIdsStore{
    constructor(){
        this.allIds = new Map()
    }
    setId(id){
        if(!this.allIds.has(id)){
            this.allIds.set(id,new ProductStore(id))
        }
    }

    getId(id){
        if(!this.allIds.has(id)){
            this.setId(id)
        }
        //else console.log("ID Exist")
        let idData = this.allIds.get(id);
        return this.allIds.get(id)
    }
}

let _allIdsStore = new allIdsStore();

const ListingStore = (id , type) =>{
    const store = observable({
            isDisplay : true,
            type : type,
            productsLength : 0 ,
            idListing : _allIdsStore.getId(id.toString()),
            get data(){
                return  store.idListing.products ? 
                                        { 
                                            products : VendorData.products.filter(item=> store.idListing.products.includes(item.wcpc)) , 
                                            caption : store.idListing.caption,
                                            isDisplay : store.isDisplay,
                                            type : store.type,
                                            productsLength : store.idListing.products.length
                                        } : null
                                            
            },
            changeDisplay(){
                store.isDisplay = !store.isDisplay;
                
            },
            setType(_type){
                store.type = _type;
            },
            get shouldDisplay(){
                if(store.idListing.productsLength)
                    return true
            }

    })
    return store
}


export default ListingStore
