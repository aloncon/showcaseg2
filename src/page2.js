import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as FetcherActions from './wc_api_fetcher';
import observable from 'mobx';
import ProductDataStore from './stores/productdata/productdata';
import ProductListing from './productlisting'

class page2 extends Component {

  constructor(props) {
    super(props)
    this.state={}
  }
  


  render() {
    
    return (
      <div className="page2">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to page 2 </h1>
        </header>
        <p className="App-intro">
        
        <h1>pag2 </h1>
        <ProductListing store={ProductDataStore} wclink="http://api.walmartlabs.com/v1/items?ids=222,12417832&amp;apiKey=rgzr9bdktsbm3d6qy8ppdevb"/>
        </p>
        
      </div>
    );
  }
}

export default page2;
