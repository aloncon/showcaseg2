import { observable } from 'mobx';
import VendorCategoryData from '../system/data/vendor-data/vendor-category-data.json';
import VendorData from '../system/data/vendor-data/vendor-data.json';
import api from './Api';

const ProductDataStore = (wcpc, cpi) => {
   const store = observable({
      cpi: cpi ? cpi : null,
      wcpc: wcpc,
   });
   if (!cpi) {
      api.getListOfVerifyWcpcs([wcpc]).then(result => {
         store.cpi = result[0].cpi;
      });
   }

   return store;
};

class Allwcpc {
   constructor() {
      this.allproducts = new Map();
   }
   setId(wcpc, cpi) {
      if (!this.allproducts.has(wcpc)) {
         this.allproducts.set(wcpc, new ProductDataStore(wcpc, cpi));
      }
   }

   getId(wcpc) {
      if (!this.allproducts.has(wcpc)) {
         this.setId(wcpc);
      }

      return this.allproducts.get(wcpc);
   }
}

let allWcpc = new Allwcpc();

export const cpStore = wcpc => {
   const productStore = allWcpc.getId(wcpc.toString());
   const store = observable({
      wcpcListing: productStore,
      get data() {
         return store.wcpcListing.cpi
            ? {
                 cpi: store.wcpcListing.cpi,
                 wcpc : wcpc
              }
            : null;
      },
   });

   return store;
};

const ProductStore = id => {
   const store = observable({
      id: id,
      caption: null,
      products: [],
   });

   let _vendorCategoryData, wcpcs;
   _vendorCategoryData = VendorCategoryData.filter(item => item.id === id)[0];
   wcpcs = _vendorCategoryData.wcpcs;
   store.caption = _vendorCategoryData.caption;

   wcpcs = wcpcs.split(',');

   let wcpcLength = wcpcs.length;
   let subWcpcs;
   while (wcpcLength > 0) {
      if (wcpcLength > 50) {
         subWcpcs = wcpcs.slice(0, 50);
         wcpcs = wcpcs.slice(50);
      } else subWcpcs = wcpcs;

      wcpcLength -= 50;

      api
         .getListOfVerifyWcpcs(subWcpcs)
         .then(result => {
             result.map(item => {
                 allWcpc.setId(item.wcpc, item.cpi);
                });
                return result;
            })
            .then(result => {
                store.products = store.products.concat(result);
         })
         .catch(err => console.error('WC-ERROR: Should No Data Fatch', err));
   }
   return store;
};

// maintain for creating only one productStore for id
class AllIdsStore {
   constructor() {
      this.allIds = new Map();
   }
   setId(id) {
      if (!this.allIds.has(id)) {
         this.allIds.set(id, new ProductStore(id));
      }
   }

   getId(id) {
      if (!this.allIds.has(id)) {
         this.setId(id);
      }
      return this.allIds.get(id);
   }
}

let allIdsStore = new AllIdsStore();

let sum = (arr) => {
    let sum = 0;
    for(let index = 0 ; index < arr.length ; index++) {
        sum+=arr[index];
    }
    return sum;
}

const ListingStore = (id, type) => {
   const productStore = allIdsStore.getId(id.toString());

   const store = observable({
      isDisplay: true,
      type: type,
      productsLength: 0,
      idListing: productStore,
      pagenationIndex : 0 ,
      numberOfProducts : 3,
      perviousLengthListOfProducts : 0,
      get dispalyAmountOfProductsFromTotal(){
        let totalNumberOfProducts = store.nextData().totalNumberOfProducts;
        let temp =  store.numberOfProducts*(store.pagenationIndex+1);
        let strDisplay = totalNumberOfProducts - temp > 0 ? 
                `Showing ${1}-${temp} of ${totalNumberOfProducts}` : 
                `Showing 1-${totalNumberOfProducts} of ${totalNumberOfProducts}`
        return strDisplay;        
      },

      get amountOfProductsForShowMore(){ 
        let showMore = store.nextData().totalNumberOfProducts - store.numberOfProducts*(store.pagenationIndex+2)
        return showMore > 0 ? store.numberOfProducts : store.numberOfProducts + showMore
      },
    //   dropMenuStatus : false,
    //   changeDropMenuStatus(){
    //     store.dropMenuStatus = !store.dropMenuStatus;
    //   },
      //computed method for display / hidde the drop menu options (currntly 9/12/24)
    //   get dropMenu(){
    //     return store.dropMenuStatus
    //   },
      get NumberOfPages(){
        return store.idListing.products
            ? sum(store.idListing.products.map( i => i.cpi.map( x => x).length)) / store.numberOfProducts
            : null;
      },
      setNumberProductInPage(number){
        store.numberOfProducts = number;
        store.dropMenuStatus = false;
        store.pagenationIndex = 0;
      },
      setMaxPagination(){
        let totalNumberOfProducts = store.nextData().totalNumberOfProducts;
        let index = Math.ceil(totalNumberOfProducts/store.numberOfProducts);
        store.setPaginationIndex(index);
      },
      setPaginationIndex(index){
        store.pagenationIndex = index;
      },
      // set the next index of the list
      nextPagenationIndex(){ 
            let numberOfProducts = sum(store.idListing.products.map( i => i.cpi.length));
            console.log("numberOfProducts",numberOfProducts)
            parseInt(numberOfProducts / (store.numberOfProducts*(store.pagenationIndex+1))) > 0  && numberOfProducts != (store.numberOfProducts*(store.pagenationIndex+1))? store.pagenationIndex++ : store.pagenationIndex;
      },
      // set the previous index of the list
      previousPagenationIndex(){
        let numberOfProducts = sum(store.idListing.products.map( i => i.cpi.map( x => x).length));
        parseInt(numberOfProducts/ (store.numberOfProducts*(store.pagenationIndex))) > 0 ? store.pagenationIndex-- : store.pagenationIndex;
      },
      nextData(pagenationIndex){
        let items = store.idListing.products; 
        let wcpcs = items.map(item => item.wcpc);
        let perviousLengthListOfProducts = 0;
        let totalNumberOfProducts = 0;
        let obj = {
            products: VendorData.products.filter(item => wcpcs.includes(item.wcpc)).map((item , indexWcpc) => {
                let tempItem = items.find(itemTemp => itemTemp.wcpc === item.wcpc)
                if(tempItem.cpi[0].cpi === "0") {
                    tempItem.cpi[0].channelProductName = item.vendorProductName;
                    tempItem.cpi[0].cpi = `0-${item.wcpc}`;
                   }
               // filterItems recives only the products are in the range of the current index of the pagiantion
               // for example in case the display set on 9 products and the pagination index set to 1 -> products will be show are between 9 to 17 (index)    
               // [0:{},1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{},11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{}] ({} = product)
               //                                               |<------------------will be display--------------->|
            //    let filterItems = tempItem.cpi.filter( (item,index) =>  index + indexWcpc + perviousLengthListOfProducts >= (store.pagenationIndex)*store.numberOfProducts &&  (index+indexWcpc + perviousLengthListOfProducts) < (store.pagenationIndex+1)*store.numberOfProducts);
               let filterItems = tempItem.cpi.filter( (item,index) =>  index + indexWcpc + perviousLengthListOfProducts < (store.pagenationIndex+1)*store.numberOfProducts);
               perviousLengthListOfProducts +=  tempItem.cpi.length-1;
               totalNumberOfProducts +=  tempItem.cpi.length;
               console.log("perviousLengthListOfProducts",tempItem)
               return Object.assign({cpi :  filterItems}, item);
            }),
            caption: store.idListing.caption,
            isDisplay: store.isDisplay,
            type: store.type,
            productsLength: store.idListing.products.length,
            totalNumberOfProducts : totalNumberOfProducts
         }  
       return obj;  
      },
      get data() {
         return store.idListing.products
            ? store.nextData(store.pagenationIndex)
            : null;
      },
      changeDisplay() {
         store.isDisplay = !store.isDisplay;
      },
      setType(_type) {
         store.type = _type;
      },
      get shouldDisplay() {
         if (store.idListing.productsLength) return true;
      },
   });
   return store;
};

// WcpcAssortment.js uses this store --> WcpcAssortment component should determine if his children aka the content it wrap need to display
export const ShouldDisplayStore = listingStores => {
   return observable({
      listingStores,
      get shouldDisplay() {
         return listingStores.some(store => store.productStore && store.productStore.products.length > 0);
      },
   });
};

// CahngeView.js uses this store -->  ChangeViewHeader Component (determine which caption to show in the header section of productlisting)
export const ShouldHeaderDisplay = listingStores => {
   return observable({
      listingStores,
      get shouldDisplay() {
         let temp = listingStores.filter(i => i.productStore.products.length > 0);
         return temp.length > 1 ? temp.map(i => i.productStore) : null;
      },
   });
};

export default ListingStore;
