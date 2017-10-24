import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
    HashRouter,
    Route,
} from 'react-router-dom';
 
import registerServiceWorker from './registerServiceWorker';
import basePath from './basePath';
import store from './store';

import Navigation from './navigation';
import ShowcaseHeader from './custom_content/modules/showcase-header';
import ShowcaseFooter from './custom_content/modules/showcase-footer';


import ProductListing1 from './custom_content/modules/product-listing1';

import testingArea  from './custom_content/landing_pages/testingArea';
import ShowcaseApp  from './custom_content/landing_pages/ShowcaseApp';
import Page3        from './custom_content/landing_pages/page3';
import EndpointManagement from './custom_content/landing_pages/endpoint-management';
import EndpointSolutions from './custom_content/landing_pages/endpoint-solutions';
import iframe from './custom_content/landing_pages/iframe';


import { onProductsEnter } from './routers/route_callbacks';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './system/style/index.css';
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
    //console.log("getParentElementtt")
    if(parent == null && typeof script !== 'undefined'){
      //console.log("getParentElementtt  parent NULL: " + script.parentNode  );
      return function() { return script.parentNode  };    
    } 
    
    return function() { return parent  };
})();

ReactDOM.render(
    <Provider store={store}>
    <HashRouter>
      <div id="wc_showcase_root" className="wc_showcase_root">
        
        <div className="wcContainer">

           
            <ShowcaseHeader /> 
            <Navigation/>

            <Route exact path="/" component={ShowcaseApp}/>
            <Route path="/ShowcaseApp" component={ShowcaseApp}/>
            <Route path="/EndpointManagement" component={EndpointManagement}/>
            <Route path="/EndpointSolutions" component={EndpointSolutions}/>
            <Route path="/page3" component={Page3}/>
            <Route path="/iframe" component={iframe}/>
            <Route path="/testingArea" component={testingArea}/>
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
