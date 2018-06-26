import { observable } from 'mobx';

// Global variables set
const rootElement = document.getElementById('wc-showcase-root'); // The Mockup element
const repeatTimes = 50; // The amount of times the requestAnimationFrame will fire.
let requestAnimationGlobalID;
//~~~~~~~~~~~~~~~~~~~~


/**
 * Mobx Store that hold the values for:
 *  * `wcRootWidth`: The app's root div width
 *  * `wcContainerWidth`: The container which hold all the app content exclude the Vertical Navigation.
 *
 * The getters return a String value which represents the size by calculating the mentioned elements width.
 *  * `wcRootSize` : Return the root size.
 *  * `wcContainerSize`: Return the wcContainer size.
 *
 * TODO: Decide if we need the mockup root element or not. :
 * const { width } = rootElement.getBoundingClientRect();
 * store.rootWidth = width;
 */
const RootStore = () => {
  function update() {
    const wcRootElement = rootElement.querySelector('#wc_showcase_root');
    const wcContainerElement = rootElement.querySelector('.wcContainer');

    if (wcRootElement) {
      store.wcRootWidth = wcRootElement.getBoundingClientRect().width;
    }
    if (wcContainerElement) {
      store.wcContainerWidth = wcContainerElement.getBoundingClientRect().width;
    }

    //Call the requestAnimationFrame again until `repeatTimes`
    if (requestAnimationGlobalID < repeatTimes) {
      requestAnimationGlobalID = requestAnimationFrame(update);
    }
  }

  requestAnimationGlobalID = requestAnimationFrame(update);

  (()=>{
    setTimeout(() => {
      update();
    }, 500);
  })();

  window.addEventListener('resize', update);

  const store = observable({
    // rootWidth: rootElement.getBoundingClientRect().width,
    wcRootWidth: 540,
    wcContainerWidth: 540,
    get wcRootSize() {
      if (this.wcRootWidth < 326) return 'xxs';
      if (this.wcRootWidth < 408) return 'xs';
      if (this.wcRootWidth < 575) return 'sm';
      if (this.wcRootWidth < 767) return 'md';
      if (this.wcRootWidth < 1200) return 'lg';
      return 'xl';
    },
    get wcContainerSize() {
      if (this.wcContainerWidth < 326) return 'xxs';
      if (this.wcContainerWidth < 408) return 'xs';
      if (this.wcContainerWidth < 575) return 'sm';
      if (this.wcContainerWidth < 767) return 'md';
      if (this.wcContainerWidth < 1200) return 'lg';
      return 'xl';
    },
    get wcContainerSizeForFlexListing(){
      if (this.wcContainerWidth < 720) return 'wide';
      else return 'grid';
    },
    get wcContainerSizeForWideClassName(){
      if (this.wcContainerWidth < 590) return 'narrow';
      else return 'wide';
    }
    /* get rootSize() {
      if (this.rootWidth < 576) return 'sm';
      if (this.rootWidth < 768) return 'md';
      if (this.rootWidth < 1200) return 'lg';
      return 'xl';
    }, */
  });

  store.callUpdate = update;

  return store;
};

const rootStore = RootStore();

export default rootStore;
