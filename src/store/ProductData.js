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
         //console.log("testing...", cpi)
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
                 return null;
                });
                return result;
            })
            .then(result => {
                store.products = store.products.concat(result);
         })
         .catch(err => console.log('should No Data Fatch', err));
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
      //else console.log("ID Exist")
      //let idData = this.allIds.get(id);
      return this.allIds.get(id);
   }
}

let allIdsStore = new AllIdsStore();

const ListingStore = (id, type) => {
   const productStore = allIdsStore.getId(id.toString());

   const store = observable({
      isDisplay: true,
      type: type,
      productsLength: 0,
      idListing: productStore,
      productStore,
      get data() {
         let items = store.idListing.products; //.map(item => { return item  });
         let wcpcs = items.map(item => item.wcpc);
         return store.idListing.products
            ? {
                 products: VendorData.products.filter(item => wcpcs.includes(item.wcpc)).map(item => {
                    return Object.assign({ cpi: items.find(itemTemp => itemTemp.wcpc === item.wcpc).cpi }, item);
                 }),
                 caption: store.idListing.caption,
                 isDisplay: store.isDisplay,
                 type: store.type,
                 productsLength: store.idListing.products.length,
              }
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
         // console.log("should computing... ", listingStores.reduce((x,y) => y.productStore ? x + y.productStore.products.length : x, 0));
         return listingStores.some(store => store.productStore && store.productStore.products.length > 0);
      },
   });
};

// export const PaginationStore = (listingStores) => {
//     return observable({
//         pagination : null,
//         listingStores,
//         get shouldDisplay() {
//             let products = store.productStore.map( store.productStore.products)
//             if(products.length > 25){
//                 let tempProducts = products
//             }
//             return listingStores.some(store => store.productStore && store.productStore.products.length > 0)
//         }
//     })
// };

// CahngeView.js uses this store -->  ChangeViewHeader Component (determine which caption to show in the header section of productlisting)
export const ShouldHeaderDisplay = listingStores => {
   return observable({
      listingStores,
      get shouldDisplay() {
         let temp = listingStores.filter(i => i.productStore.products.length > 0);
         // console.log("should computing 2... " , temp.length > 1 ? temp.map(i => i.productStore) : null)
         return temp.length > 1 ? temp.map(i => i.productStore) : null;
      },
   });
};

export default ListingStore;
