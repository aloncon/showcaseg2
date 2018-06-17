import React from 'react';
import ActionLink from '../ActionLink';
import { Mosaic } from '../Mosaic';
import WcImg from '../WcResource/WcImg';
import { NormalizeListDescription } from '../NormalizeListDescription';
import { WcReports } from '../WcEvents';
import '../../style/wide.css';

const placeholderPic = require('../../resources/placeholder.png');

const WideListProduct = ({ product }) => {
  return (
    <div className="wcWideProduct">
      <div className="bt-row">
        <div className="wcWideListImg">
          {product.listImage ? (
            <WcImg src={'/static/' + product.listImage} alt={product.vendorProductName} />
          ) : (
            <img src={placeholderPic} alt={product.vendorProductName} className="wcPlaceHolderImageProductListing" />
          )}
        </div>
        <Mosaic wcpc={product.wcpc} />
        <div className="wcWideListDesc" onClick={() => WcReports('product-listing-wide-click-product', product.wcpc)}>
          <h4>
            <ActionLink wcpc={product.wcpc} type="p2b" unlink={true}>
              {product.vendorProductName}
            </ActionLink>
          </h4>
          <p>
            <NormalizeListDescription>{product.listDescription}</NormalizeListDescription>
          </p>
        </div>
        <div className="wcWideListButton" style={{ height: 150 }} onClick={() => WcReports('product-listing-wide-click-product', product.wcpc)}>
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
  const { vendorProductName, listImage, listDescription } = product;

  return product.cpi.map((childProduct, childProductIndex) => {
    const familyName = childProductIndex === 0 ? vendorProductName : childProduct.channelProductName;

    const ListImage = () => (
      <div className="wcWideListImg">
        <WcImg src={'/static/' + product.listImage} alt={familyName} />
      </div>
    );

    const ListDescription = () => (
      <p>
        <NormalizeListDescription>{product.listDescription}</NormalizeListDescription>
      </p>
    );

    return (
      <div key={childProductIndex} className={`wcWideProduct${product.listDescription ? '' : ' wcOnlyTitleDescWidth'}`}>
        <div className="bt-row">
          {listImage && <ListImage />}
          <Mosaic cpi={childProduct.cpi} />
          <div className="wcWideListDesc">
            <h4 className={`${product.listDescription ? '' : 'wcOnlyTitle'}`} onClick={() => WcReports('product-listing-wide-family-product-cpi', product.wcpc)}>
              <ActionLink cpi={childProduct.cpi} type="p2b" unlink={true}>
                {familyName}
              </ActionLink>
            </h4>
            {listDescription && <ListDescription />}
          </div>
        </div>
        {WcReports('product-listing-wide-view-family-product-cpi', childProduct.cpi)}
      </div>
    );
  });
};

class WideList extends React.Component {
  render() {
    const { data, reporting } = this.props;

    let content = data ? (
      <div>
        {data.map((product, productIndex) => {
          // if there a cpi, or the cpi is '0' which means that we are in allassortment mode
          if (typeof product.cpi === 'string' || product.cpi === 0) {
            reporting && WcReports('product-listing-wide-view-product', product.wcpc);
            return <WideListProduct key={productIndex} product={product} />;
          } else {
            reporting && WcReports('product-listing-wide-view-family-product-wcpc', product.wcpc);
            return <WideListFamilyProduct key={productIndex} product={product} />;
          }
        })}
      </div>
    ) : null;
    return <div id="wcWideList">{content}</div>;
  }
}

export default WideList;
