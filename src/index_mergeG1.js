import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    HashRouter,
    Route,
    NavLink
} from 'react-router-dom';
 
import registerServiceWorker from './registerServiceWorker';
import basePath from './basePath';
import moduleInfo from './moduleInfo';
import store from './store';

import Navigation from './navigation';
import ShowcaseHeader from './showcase-header';
import ShowcaseFooter from './showcase-footer';

import ProductListing1 from './custom_content/modules/product-listing1';
import ShowcaseApp from './custom_content/modules/ShowcaseApp';
import Page3 from './custom_content/modules/page3';
import EndpointManagement from './custom_content/modules/endpoint-management';
import EndpointSolutions from './custom_content/modules/endpoint-solutions';
//import Products from './custom_content/modules/productlisting';


import { onProductsEnter } from './routers/route_callbacks';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './css/index.css';
//const css = require('./App.css'); 

const getScriptElement = (function() {
    const scripts = document.getElementsByTagName('script');
    const index = scripts.length - 1;
    const myScript = scripts[index];
    return function() { return myScript; };
})();

const getParentElement = (function(){
    // myScript.parentElement
    const parent = document.getElementById('wc-showcase-root');
    const script = getScriptElement();
    console.log("getParentElementtt")
    if(parent == null && typeof script != 'undefined'){
      console.log("getParentElementtt  parent NULL: " + script.parentNode  );
      return function() { return script.parentNode  };    
    } 
    
    return function() { return parent  };
})();

ReactDOM.render(
    <Provider store={store}>
    <HashRouter>
      <div id="wc_showcase_root" className="wcShowcaseRoot">
        
        <div className="wcContainer">

           
            <ShowcaseHeader /> 
            <Navigation/>

            <Route exact path="/" component={ShowcaseApp}/>
            <Route path="/ShowcaseApp" component={ShowcaseApp}/>
            <Route path="/EndpointManagement" component={EndpointManagement}/>
            <Route path="/EndpointSolutions" component={EndpointSolutions}/>
            <Route path="/page3" component={Page3} onEnter={onProductsEnter}/>
            
            <Route path="/ProductListing1" component={ProductListing1} onEnter={onProductsEnter}/>
            <hr/>
            <ShowcaseFooter/>


        <basePath/>            

        </div>    
      </div>
    </HashRouter>    
    </Provider>
    , 
    //document.getElementById('wc-showcase-root')
    getParentElement()
);
registerServiceWorker();
