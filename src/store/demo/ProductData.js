import { observable, action } from 'mobx'
import VendorCategoryData from '../../system/data/demo/vendor-category-data.json'
import VendorData from '../../system/data/demo/vendor-data.json'
import api from './Api'
import jsonpP from 'jsonp-p';


const ProductStore = (id) =>{
    const store = observable({
        id : id,
        products : [],
        isValid(){
            if(store.products.length > 0)
                return true;
        }
    })
    
    
    let _vendorCategoryData = VendorCategoryData.filter(item => item.id == id)[0];
    let wcpcs = _vendorCategoryData.wcpcs;

    /***********************************************************************/
    /* need to apply logic of limited products to send to api (iterative) */
    /***********************************************************************/
    
    api.getListOfVerifyWcpcs(wcpcs)
    .then(wcpcs => store.products = wcpcs)
    .catch(err => console.log("No Data Fatch",err))
    
     

    return store;

}

const allIdsStore = observable({
    allIds : new Map(),
    setId(id){
        if(!this.allIds.has(id)){
            this.allIds.set(id,new ProductStore(id))
        }
    },
    getId(id){
        if(!this.allIds.has(id)){
            this.setId(id)
        }
        //else console.log("ID Exist")
        let idData = this.allIds.get(id);
        return this.allIds.get(id)
    }
})

//let _allIdsStore = new allIdsStore;

const ListingStore = (...id) =>{
    const store = observable({
            isProcessing : false,
            idListing : allIdsStore.getId(id.toString()),
            get data(){
                return  store.idListing.products ? VendorData.filter(item=> store.idListing.products.includes(item.wcpc)) : null
            }

    })
    return store
}



export default ListingStore;
