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
import configuration from './custom_content/configuration';


import ModuleNavBreadcrumbsRoute from './custom_content/modules/moduleNavBreadcrumbsRoute';


import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './system/style/index.css';
//const css = require('./App.css');

// import moduleAssortment from'./system/data/module-profiles/fromProviderCenter.json';
import WcpcContent from './system/codes/WcpcContent';


const Comp = observer(({ config }) => {
  return     <Provider store={store}>

    <HashRouter>
      <div id="wc_showcase_root" className="wc_showcase_root">

        <div className="wcContainer">

          <WcpcContent wc_section_code={'wc-header'} ><ShowcaseHeader /></WcpcContent>
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
    <Comp config={configuration}/>

    ,
    document.getElementById('wc-showcase-root')
    //getParentElement()
    //document.getElementById('root')
);
registerServiceWorker();
