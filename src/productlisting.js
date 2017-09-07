import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router';
import * as actions from './actions'

import jsonpP from 'jsonp-p';
//import fjp from 'fetch-jsonp';

class ProductList extends Component {

  componentWillMount(){
      console.log("propsssssss willmount " + this.props.list);  
      console.log("propsssssss willmount " + this._jsxFileName  );  
      this.props.fetchProducts(this.props.list); 
  }  

  renderProducts() {
    console.log("sssssssssss - renderProducts: " + this.props.products);  
    console.log(this.props.products);  

    //let xxx = JSON.stringify(this.props.products);
    


    var list = [];
    var p = Object.keys( this.props.products);
    p.forEach((key)=>{
        let innerI = Object.keys(this.props.products[key])

        innerI.forEach((innerKey) => {
        this.props.products[key][innerKey]["wcpc"] = key;
        this.props.products[key][innerKey]["cpi"]  = innerKey; 
        list.push(this.props.products[key][innerKey]);
        })                                                                                                                                  
                
    })
    console.log("kkkkkkkey --: " + list);
    var list = list.map( (item) => {
        console.log("kkkkkkkey --: " +item)
        return <li>product :  <b>{item.wcpc}</b>
                <ul>                    
                    <li>Name:   {item.channelProductName} </li>
                    <li>Channel Product ID:  {item.cpi} </li>                    
                    <li>Price:  {item.price} </li>
                </ul>
               </li>
    }) 
    
    /*p.forEach((key)=>{
                        console.log("kkkkkkkey : " + key);
                        console.log(this.props.products[key]);
                         <li>aaaaaa</li>         
                    })
    */
    return (
          <div className="list-group-item">
            {list}
          </div>
  
      );
    /*return this.props.products.map(photo => {
    
      console.log('ssssss return this.props.products: ' + this.props.products)  
      return (

          <li className="list-group-item">
            <img src={photo.thumbnailUrl} />
          </li>
  
      );
    });
    */
  }

  render() {
    return (
      
      <ul className="list-group">
        {
         this.renderProducts()
         
        //fetchProducts2()
        }
        {console.log("propsssssss " + this.props.list)  }
      </ul>
    );
  }
}

function mapStateToProps({ products }) {
  console.log("sssssssssss - mapstatetoProps: " + products)  
  console.log(products)  
  return { products }
}

export default connect(mapStateToProps,actions)(ProductList);

/*
class ProductsList extends Component {
  renderProducts() {
    return this.props.products.map(product => {
      return (
          <li className="list-group-item">
            <img src={product.thumbnailUrl} />
          </li>
    
      );
    });
  }

  render() {
    return (
      <ul className="list-group">
        {this.renderProducts()}
      </ul>
    );
  }
}

function mapStateToProps({ products }) {
  return { products }
}

export default connect(mapStateToProps)(ProductsList);
*/
    /*
        <Link key={product.id} to={`/products/${product.id}`}>
          <li className="list-group-item">
            <img src={product.thumbnailUrl} />
          </li>
        </Link>
        */