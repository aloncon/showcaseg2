
import jsonpP from 'jsonp-p'
import ShouldDisplay from '../system/codes/ShouldDisplay'
const partner = require('../system/codes/moduleInfo')

class Api {
    constructor() {
        this.site = null
        this.module = null
        this.shouldDisplay = null
    }

    // main function of the class 
    // first check if needed to go to service api for JSON result (or allassortment is allow)
    // after in case there is more then 25 wcpcs it will split them for several request (by using function 'splitRequsts')
    // and only after will get all the
    // responds he need he will send back one promise with the result
    getListOfVerifyWcpcs = (wcpcs) => {

        return new Promise((resolve, reject) => {
            this.site =  partner.default.siteName
            this.module = partner.default.moduleName
            this.shouldDisplay = ShouldDisplay({"wc_section":"wc_all_module_products"})
            let apiKey = `moduleId=${this.module}&product-details=true`
            let url = `https://sjson.webcollage.net/apps/json/${this.site}/method/partner-products-data-by-wcpc?`
            
            
            const { displayWithoutAssortment } = this.partner === 'allassortment' ? true : false
            
            if (!displayWithoutAssortment && !this.shouldDisplay) {

                let config = {
                    param: 'callback',
                    timeout: 15000,
                    prefix: '__jp'
                }
                let fixWcpcs = "";
                wcpcs.map(wcpc => fixWcpcs += "wcpc=" + wcpc + "&")
                let request = url + fixWcpcs + apiKey;
                //console.log(request)
                jsonpP(request, config).promise
                    .then(result => {
                        let partnerKey = Object.keys(result)
                        let resultPartner = result[partnerKey]
                        let keys = Object.keys(resultPartner)
                        if (Boolean(keys.length)) {
                            let temp = keys.map(key => { return { wcpc: key, cpi: Object.keys((resultPartner[key]).cpis)[0] } })
                            resolve(temp);
                        }
                        else reject({ err: `message: ${JSON.stringify(result.errors)} , wcpcs: ${wcpcs}` });

                    })
                    .catch((err) => {
                        reject(`ErrorMsg ${err}`);
                    })


            }
            else {
                let allWcpcs = wcpcs.map(item => { return { wcpc: item, cpi: 0 } })
                resolve(allWcpcs);
            }
        })
    }
}

const api = new Api();
export default api