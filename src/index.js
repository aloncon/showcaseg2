import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import basePath from './basePath';
import store from './store';

// Our Components
import ShowcaseHeader from './custom_content/modules/showcase-header';
import ShowcaseFooter from './custom_content/modules/showcase-footer';
import StandAlone from '../src/system/codes/standalone';
import ModuleNavBreadcrumbsRoute from './custom_content/modules/moduleNavBreadcrumbsRoute';
import MainContainer from './system/codes/MainContainer';
import WcShowcase from '../src/system/codes/moduleInfo';
import { WcCssLink } from './system/codes/WcResource';
import ResponsiveStore from './store/ResponsiveStore';
//~~~~~~~

// CSS files - every css file overwrite the previous one before it.
import './system/style/wc_reset.css'; // module reset css
import './system/style/bootstrap-custom/css/wc.bootstrap.css'; // our custom bootstrap
import './system/style/index.css'; // system global css
import './common/css/index.css'; // module global css
//~~~~~~~

// Configuration
import configuration from './system/codes/configuration';
//~~~~~~~

//const css = require('./App.css');

const MainComp = observer(({ configurationData, rootStore }) => {
  return (
    <Provider store={store}>
      <HashRouter>
        <div id="wc_showcase_root" className={`app-size-${rootStore.wcContainerSize} wcShowcaseRoot`}>
          <div>wcRootWidth: {rootStore.wcRootWidth}</div>
          <div>wcContainerWidth: {rootStore.wcContainerWidth}</div>
          <div className={`size-${rootStore.wcContainerSize}`}>
            wcRootSize: {rootStore.wcRootSize}
            <br />
            wcContainerSize: {rootStore.wcContainerSize}
            <br />
            {/* <Dummy /> */}
            <hr />
          </div>
          <MainContainer responsiveStore={ResponsiveStore}>
            {WcShowcase.isStandalone && <StandAlone />}
            {configurationData.staticRoutes.routesDetails.find(field => field.path === '/EndpointManagement').title}
            <ShowcaseHeader />
            <ModuleNavBreadcrumbsRoute rootStore={rootStore} />
            <hr />
            <ShowcaseFooter />
            <basePath />
          </MainContainer>
        </div>
      </HashRouter>
    </Provider>
  );
});

const el = document.getElementById('wc-showcase-root');

ReactDOM.render(
  <MainComp configurationData={configuration} rootStore={ResponsiveStore} />,
  el,
  //getParentElement()
  //document.getElementById('root')
);
registerServiceWorker();
