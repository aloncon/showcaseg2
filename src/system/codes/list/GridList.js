import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import WcImg from '../WcResource/WcImg';
import ActionLink from '../ActionLink';
import { NormalizeListDescription } from '../NormalizeListDescription';
import {WcReports} from '../WcEvents';
import '../../style/grid.css';

const placeholderPic = require('../../resources/placeholder.png')
let openPopList = [];

const popOverGridStore = (index) => {
    openPopList.push({ index: index })
    const store = observable({
        open: false,
        get isOpen() {
            return store.open
        },
        setOpen(bool) {
            store.open = bool;
        },
        getIsOpen() {
            return store.open
        }
    })
    return store;
}

class AllPopover {
    constructor() {
        this.map = new Map();
        this.prev = null;
    }
    setNewPop(index) {
        if (!this.map.has(index))
            this.map.set(index, { pop: new popOverGridStore(index), isOpen: false })
    }
    getPop(index) {
        if (!this.map.has(index))
            this.setNewPop(index)
        return this.map.get(index).pop
    }
    openPop(index) {
        if (this.prev !== null && this.prev !== index) {
            this.map.get(this.prev).pop.setOpen(false)
            this.map.get(this.prev).isOpen = false
        }

        if (this.map.has(index)) {
            let temp = this.map.get(index)
            temp.isOpen = !temp.isOpen
            temp.pop.setOpen(temp.isOpen)
        }
        this.prev = index

    }
}

const allPopovers = new AllPopover();

const ObservPopover = observer(({ store, index, title, text, wcpc }) => {
    let isOpen = store && store.isOpen
    let classIsOpen = isOpen ? "wcOpenPopover" : "wcClosePopover"
    return store ?
    <div>
        <button type="button" className="bt-btn bt-btn-primary bt-btn-sm" onClick={() => { allPopovers.openPop(index) }}>See more</button>
        <div className={classIsOpen}>
            <WcImg src={require("../../resources/icons/svg/icon-close_.svg")}
                onClick={() => { allPopovers.openPop(index) }}
                className="wcCloseButtonPopover"
                alt="Grid Button"
                />
            <div><h3>{title}</h3></div>

            <p><NormalizeListDescription>{text}</NormalizeListDescription></p>
        </div>
    </div> : null

})

const GridListProduct = ({ product, caption }) => {
    return (
       <div className="wc-card">
          <ActionLink wcpc={product.wcpc} type="p2b" unlink={true}>
             <div className="wc-card-img-top wc-img-fluid" onClick={() => WcReports("product-listing-wide-click-product",product.wcpc)}>
                {product.listImage === undefined ? <WcImg src={placeholderPic} alt={product.vendorProductName} /> : <WcImg src={'/static/' + product.listImage} alt={product.vendorProductName} />}
             </div>
          </ActionLink>

          <div className="wcMosaicGrid">
             <div className="wcMosaic" data-cpi={product.cpi} />
          </div>

          <div className="wc-card-block">
             <h4 className="wc-card-title" onClick={() => WcReports("product-listing-wide-click-product",product.wcpc)}>
                <ActionLink wcpc={product.wcpc} type="p2b" unlink={true}>
                   {product.vendorProductName}
                </ActionLink>
             </h4>
             <div className="wcGridCardFooter">
                {product.listDescription && (
                   <ObservPopover
                      store={allPopovers.getPop(product.wcpc + caption)}
                      index={product.wcpc + caption}
                      wcpc={product.wcpc}
                      title={product.vendorProductName}
                      text={product.listDescription}
                   />
                )}
                <div onClick={() => WcReports("product-listing-wide-click-product",product.wcpc)}>
                    <ActionLink wcpc={product.wcpc} type="p2b">
                    Proceed to buy
                    </ActionLink>
                </div>
             </div>
             <div className="wcClear" />
          </div>
       </div>
    );
 };

 const GridListFamilyProduct = ({ product }) => {
    const { vendorCleanProductName } = product;

    return product.cpi.map((childProduct, childProductIndex) => (
       <div key={childProductIndex} className="wc-card">
          <div className="wcMosaicGrid">
             <div className="wcMosaic" data-cpi={childProduct.cpi} />
          </div>
          <div className="wc-card-block">
             <h4 className="wc-card-title"  onClick={() => WcReports("product-listing-grid-family-product-cpi",product.wcpc)}>
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
             <div className="wcGridCardFooter"  onClick={() => WcReports("product-listing-grid-family-product-cpi",product.wcpc)}>
                <ActionLink cpi={childProduct.cpi} type="p2b">
                   Proceed to buy
                </ActionLink>
             </div>
             <div className="wcClear" />
          </div>
          {WcReports("product-listing-grid-view-family-product-cpi",childProduct.cpi)}
       </div>
    ));
 };
 class GridList extends React.Component {
    render() {
       const { caption, data ,reporting } = this.props;

       return (
          <div className="wcGridList">
             {data.map((item, i) => {
                // if there a cpi, or the cpi is '0' which means that we are in allassortment mode
                if (typeof item.cpi === 'string' || item.cpi === 0) {
                   reporting && WcReports("product-listing-grid-view-product",item.wcpc)  
                   return <GridListProduct key={i} product={item} caption={caption} />;
                } else {
                   reporting && WcReports("product-listing-grid-view-family-product-wcpc",item.wcpc)  
                   return <GridListFamilyProduct key={i} product={item} caption={caption} />;
                }
             })}
             <div className="wcClear" />
          </div>
       );
    }
 }

export default GridList;