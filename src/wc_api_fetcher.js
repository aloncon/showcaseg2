import jsonpP from 'jsonp-p';

function jsonCallback(json){
  console.log("sssssssssssssssssssssssssssss jsonCallback"+json);
}

export function getProductsUrl(wcpcs) {
    wcpcs = wcpcs.replace(/\|/g,'&wcpc=')
    wcpcs = wcpcs.replace(/^/g,'wcpc=')
    let url = 'https://json-preview.webcollage.net/apps/json/' + 'cdw' + '/method/partner-products-data-by-wcpc?' + wcpcs + '&d=' + '168262d34ae47d7642f15af14eb6c95d' + '&moduleId=' + 'xerox';
    return url;
}

export function getJson(url){
    return jsonpP(url).promise;
} 

export function fetchProducts(wcpcs) {

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
  return {
    type: 'products',
    payload: request.promise
    //payload: request1
    
    
  }
}
