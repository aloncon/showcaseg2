import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { Link } from 'react-router';
import logo from './logo.svg';
import './App.css';
import * as FetcherActions from './wc_api_fetcher';
import observable from 'mobx';
import ProductDataStore from './stores/productdata/productdata';
import ProductListing from './productlisting'
import page2 from './page2'
class App extends Component {

  constructor(props) {
    super(props)
    this.state={}
  }
  


  render() {
    
    return (  
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        <Link to="./page2">page 2222222222</Link>

        <div><h1>********* Listing #1 ****************</h1></div>
        <ProductListing store={ProductDataStore} id="list3" wclink="http://api.walmartlabs.com/v1/items?ids=222,369677640,12417832&amp;apiKey=rgzr9bdktsbm3d6qy8ppdevb"/>
        <br/>
        <div><h1>********* Listing #2 ****************</h1>        </div>
        <br/>
        <ProductListing store={ProductDataStore} id="list2"  wclink="http://api.walmartlabs.com/v1/items?ids=222,679562478,19336123,951908906&amp;apiKey=rgzr9bdktsbm3d6qy8ppdevb"/> 
        {/*
        <ProductListing store={ProductDataStore} type="carusel" ids={['routers','wifi','carusel111']} wcpcs="1|2|2|"/>

        </p>
        <p>
        <ProductListing store={ProductDataStore} type="carusel-vertical" setting={['vertical','4','white','300']} ids={['carusel112']} wcpcs="1|2|2|"/>
        */}
        </p>
        
      </div>
    );
  }
}

export default App;
