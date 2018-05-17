import React from 'react';
import ActionLink from '../ActionLink';
import WcImg from '../WcResource/WcImg';
import { NormalizeListDescription } from '../NormalizeListDescription';
import '../../style/wide.css';

const placeholderPic = require('../../resources/placeholder.png');

const WideListProduct = ({ product }) => {
  return (
    <div className="wcWideProduct">
      <h6 style={{ backgroundColor: 'pink' }}>Normal Product</h6>
      <div className="bt-row">
        <div className="wcMosaicWideList ">
          <div className="wcMosaic" data-cpi={product.cpi} />
        </div>
      </div>
      <div className="bt-row">
        <div className="wcWideListImg">
          {product.listImage ? <WcImg src={'/static/' + product.listImage} alt={product.vendorProductName} /> : <img src={placeholderPic} alt={product.vendorProductName} />}
        </div>
        <div className="wcWideListDesc">
          <h4>
            <ActionLink wcpc={product.wcpc} type="p2b" unlink={true}>
              {product.vendorProductName}
            </ActionLink>
          </h4>
          <p>
            <NormalizeListDescription>{product.listDescription}</NormalizeListDescription>
          </p>
        </div>
        <div className="wcWideListButton" style={{ height: 150 }}>
          <span>
            <ActionLink wcpc={product.wcpc} type="p2b">
              Proceed To Buy
            </ActionLink>
          </span>
        </div>
      </div>
    </div>
  );
};

const WideListFamilyProduct = ({ product }) => {
  const { vendorCleanProductName } = product;

  return product.cpi.map((childProduct, childProductIndex) => (
    <div key={childProductIndex} className="wcWideProduct">
      <h6 style={{ backgroundColor: 'magenta' }}>Family Product</h6>
      <div className="bt-row">
        <div className="wcMosaicWideList ">
          <div className="wcMosaic" data-cpi={childProduct.cpi} />
        </div>
      </div>
      <div className="bt-row">
        {product.listImage ? (
          <div className="wcWideListImg">
            <WcImg src={'/static/' + product.listImage} alt={product.vendorProductName} />
          </div>
        ) : null}
        <div className="wcWideListDesc">
          <h4 className={`${product.listDescription ? '' : 'wcOnlyTitle'}`}>
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
          {product.listDescription ? (
            <p>
              <NormalizeListDescription>{product.listDescription}</NormalizeListDescription>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  ));
};

class WideList extends React.Component {
  render() {
    const { data } = this.props;
    let content = data ? (
      <div>
        {data.map((product, productIndex) => {
          // if there a cpi, or the cpi is '0' which means that we are in allassortment mode
          if (typeof product.cpi === 'string' || product.cpi === 0) {
            return <WideListProduct key={productIndex} product={product} />;
          } else {
            return <WideListFamilyProduct key={productIndex} product={product} />;
          }
        })}
      </div>
    ) : null;
    return <div id="wcWideList">{content}</div>;
  }
}

export default WideList;
