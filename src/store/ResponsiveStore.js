import React from 'react';
import { observable } from 'mobx';

// The Mockup element
const rootElement = document.getElementById('wc-showcase-root');

/**
 * Mobx Store that hold the values for:
 *  * `wcRootWidth`: The app's root div width
 *  * `wcContainerWidth`: The container which hold all the app content exclude the Vertical Navigation.
 *
 * The getters return a String value which represents the size by calculating the mentioned elements width.
 *  * `wcRootSize` : Return the root size.
 *  * `wcContainerSize`: Return the wcContainer size.
 *
 * TODO: Decide if we need the mockup root element or not.
 */
const RootStore = () => {
  function update() {
    // const { width } = rootElement.getBoundingClientRect();
    const wcRootElement = rootElement.querySelector('#wc_showcase_root');
    const wcContainerElement = rootElement.querySelector('.wcContainer');

    if (wcRootElement) {
      store.wcRootWidth = wcRootElement.getBoundingClientRect().width;
    }
    if (wcContainerElement) {
      store.wcContainerWidth = wcContainerElement.getBoundingClientRect().width;
    }

    // store.rootWidth = width;
  }

  requestAnimationFrame(() => {
    update();
    requestAnimationFrame(update);
  });

  window.addEventListener('resize', update);

  const store = observable({
    // rootWidth: rootElement.getBoundingClientRect().width,
    wcRootWidth: 0,
    wcContainerWidth: 0,
    get wcRootSize() {
      if (this.wcRootWidth < 575) return 'sm';
      if (this.wcRootWidth < 767) return 'md';
      if (this.wcRootWidth < 1200) return 'lg';
      return 'xl';
    },
    get wcContainerSize() {
      if (this.wcContainerWidth < 575) return 'sm';
      if (this.wcContainerWidth < 767) return 'md';
      if (this.wcContainerWidth < 1200) return 'lg';
      return 'xl';
    },
    /* get rootSize() {
      if (this.rootWidth < 576) return 'sm';
      if (this.rootWidth < 768) return 'md';
      if (this.rootWidth < 1200) return 'lg';
      return 'xl';
    }, */
  });

  return store;
};

const rootStore = RootStore();

export default rootStore;