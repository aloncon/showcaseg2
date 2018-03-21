import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { HashRouter } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import 'babel-polyfill';

// Our Components
import ShowcaseHeader from './custom_content/modules/showcase-header';
import ShowcaseFooter from './custom_content/modules/showcase-footer';
import StandAlone from '../src/system/codes/standalone';
import ModuleGenerateBodyContent from './custom_content/modules/moduleGenerateBodyContent';
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
import './common/css/header.css'; // module global css
//~~~~~~~


//~~~~~~~

//const css = require('./App.css');

const MainComp = observer(({  rootResponsiveStore }) => {
  return (
    // <Provider store={store}>
      <HashRouter>
        <div id="wc_showcase_root" className={`app-size-${rootResponsiveStore.wcContainerSize} wcShowcaseRoot`}>
          <WcCssLink href="./static/css/public.css" rel="stylesheet" type="text/css" />
          <div>wcRootWidth: {rootResponsiveStore.wcRootWidth}</div>
          <div>wcContainerWidth: {rootResponsiveStore.wcContainerWidth}</div>
          <div className={`size-${rootResponsiveStore.wcContainerSize}`}>
            wcRootSize: {rootResponsiveStore.wcRootSize}
            <br />
            wcContainerSize: {rootResponsiveStore.wcContainerSize}
            <br />
            <hr />
          </div>
          <MainContainer responsiveStore={rootResponsiveStore}>
            <div   id="wc-reset">
              {WcShowcase.isStandalone && <StandAlone />}
              <ShowcaseHeader />
              <ModuleGenerateBodyContent />
              <hr />
              <ShowcaseFooter />
              </div>
          </MainContainer>
        </div>
      </HashRouter>
    // </Provider>
  );
});

const el = document.getElementById('wc-showcase-root');

ReactDOM.render(
  <MainComp rootResponsiveStore={ResponsiveStore} />,
  el
  //getParentElement()
  //document.getElementById('root')
);
registerServiceWorker();
