import { withRouter } from 'react-router';
import { runInAction, extendObservable, action } from "mobx";
import { observer } from 'mobx-react';
import jsonpP from 'jsonp-p';

let wcjson;

const isloadingC = () => {
 return setTimeout(()=>{
    //this.loading = false;

    console.log("isloading const", this.loading);
    this.loading = false;
  } ,3000)
    

}

export default extendObservable(this, {
     products: [],
     loading: false,
     loadProducts: action(async (id,link) =>{
         this.loading=true;
         console.log('linkToApi Link: ',id);
         console.log('linkToApi Link: ',typeof link);
         let linkToApi = typeof link!="undefined"? link : "http://api.walmartlabs.com/v1/search?query=bosch&format=json&categoryId=1072864_1067619_1231248_1067739&apiKey=rgzr9bdktsbm3d6qy8ppdevb&numItems=25&start=25" 
         console.log('linkToApi',linkToApi);
         let url = linkToApi;
         console.log('aaa',this.products);
         let pro = this.products;
        /*
         jsonpP(url).promise
          .then((response) =>{
              console.log("response",response);
          })
          .catch((erorr)=>{console.log('errrororor')})
          */
         //console.log("loadproducts action", this.loading);
         
         
         /*
         await jsonpP(url).promise
          .then(function(response){
            console.log("somthing ", typeof pro);
            console.log("somthing ",response.items);
            wcjson = response.items;
            runInAction(() => {
                console.log("runInAction 22",typeof this);
                //console.log("runInAction ",wcjson.json());
                //this.products = wcjson.json();
                //this.loading = false;
              });

            //return something.items;
            //products = something.items;
            //this.loading = false;
         });
         */

         const jsonResp = await jsonpP(url).promise.then( (response) => {console.log ('jsonpp return'); return response });         
         //const json = await response.json();
         runInAction ( ()=>{
            console.log ('runInActioncccID',id); 
            console.log ('runInActionccc',jsonResp.items);
             this.products[id] = [];
             this.products[id] = jsonResp.items;
             console.log ('runInActionccc Arry[id]',this.products[id]);
             //this.loading = false;
             this.loading = isloadingC();
         })
     })
      
    
 }
)


/*
async fetchJson(url){
         this.isLoading = false;
         const response = await jsonpP(url);
         const status = await response.status;

         return "xx".json();
     }

     getProductsUrl(wcpcs) {
        wcpcs = wcpcs.replace(/\|/g,'&wcpc=')
        wcpcs = wcpcs.replace(/^/g,'wcpc=')
        let url = 'https://json-preview.webcollage.net/apps/json/' + 'cdw' + '/method/partner-products-data-by-wcpc?' + wcpcs + '&d=' + '168262d34ae47d7642f15af14eb6c95d' + '&moduleId=' + 'xerox';
        return url;
    }
    
     getJson(url){
        return jsonpP(url).promise;
    }
*/
