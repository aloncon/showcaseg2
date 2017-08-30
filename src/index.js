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


ReactDOM.render(
    <Provider store={store}>
    <HashRouter>
      
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
     
    </HashRouter>    
    </Provider>
    , 
    document.getElementById('root')
);
registerServiceWorker();
