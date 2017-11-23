import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as FetcherActions from './wc_api_fetcher';
//import React from "react";
import { observer } from "mobx-react";

//import ProductData from './stores/productdata/productdata';

//observable(['productdata']);
export default observer(
    class ProductListing extends Component {
    
    pList = new ProductList(this.props.id);
    
    constructor(props) {
        super(props)
        
        
        //var products = [];
        this.state = {
            
        }
        console.log("constructor props",this.props.id)
        //console.log("constructor plist " , pList)
    }
    
    componentWillMount(){
    //let url = ProductData.getProductsUrl("dd");
    console.log("product listing componentWillMount",this.props.store)
        //   ProductData.fetchJson("http://api.walmartlabs.com/v1/search?query=bosch&format=json&categoryId=1072864_1067619_1231248_1067739&apiKey=rgzr9bdktsbm3d6qy8ppdevb&numItems=25")
    //    .then(response => {console.log("componentWillMount",response)});
    let categoryIDs = this.props.ids;
    let linkToAPI = this.props.wclink;
    console.log("linktoapi1",linkToAPI)
    
    //this.pList.isLoadingT = true;
    this.pList.setProducts(['a','s'])
    console.log("linktoapi1 listobj",this.pList.id)
    this.props.store.loadProducts(this.props.id,linkToAPI,this.pList);

    }
    
   
     product = (item)=>
     <div style={{paddingBottom:20}} id={item.itemId}>
     {console.log("XXX render product: ",item.itemId)}
       <div style={{width:200,float:'left'}}><img src={item.thumbnailImage}/></div>
       <div class="productTitle" style={{width:'90%' }}>
        <b>{item.name}</b><br/>
        <div class="productdesc">{item.longDescription}</div>
       </div>
       <div style={{clear:'both',borderBottom:'1px solid #444'}} >&nbsp;</div>  
     </div>;

    render() {
        
        return (
        <div className="wcListing">
           <u> </u>
           {console.log("dddddd ",this.props.store.products.length)}
           {this.props.store.loading && <b>Is Loading ............</b>  }
           { <b>{this.pList.id}</b>  }
           {this.pList.getProducts() && this.pList.getProducts().map((item) => this.product(item))}
           {/* (!this.loading && this.props.store.products[this.props.id]) && this.props.store.products[this.props.id].map((item) => this.product(item))*/}
        </div>
        );
    }
    }


)

class ProductList {
    isLoadingT = null;
    productT = [];
    id=null;

    constructor(id){
     this.id=id;
     this.isLoadingT = true;
     this.productT = [];
    }
    isLoadingTT(){ return this.isLoadingT;}
    setProducts (list,id) {
        console.log("isLoadingTT",list[0])
        console.log("isLoadingTT ID",id)
        this.productT = list;
    }
    getProducts () {
        return this.productT;
    } 

}
 
