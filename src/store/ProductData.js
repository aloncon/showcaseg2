import { observable, action } from 'mobx'
import VendorCategoryData from '../system/data/vendor-data/vendor-category-data.json'
import VendorData from '../system/data/vendor-data/vendor-data.json'
import api from './Api'
import jsonpP from 'jsonp-p';

console.log("VendorData",VendorData)

const ProductDataStore = (wcpc , cp) => {
    const store = observable({
        cp : cp ? cp : null,
        wcpc : wcpc
    })
    if(!cp){
        api.getListOfVerifyWcpcs([wcpc])
        .then(result => {
            store.cp = result[0].cp ;
        })
    }

    return store
    
    
}

class Allwcpc{
    constructor(){
        this.allproducts = new Map()
    }
    setId(wcpc , cp){
        if(!this.allproducts.has(wcpc)){
            this.allproducts.set(wcpc,new ProductDataStore(wcpc , cp))
        }
    }

    getId(wcpc){
        if(!this.allproducts.has(wcpc)){
            this.setId(wcpc)
        }
        
        return this.allproducts.get(wcpc)
    }
}

let allWcpc = new Allwcpc()


export const cpStore = (wcpc) => {
    const productStore = allWcpc.getId(wcpc.toString());
    const store = observable({
        wcpcListing : productStore,
        get data(){
            let cp = store.wcpcListing.cp;
            return  store.wcpcListing.cp ? 
                            { 
                                cp : store.wcpcListing.cp
                            }
                            : null
        }
    })
    
    return store
}

const ProductStore = (id) =>{
    const store = observable({
        id : id,
        caption : null,
        products : []
    })
    
    let _vendorCategoryData,wcpcs;
    _vendorCategoryData = VendorCategoryData.filter(item => item.id == id)[0];
    wcpcs = _vendorCategoryData.wcpcs;
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
        .then(result => {
            store.products = store.products.concat(result);
            result.map(item => {allWcpc.setId(item.wcpc,item.cp)})
        })
        .catch(err => console.log("should No Data Fatch",err))
        
    }
    return store;

}



class AllIdsStore{
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


let allIdsStore = new AllIdsStore();



const ListingStore = (id , type) =>{
    const productStore = allIdsStore.getId(id.toString());
    const store = observable({
            isDisplay : true,
            type : type,
            productsLength : 0 ,
            idListing : productStore,
            productStore,
            get data(){
                let wcpcs = store.idListing.products.map(item => { return item.wcpc });
                return  store.idListing.products ? 
                                        { 
                                            products : VendorData.products.filter(item=> wcpcs.includes(item.wcpc)) , 
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

export const ShouldDisplayStore = (listingStores) => {
    return observable({
        listingStores,
        get shouldDisplay() {
            console.log("should computing... ", listingStores.reduce((x,y) => y.productStore ? x + y.productStore.products.length : x, 0));
            return listingStores.some(store => store.productStore && store.productStore.products.length > 0)
        }
    })
};

export default ListingStore
