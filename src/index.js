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
import './system/style/bootstrap-custom/css/wc.bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './system/style/index.css';
import './css/index.css';
import configuration from './custom_content/configuration';
//const css = require('./App.css');

import AssortedVerticalNavigation from './system/codes/AssortedVerticalNavigation';
import WcShowcase from '../src/system/codes/moduleInfo';
import {WcCssLink} from './system/codes/WcResource'

const MainComp = observer(({ configurationData }) => {
  return (
    <Provider store={store}>
      <HashRouter>
        <div id="wc_showcase_root" className="wcShowcaseRoot">
          {/* style={{ border: '5px dotted red' }} */}
          {console.log('WcShowcase.envio xxx', WcShowcase.environmentId)}
          {console.log('WcShowcase.isDev xxx', WcShowcase.isDev)}
          {!WcShowcase.isDev && <WcCssLink href="static/css/main.inner.css" rel="stylesheet"/>}
          {WcShowcase.isStandalone && <StandAlone />}

          <div style={{ display: "flex" }}>
            <AssortedVerticalNavigation />
            <div className={`wcContainer ${WcShowcase.displayVerticalNavigation ? 'wcContainerSmallerVerticalNav' : 'wcContainerFull'}`}>
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
