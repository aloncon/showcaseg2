import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import WcImg from '../WcResource/WcImg';
import { Mosaic } from '../Mosaic';
import ActionLink from '../ActionLink';
import { NormalizeListDescription } from '../NormalizeListDescription';
import { WcReports } from '../WcEvents';
import '../../style/grid.css';

const placeholderPic = require('../../resources/placeholder.png');
let openPopList = [];

const popOverGridStore = index => {
  openPopList.push({ index: index });
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
  setNewPop(index) {
    if (!this.map.has(index)) this.map.set(index, { pop: new popOverGridStore(index), isOpen: false });
  }
  getPop(index) {
    if (!this.map.has(index)) this.setNewPop(index);
    return this.map.get(index).pop;
  }
  openPop(index) {
    if (this.prev !== null && this.prev !== index) {
      this.map.get(this.prev).pop.setOpen(false);
      this.map.get(this.prev).isOpen = false;
    }

    if (this.map.has(index)) {
      let temp = this.map.get(index);
      temp.isOpen = !temp.isOpen;
      temp.pop.setOpen(temp.isOpen);
    }
    this.prev = index;
  }
}

const allPopovers = new AllPopover();

const ObservPopover = observer(({ store, index, title, text, wcpc }) => {
  let isOpen = store && store.isOpen;
  let classIsOpen = isOpen ? 'wcOpenPopover' : 'wcClosePopover';
  return store ? (
    <div>
      <button
        type="button"
        className="bt-btn bt-btn-primary bt-btn-sm"
        onClick={() => {
          allPopovers.openPop(index);
        }}
      >
        See more
      </button>
      <div className={classIsOpen}>
        <WcImg
          src={require('../../resources/icons/svg/icon-close_.svg')}
          onClick={() => {
            allPopovers.openPop(index);
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

const GridListProduct = ({ product, caption }) => {
  return (
    <div className="wcCard">
      <Mosaic wcpc={product.wcpc} />
      <ActionLink wcpc={product.wcpc} type="p2b" unlink={true}>
        <div className="wcCardImgTop wc-img-fluid" onClick={() => WcReports('product-listing-wide-click-product', product.wcpc)}>
          {product.listImage === undefined ? (
            <WcImg className="wcPlaceHolderImageProductListing" src={placeholderPic} alt={product.vendorProductName} />
          ) : (
            <WcImg src={'/static/' + product.listImage} alt={product.vendorProductName} />
          )}
        </div>
      </ActionLink>

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
          <ObservPopover store={allPopovers.getPop(product.wcpc + caption)} index={product.wcpc + caption} wcpc={product.wcpc} title={product.vendorProductName} text={product.listDescription} />
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

const GridListFamilyProduct = ({ product, caption }) => {
  const { vendorProductName, listImage, listDescription } = product;

  return product.cpi.map((childProduct, childProductIndex) => {
    const familyName = childProductIndex === 0 ? vendorProductName : childProduct.channelProductName;

    const FamilyImage = () => (
      <ActionLink wcpc={product.wcpc} type="p2b" unlink={true}>
        <div className="wcCardImgTop wc-img-fluid" onClick={() => WcReports('product-listing-wide-click-product', childProduct.cpi)}>
          <WcImg src={'/static/' + product.listImage} alt={familyName} />
        </div>
      </ActionLink>
    );

    const FamilyDescription = () => (
      <div className="wcGridCardFooter">
        {product.listDescription && (
          <ObservPopover store={allPopovers.getPop(childProduct.cpi + caption)} index={childProduct.cpi + caption} wcpc={childProduct.cpi} title={familyName} text={product.listDescription} />
        )}
        <div onClick={() => WcReports('product-listing-wide-click-product', childProduct.cpi)}>
          <ActionLink cpi={childProduct.cpi} type="p2b">
            Proceed to buy
          </ActionLink>
        </div>
      </div>
    );

    const NoDescription = () => (
      <div className="wcGridCardFooter" onClick={() => WcReports('product-listing-grid-family-product-cpi', childProduct.cpi)}>
        <ActionLink cpi={childProduct.cpi} type="p2b">
          Proceed to buy
        </ActionLink>
      </div>
    );

    return (
      <div key={childProductIndex} className="wcCard">
        <Mosaic cpi={childProduct.cpi} />
        {listImage && <FamilyImage />}
        <div className="wcCardBlock">
          <h4 className="wcCardTitle" onClick={() => WcReports('product-listing-grid-family-product-cpi', childProduct.cpi)}>
            <ActionLink cpi={childProduct.cpi} type="p2b" unlink={true}>
              {familyName}
            </ActionLink>
          </h4>
        </div>
        {listDescription ? <FamilyDescription /> : <NoDescription />}
        {WcReports('product-listing-grid-view-family-product-cpi', childProduct.cpi)}
      </div>
    );
  });
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
            return <GridListProduct key={i} product={item} caption={caption} />;
          } else {
            reporting && WcReports('product-listing-grid-view-family-product-wcpc', item.wcpc);
            return <GridListFamilyProduct key={i} product={item} caption={caption} />;
          }
        })}
      </div>
    );
  }
}

export default GridList;
