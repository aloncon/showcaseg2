import axios from 'axios'
import jsonpP from 'jsonp-p';
import replace from 'react-string-replace';
import WcShowcase from "../src/system/codes/moduleInfo";

//import fjsonp from 'fetch-jsonp';
//import fjp from 'fetch-jsonp';
//import store from '../store';

import {
  FETCH_PRODUCTS
} from './types';

var xxx;

 function jsonCallback(json){
  console.log("sssssssssssssssssssssssssssss jsonCallback"+json);
}

export function getProductsUrl(wcpcs) {
    wcpcs = wcpcs.replace(/\|/g,'&wcpc=')
    wcpcs = wcpcs.replace(/^/g,'wcpc=')
    let url = 'https://json-preview.webcollage.net/apps/json/' + WcShowcase.siteName + '/method/partner-products-data-by-wcpc?' + wcpcs + '&d=' + WcShowcase.id + '&moduleId=' + WcShowcase.moduleName;
    return url;
}

export function fetchProducts(wcpcs) {
  //const request = axios.get('http://jsonplaceholder.typicode.com/photos?albumId=41');
  //const request = axios.get('http://json-preview.webcollage.net/apps/json/cdw/method/partner-products-data-by-wcpc?wcpc=1430315725083&wcpc=1430312432542&wcpc=1430312367318&wcpc=1430311989860&wcpc=1430312567373&wcpc=1430312143801&wcpc=1430312306400&wcpc=1430312637682&d=168262d34ae47d7642f15af14eb6c95d&moduleId=xerox&callback=jQuery1111024476525482347955_1501158065391');



let url2 = 'http://jsonplaceholder.typicode.com/photos?albumId=41';
//let url = 'http://json-preview.webcollage.net/apps/json/cdw/method/partner-products-data-by-wcpc?wcpc=1430315725083&wcpc=1430312432542&wcpc=1430312367318&wcpc=1430311989860&wcpc=1430312567373&wcpc=1430312143801&wcpc=1430312306400&wcpc=1430312637682&d=168262d34ae47d7642f15af14eb6c95d&moduleId=xerox&callback=jsonCallback'
//let url = "http://json-preview.webcollage.net/apps/json/cdw/method/partner-products-data-by-wcpc?wcpc=1430315725083&wcpc=1430312432542&wcpc=1430312367318&wcpc=1430311989860&wcpc=1430312567373&wcpc=1430312143801&wcpc=1430312306400&wcpc=1430312637682&d=168262d34ae47d7642f15af14eb6c95d&moduleId=xerox";

let url = getProductsUrl(wcpcs);

let request = jsonpP(url);
let request2 = jsonpP(url).promise
                .then((Pdata)=>{
                    console.log("xxxxxxxxxyy then data ");
                    console.log(Pdata);    
                    var data=[];
                    var p = Object.keys(Pdata.cdw);

                    p.forEach((key)=>{
                        console.log("kkkkkkkey : " + key);
                        console.log(Pdata.cdw[key]);

                        data.push(Pdata.cdw[key]);
                    });
                    console.log("new data xxxxxxxxxxxxxxyyyyy" + data);
                    console.log(data);
                    return data;
                    })

/*
 let request = jsonpP(url,  {    name: 'jsonCallback'  }, function (err, data) {
  if (err) {
    console.error(err.message);
  } else {
    console.log("SSSSSS JSONP ELSE")  
    console.log(data);
  }
});
*/

const request1 = axios.get('http://jsonplaceholder.typicode.com/photos?albumId=41', null, function (err, data) {
  if (err) {
    console.error("ssss erroror "+err.message);
  } else {
    console.log("sssss AXOSSSSSSSSSSSSSSSSSSSSS  than : ");  
    console.log("sssss AXOSSSSSSSSSSSSSSSSSSSSS  than : " +  data);
  }
});



//const request = xxx;

  console.log('ssssssssssssssssss Actions / fetchProducts : ' );
  console.log(request)
  console.log(request1)
  console.log('ssssssssssssssssss Actions / fetchProducts : ' );
  //request = request1;
  return {
    type: FETCH_PRODUCTS,
    payload: request.promise
    //payload: request1
    
    
  }
}