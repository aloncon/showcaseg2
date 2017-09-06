import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 
import Navigation from './navigation';
import ShowcaseHeader from './showcase-header';
import ShowcaseFooter from './showcase-footer';
import ShowcaseApp from './ShowcaseApp';
import Page3 from './page3';
import EndpointManagement from './endpoint-management';
import EndpointSolutions from './endpoint-solutions';
import registerServiceWorker from './registerServiceWorker';
import basePath from './basePath';
import ProductListing1 from './product-listing1';
import moduleInfo from './moduleInfo';

import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    HashRouter,
    Route,
    NavLink
} from 'react-router-dom';

import Products from './productlisting';
import store from './store';

import { onProductsEnter } from './routers/route_callbacks';


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
      <div id="wc-showcase-root" className="wc-showcase-root">
        
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
