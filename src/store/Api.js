import jsonpP from 'jsonp-p';
import ShouldDisplay from '../system/codes/ShouldDisplay';
const moduleInfo = require('../system/codes/moduleInfo');

class Api {
   constructor() {
      this.partner = null;
      this.module = null;
      this.shouldDisplay = null;
   }

   // main function of the class
   // first check if needed to go to service api for JSON result (or allassortment is allow)
   // after in case there is more then 25 wcpcs it will split them for several request (by using function 'splitRequsts')
   // and only after will get all the
   // responds he need he will send back one promise with the result
   getListOfVerifyWcpcs = wcpcs => {
      const createCpisObject = partnerProductObject => {
         const array = [];
         const keys = Object.keys(partnerProductObject.cpis);
         for (let i = 0; i < keys.length; i++) {
            array.push({
               cpi: keys[i],
               channelProductName: partnerProductObject.cpis[keys[i]].channelProductName,
            });
         }

         return array;
      };

      return new Promise((resolve, reject) => {
         this.partner = moduleInfo.default.siteName;
         this.module = moduleInfo.default.moduleName;
         this.shouldDisplay = ShouldDisplay({ wc_section: 'display-all-vendor-products' });
         let apiKey = `moduleId=${this.module}&product-details=true`;
         let url = `https://sjson.webcollage.net/apps/json/${this.partner}/method/partner-products-data-by-wcpc?`;

         const displayAllAssortment = this.partner === 'allassortment' ? true : false;

         if (!(displayAllAssortment || this.shouldDisplay)) {
            let config = {
               param: 'callback',
               timeout: 15000,
               prefix: '__jp',
            };
            let fixWcpcs = '';
            wcpcs.map(wcpc => (fixWcpcs += 'wcpc=' + wcpc + '&'));
            let request = url + fixWcpcs + apiKey;

            jsonpP(request, config)
               .promise.then(result => {
                  let partnerKey = Object.keys(result);
                  let resultPartner = result[partnerKey];
                  let keys = Object.keys(resultPartner);
                  if (Boolean(keys.length)) {
                     const products = keys.map(key => {
                        return {
                           wcpc: key,
                           cpi: Object.keys(resultPartner[key].cpis).length > 1 ? createCpisObject(resultPartner[key]) : Object.keys(resultPartner[key].cpis)[0],
                        };
                     });

                     resolve(products);
                  } else reject({ err: `message: ${JSON.stringify(result.errors)} , wcpcs: ${wcpcs}` });
               })
               .catch(err => {
                  reject(`ErrorMsg ${err}`);
               });
         } else {
            let allWcpcs = wcpcs.map(item => {
               return { wcpc: item, cpi: 0 };
            });
            resolve(allWcpcs);
         }
      });
   };
}

const api = new Api();
export default api;
