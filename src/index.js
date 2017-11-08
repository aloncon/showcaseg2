import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { Provider } from 'react-redux';
import {
    HashRouter,
} from 'react-router-dom';
 
import registerServiceWorker from './registerServiceWorker';
import basePath from './basePath';
import store from './store';

import ShowcaseHeader from './custom_content/modules/showcase-header';
import ShowcaseFooter from './custom_content/modules/showcase-footer';

import ModuleNavBreadcrumbsRoute from './custom_content/modules/moduleNavBreadcrumbsRoute';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './system/style/index.css';
import configuration from './custom_content/configuration';
//const css = require('./App.css');

const MainComp = observer( ({moduledata})=>{  
  return  <Provider store={store}>
            <HashRouter>
            <div id="wc_showcase_root" className="wc_showcase_root">

                <div className="wcContainer">

                    {moduledata.staticRoutes.find(feild => feild.path === "/EndpointManagement").title}
                    <ShowcaseHeader />
                    <ModuleNavBreadcrumbsRoute />
                    <hr/>
                    <ShowcaseFooter/>


                <basePath/>

                </div>
            </div>
            </HashRouter>
        </Provider>
     });   
    
     ReactDOM.render(
         <MainComp moduledata={configuration} />
     ,
    document.getElementById('wc-showcase-root')
    //getParentElement()
    //document.getElementById('root')
);
registerServiceWorker();
