import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
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
// import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './system/style/index.css';
import './css/index.css';
import configuration from './custom_content/configuration';
//const css = require('./App.css');

import MainContainer from './system/codes/MainContainer';
import WcShowcase from '../src/system/codes/moduleInfo';
import { WcCssLink } from './system/codes/WcResource';

import vendorData from './system/data/demo/vendor-data';

import ResponsiveStore from './store/ResponsiveStore';

const Dummy = () => {
  console.log('qqq dummy render');
  return <div dangerouslySetInnerHTML={{ __html: vendorData[0].listDescription }} />;
};

const MainComp = observer(({ configurationData, rootStore }) => {
  return (
    <Provider store={store}>
      <HashRouter>
        <div id="wc_showcase_root" className={`app-size-${rootStore.wcContainerSize} wcShowcaseRoot`}>
          {/* style={{ border: '5px dotted red' }} */}
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
          <MainContainer>
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
/* // let onUnmount;
const RootStore = () => {
  function update() {
    const { width } = el.getBoundingClientRect();
    const contentEl = el.querySelector('.wcContainer');
    if (contentEl) {
      store.contentWidth = contentEl.getBoundingClientRect().width;
    }
    store.mainWidth = width;
  }

  requestAnimationFrame(() => {
    update();
    requestAnimationFrame(update);
  });

  window.addEventListener('resize', update);

  const store = observable({
    mainWidth: el.getBoundingClientRect().width,
    contentWidth: 0,
    get mainSize() {
      if (this.mainWidth < 576) return 'sm';
      if (this.mainWidth < 768) return 'md';
      if (this.mainWidth < 1200) return 'lg';
      return 'xl';
    }
  });

  return store;
};

const rootStore = RootStore();
 */

ReactDOM.render(
  <MainComp configurationData={configuration} rootStore={ResponsiveStore} />,
  el,
  //getParentElement()
  //document.getElementById('root')
);
registerServiceWorker();
