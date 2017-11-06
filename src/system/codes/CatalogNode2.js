import React from 'react';
import ReactDOM from 'react-dom';

import CatalogChildren from './CatalogChildren';
import ProductData from '../data/product-listing/products.json';


function getAllowProducts(itemWcpc){
    let tempList = [];
    return new Promise((resolve,rejected) => {
        itemWcpc.forEach((wcpc) => {
            ProductData.forEach((item) => {
                if(item.wcpc == wcpc){
                    tempList.push(wcpc);
                }
            })
        })
        if(tempList.length != 0) resolve(tempList);
        else rejected("Error Empty List");
    })
}

function getAllowProductsData(wcpcList){
    let tempList = [];
    return new Promise((resolve,rejected) => {
        wcpcList.forEach((wcpc) => {
            ProductData.forEach((item) => {
                if(item.wcpc == wcpc){
                    tempList.push(item);
                }
            })
        })
        if(tempList.length != 0) resolve(tempList);
        else rejected("Error Fetching Data");
    })
}

class CatalogNode extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            getProducts : false,
            products    : []
        }

        this.assginedProducts(this.props.wcpc);
    }


   assginedProducts(wcpc){
       let tempWcpcList = [];
    getAllowProducts(wcpc)
    .then(result =>{
        tempWcpcList = result;
    })
    .then(() => {
        getAllowProductsData(tempWcpcList)
        .then(result => {
            this.setState( { products : result } );
        })
        .then(() => {
            this.setState( { getProducts : true } );
        })
    })
   }

   render(){
        const { products , getProducts } = this.state;
        const { caption } = this.props;
        return(
            <div>
               {
                   getProducts &&
                    <table>
                        <tbody>
                            {products.map((product,i) => {
                                return(
                                    <CatalogChildren key={i} data={product.data}/>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>
        )
   }

}

export default CatalogNode;


