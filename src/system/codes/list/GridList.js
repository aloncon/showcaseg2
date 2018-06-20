import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import WcImg , { WcImgValid } from '../WcResource/WcImg';
import { Mosaic } from '../Mosaic';
import ActionLink from '../ActionLink';
import { NormalizeListDescription } from '../NormalizeListDescription';
import { WcReports } from '../WcEvents';
import '../../style/grid.css';

const placeholderPic = require('../../resources/placeholder.png');
let openPopList = [];
let openPopOverClassName = 'wcOpenPopover'
const popOverGridStore = ({popIndex , index}) => {
  openPopList.push({ popIndex: popIndex , index : index });
  const store = observable({
    open: false,
    get isOpen() {
      return store.open;
    },
    setOpen(bool) {
      store.open = bool;
    },
    getIsOpen() {
      return store.open;
    },
  });
  return store;
};

class AllPopover {
  constructor() {
    this.map = new Map();
    this.prev = null;
  }
  setNewPop(popIndex) {
    if (!this.map.has(popIndex)) this.map.set(popIndex, { pop: new popOverGridStore(popIndex), isOpen: false });
  }
  getPop(popIndex) {
    if (!this.map.has(popIndex)) this.setNewPop(popIndex);
    return this.map.get(popIndex).pop;
  }
  openPop(popIndex,index) {
    if((window.innerHeight - document.getElementsByClassName("wcGridCardFooter")[index].getBoundingClientRect().top) < 180 )
      openPopOverClassName = 'wcOpenPopoverTop'
    else  openPopOverClassName = 'wcOpenPopover'

    if (this.prev !== null && this.prev !== popIndex) {
      this.map.get(this.prev).pop.setOpen(false);
      this.map.get(this.prev).isOpen = false;
    }

    if (this.map.has(popIndex)) {
      let temp = this.map.get(popIndex);
      temp.isOpen = !temp.isOpen;
      temp.pop.setOpen(temp.isOpen);
      
    }
    this.prev = popIndex;
  }
}

const allPopovers = new AllPopover();

const ObservPopover = observer(({ store, index,popIndex ,title, text, wcpc }) => {
  let isOpen = store && store.isOpen;
  let classIsOpen = isOpen ? openPopOverClassName : 'wcClosePopover';
  return store ? (
    <div>
      <button
        type="button"
        className="bt-btn bt-btn-primary bt-btn-sm"
        onClick={() => {
          allPopovers.openPop(popIndex , index);
        }}
      >
        See more
      </button>
      <div className={classIsOpen}>
        <WcImg
          src={require('../../resources/icons/svg/icon-close_.svg')}
          onClick={() => {
            allPopovers.openPop(popIndex , index);
          }}
          className="wcCloseButtonPopover"
          alt="Grid Button"
        />
        <div>
          <h3>{title}</h3>
        </div>

        <p>
          <NormalizeListDescription>{text}</NormalizeListDescription>
        </p>
      </div>
    </div>
  ) : null;
});

const GridListProduct = ({ product, caption , index }) => {
  return (
    <div className="wcCard">
     
      <div className="wcCardImgTop wc-img-fluid" onClick={() => WcReports('product-listing-wide-click-product', product.wcpc)}>
      <Mosaic wcpc={product.wcpc} />
      <ActionLink wcpc={product.wcpc} type="p2b" unlink={true}>
        
          {product.listImage === undefined ? 
            <WcImg className="wcPlaceHolderImageProductListing" src={placeholderPic} alt={product.vendorProductName} /> 
            : 
            <WcImgValid 
              mobile={'/static/_wc/product-images/ver/150/' + product.wcpc + '.jpg.150px.jpg'}  
              desktop={'/static/_wc/product-images/ver/150/' + product.wcpc + '.jpg.150px.jpg'} 
              src={'/static' + product.listImage} />
            }
            </ActionLink>
        </div>
      

      <div className="wcCardBlock">
        <h4 className="wcCardTitle" onClick={() => WcReports('product-listing-wide-click-product', product.wcpc)}>
          <ActionLink wcpc={product.wcpc} type="p2b" unlink={true}>
            {product.vendorProductName}
          </ActionLink>
        </h4>
        {/* <div className="wcClear" /> */}
      </div>
      <div className="wcGridCardFooter">
        {product.listDescription && (
          <ObservPopover store={allPopovers.getPop(product.wcpc + caption)} index={index} popIndex={product.wcpc + caption} wcpc={product.wcpc} title={product.vendorProductName} text={product.listDescription} />
        )}
        <div onClick={() => WcReports('product-listing-wide-click-product', product.wcpc)}>
          <ActionLink wcpc={product.wcpc} type="p2b">
            Proceed to buy
          </ActionLink>
        </div>
      </div>
    </div>
  );
};

const GridListFamilyProduct = ({ product }) => {
  const { vendorCleanProductName } = product;

  return product.cpi.map((childProduct, childProductIndex) => (
    <div key={childProductIndex} className="wcCard">
      <Mosaic cpi={childProduct.cpi} />
      <div className="wcCardBlock">
        <h4 className="wcCardTitle" onClick={() => WcReports('product-listing-grid-family-product-cpi', product.wcpc)}>
          {childProductIndex === 0 ? (
            <ActionLink cpi={childProduct.cpi} type="p2b" unlink={true}>
              {vendorCleanProductName}
            </ActionLink>
          ) : (
            <ActionLink cpi={childProduct.cpi} type="p2b" unlink={true}>
              {childProduct.channelProductName}
            </ActionLink>
          )}
        </h4>
      </div>
      <div className="wcGridCardFooter" onClick={() => WcReports('product-listing-grid-family-product-cpi', product.wcpc)}>
        <ActionLink cpi={childProduct.cpi} type="p2b">
          Proceed to buy
        </ActionLink>
      </div>
      {WcReports('product-listing-grid-view-family-product-cpi', childProduct.cpi)}
    </div>
  ));
};
class GridList extends React.Component {
  render() {
    const { caption, data, reporting } = this.props;

    return (
      <div className="wcGridList">
        {data.map((item, i) => {
          // if there a cpi, or the cpi is '0' which means that we are in allassortment mode
          if (typeof item.cpi === 'string' || item.cpi === 0) {
            reporting && WcReports('product-listing-grid-view-product', item.wcpc);
            return <GridListProduct key={i} index={i} product={item} caption={caption} />;
          } else {
            reporting && WcReports('product-listing-grid-view-family-product-wcpc', item.wcpc);
            return <GridListFamilyProduct key={i} index={i} product={item} caption={caption} />;
          }
        })}
      </div>
    );
  }
}

export default GridList;
