import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import basePath from './basePath';
import store from './store';

import ShowcaseHeader from './custom_content/modules/showcase-header';
import ShowcaseFooter from './custom_content/modules/showcase-footer';
import StandAlone from '../src/system/codes/standalone';

import ModuleNavBreadcrumbsRoute from './custom_content/modules/moduleNavBreadcrumbsRoute';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './system/style/index.css';
import configuration from './custom_content/configuration';
//const css = require('./App.css');

import ModuleNavigationVertical from './custom_content/modules/ModuleNavigationVertical';
import WcShowcase from "../src/system/codes/moduleInfo";

const MainComp = observer(({ configurationData }) => {

  return (
    <Provider store={store}>
      <HashRouter>
        <div id="wc_showcase_root" className="wcShowcaseRoot">

          {WcShowcase.isStandalone && <StandAlone/>}

          <div style={{display: "flex"}}>
          <ModuleNavigationVertical />
            <div className="wcContainer">
              {configurationData.staticRoutes.routesDetails.find( ( field ) => field.path === '/EndpointManagement').title}
              <ShowcaseHeader />
              <ModuleNavBreadcrumbsRoute />
              <hr />
               <ShowcaseFooter />
              <basePath />
            </div>
          </div>
        </div>
      </HashRouter>
    </Provider>
  );
});

ReactDOM.render(
  <MainComp configurationData={configuration} />,
  document.getElementById('wc-showcase-root'),
  //getParentElement()
  //document.getElementById('root')
);
registerServiceWorker();