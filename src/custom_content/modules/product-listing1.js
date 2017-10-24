import React from 'react';


//  function fetchProducts() {
//   //const request = axios.get('http://jsonplaceholder.typicode.com/photos?albumId=41');
//   //const request = axios.get('http://json-preview.webcollage.net/apps/json/cdw/method/partner-products-data-by-wcpc?wcpc=1430315725083&wcpc=1430312432542&wcpc=1430312367318&wcpc=1430311989860&wcpc=1430312567373&wcpc=1430312143801&wcpc=1430312306400&wcpc=1430312637682&d=168262d34ae47d7642f15af14eb6c95d&moduleId=xerox&callback=jQuery1111024476525482347955_1501158065391');

// let url = 'http://jsonplaceholder.typicode.com/photos?albumId=41';

//     get(`${url}&callback={{jsonCallback}}`, (err, ...data) => {
//         if (err) return console.error("ssss erroror "+err);
//         //console.log("SSSSSSSSSS data : "+data);
//     });

// }

 

class ProductListing1 extends React.Component {
 

 render() {

     // console.log("ProductListing1");
   return (
        <div className="ProductListing">
           <div className="wc-listing">
              <ul className="list-group">

              </ul>
               <div>Product 11xx111</div>
               <div>Product 2</div>
               <div>Product 3</div>
               <div>Product 4</div>
               <div>Product 5</div>
               <div>Product 6</div>

			     </div>
        </div>
   );
 }
}

export default ProductListing1