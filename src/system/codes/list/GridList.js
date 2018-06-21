import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { WcImg, WcImgValid, WcPlaceHolderImage } from '../WcResource';
import { Mosaic } from '../Mosaic';
import ActionLink from '../ActionLink';
import { NormalizeListDescription } from '../NormalizeListDescription';
import { WcReports } from '../WcEvents';
import '../../style/grid.css';

let openPopList = [];
let openPopOverClassName = 'wcOpenPopover';
const popOverGridStore = ({ popIndex, index }) => {
  openPopList.push({ popIndex: popIndex, index: index });
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

const ObservPopover = observer(({ store, index, popIndex, title, text, wcpc }) => {
  let isOpen = store && store.isOpen;
  let classIsOpen = isOpen ? openPopOverClassName : 'wcClosePopover';
  return store ? (
    <div>
      <button
        type="button"
        className="bt-btn bt-btn-primary bt-btn-sm"
        onClick={() => {
          allPopovers.openPop(popIndex, index);
        }}
      >
        See more
      </button>
      <div className={classIsOpen}>
        <WcImg
          src={require('../../resources/icons/svg/icon-close_.svg')}
          onClick={() => {
            allPopovers.openPop(popIndex, index);
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

const GridListProduct = ({ product, caption, index }) => {
  return (
    <div className="wcCard">
      <div className="wcCardImgTop wc-img-fluid" onClick={() => WcReports('product-listing-grid-click-product', product.wcpc)}>
        <Mosaic wcpc={product.wcpc} />
        <ActionLink wcpc={product.wcpc} type="p2b" unlink={true}>
          {product.listImage === undefined ? (
            <WcPlaceHolderImage className="wcPlaceHolderImageProductListing" alt={product.vendorProductName} />
          ) : (
            <WcImgValid
              mobile={'/static/_wc/product-images/ver/150/' + product.wcpc + '.jpg.150px.jpg'}
              desktop={'/static/_wc/product-images/ver/150/' + product.wcpc + '.jpg.150px.jpg'}
              src={'/static' + product.listImage}
            />
          )}
        </ActionLink>
      </div>

      <div className="wcCardBlock">
        <h4 className="wcCardTitle" onClick={() => WcReports('product-listing-grid-click-product', product.wcpc)}>
          <ActionLink wcpc={product.wcpc} type="p2b" unlink={true}>
            {product.vendorProductName}
          </ActionLink>
        </h4>
        {/* <div className="wcClear" /> */}
      </div>
      <div className="wcGridCardFooter">
        {product.listDescription && (
          <ObservPopover
            store={allPopovers.getPop(product.wcpc + caption)}
            index={index}
            popIndex={product.wcpc + caption}
            wcpc={product.wcpc}
            title={product.vendorProductName}
            text={product.listDescription}
          />
        )}
        <div onClick={() => WcReports('product-listing-grid-click-product', product.wcpc)}>
          <ActionLink wcpc={product.wcpc} type="p2b">
            Proceed to buy
          </ActionLink>
        </div>
      </div>
    </div>
  );
};

const GridListFamilyProduct = ({ product, caption, index }) => {
  const { vendorProductName, listImage, listDescription, wcpc: productWcpc } = product;

  return product.cpi.map((childProduct, childProductIndex) => {
    const familyName = childProductIndex === 0 ? vendorProductName : childProduct.channelProductName;
    const { cpi: childProductCpi } = childProduct;

    const FamilyActionLink = ({ text, unlink }) => (
      <ActionLink cpi={childProductCpi} type="p2b" unlink={unlink}>
        {text}
      </ActionLink>
    );

    return (
      <div key={childProductIndex} className="wcCard">
        <div className="wcCardImgTop wc-img-fluid" onClick={() => WcReports('product-listing-grid-family-product-cpi', childProductCpi)}>
          <Mosaic cpi={childProductCpi} />
          <ActionLink cpi={childProductCpi} type="p2b" unlink={true}>
            {listImage === undefined ? (
              <WcPlaceHolderImage className="wcPlaceHolderImageProductListing" alt={familyName} />
            ) : (
              <WcImgValid
                mobile={'/static/_wc/product-images/ver/150/' + productWcpc + '.jpg.150px.jpg'}
                desktop={'/static/_wc/product-images/ver/150/' + productWcpc + '.jpg.150px.jpg'}
                src={'/static' + listImage}
              />
            )}
          </ActionLink>
        </div>

        <div className="wcCardBlock">
          <h4 className="wcCardTitle" onClick={() => WcReports('product-listing-grid-family-product-cpi', childProductCpi)}>
            <FamilyActionLink text={familyName} unlink={true} />
          </h4>
        </div>
        <div className="wcGridCardFooter">
          {listDescription && (
            <ObservPopover
              store={allPopovers.getPop(childProductCpi + caption)}
              index={childProductIndex}
              popIndex={childProductCpi + caption}
              wcpc={childProductCpi}
              title={familyName}
              text={listDescription}
            />
          )}
          <div onClick={() => WcReports('product-listing-grid-family-click-product', childProductCpi)}>
            <FamilyActionLink text='Proceed to buy' />
          </div>
        </div>
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
