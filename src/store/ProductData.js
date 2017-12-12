import { observable, action } from 'mobx'
import VendorCategoryData from '../system/data/demo/v2/vendor-category-data-v2.json'
import VendorData from '../system/data/demo/v2/vendor-data-v2.json'
import api from './Api'
import jsonpP from 'jsonp-p';

const ProductStore = (id) =>{
    const store = observable({
        id : id,
        caption : null,
        products : [],
    })
    
    
    let _vendorCategoryData = VendorCategoryData.filter(item => item.id == id)[0];
    let wcpcs = _vendorCategoryData.wcpcs;

    /***********************************************************************/
    /* need to apply logic of limited products to send to api (iterative) */
    /***********************************************************************/
    
    api.getListOfVerifyWcpcs(wcpcs)
    .then(wcpcs =>{ store.products = wcpcs ;  store.caption = _vendorCategoryData.caption})
    .catch(err => console.log("No Data Fatch",err))
    
     

    return store;

}

class allIdsStore{
    constructor(){
        this.allIds = new Map()
        console.log("VendorData",VendorData)
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
        else console.log("ID Exist")
        let idData = this.allIds.get(id);
        return this.allIds.get(id)
    }
}

let _allIdsStore = new allIdsStore();

const ListingStore = (id , type) =>{
    const store = observable({
            isDisplay : true,
            type : type,
            idListing : _allIdsStore.getId(id.toString()),
            get data(){
                return  store.idListing.products ? VendorData.products.filter(item=> store.idListing.products.includes(item.wcpc)) : null
            },
            changeDisplay(){
                console.log("Display",store.isDisplay)
                store.isDisplay = !store.isDisplay;
                
            },
            setType(_type){
                store.type = _type;
            }

    })
    return store
}


export default ListingStore;
