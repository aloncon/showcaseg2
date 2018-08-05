import React from 'react';
import { observer } from 'mobx-react';
import ActionLink from '../ActionLink';
import { Mosaic } from '../Mosaic';
import { WcImgValid, WcPlaceHolderImage } from '../WcResource';
import { NormalizeListDescription } from '../NormalizeListDescription';
import ResponsiveStore from '../../../store/ResponsiveStore';
import { WcReports } from '../WcEvents';
import '../../style/wide.css';

const classNameGenerateWideNarrow = wcContainerSizeForWideClassName => {
  // styling configuration
  let classProductName = '';
  let rowName = '';
  let descriptionClassName = '';
  switch (wcContainerSizeForWideClassName) {
    case 'wide':
      classProductName = 'wcWideProduct';
      rowName = 'bt-row';
      descriptionClassName = 'wideDescription';
      break;
    case 'narrow':
      classProductName = 'wcNarrowProduct';
      rowName = 'row-narrow';
      descriptionClassName = 'narrowDescription';
      break;
    default:
      break;
  }

  return { classProductName, rowName, descriptionClassName };
};

const WideListProduct = observer(({ responsiveStore: { wcContainerSizeForWideClassName }, product, hideProductImages }) => {
  const { classProductName, rowName, descriptionClassName } = classNameGenerateWideNarrow(wcContainerSizeForWideClassName);


  // family product configuration
  const { vendorProductName, listImage, listDescription } = product;

  return product.cpi.map((childProduct, childProductIndex) => {
    const familyName = childProductIndex === 0 ? vendorProductName : childProduct.channelProductName;

    const FamilyActionLink = ({ text, unlink }) => (
      <ActionLink cpi={childProduct.cpi} type="p2b" unlink={unlink}>
        {text}
      </ActionLink>
    );

    const wcHaveTitleDescImage = listDescription ||  listImage || !hideProductImages ;

    return (
      <div key={childProductIndex} className={`${classProductName}${wcHaveTitleDescImage ? '' : ' wcOnlyTitleDescWidth'}`}>
        <Mosaic cpi={childProduct.cpi} />
        <div className={rowName}>
          {!hideProductImages && (
            <div className="wcWideListImg">
              {product.listImage === undefined ? (
                <WcPlaceHolderImage className="wcPlaceHolderImageProductListing" alt={familyName} />
              ) : (
                <WcImgValid
                  mobile={'/static/_wc/product-images/ver/150/' + product.wcpc + '.jpg.150px.jpg'}
                  desktop={'/static/_wc/product-images/ver/150/' + product.wcpc + '.jpg.150px.jpg'}
                  src={'/static' + product.listImage}
                  alt={familyName}
                />
              )}
            </div>
          )}
          {listDescription ? (
            <div className="wcWideListDesc" onClick={() => WcReports('product-listing-wide-family-product-cpi', childProduct.cpi)}>
              <h4>
                <FamilyActionLink text={familyName} unlink={true} />
              </h4>
              <div className={descriptionClassName}>
                <p>
                  <NormalizeListDescription>{product.listDescription}</NormalizeListDescription>
                </p>
              </div>
            </div>
          ) : (
            <div className="wcWideListDesc">
              <h4 onClick={() => WcReports('product-listing-wide-family-product-cpi', childProduct.cpi)}>
                <FamilyActionLink text={familyName} unlink={true} />
              </h4>

            </div>
          )}
          <div className="wcWideListButton" onClick={() => WcReports('product-listing-wide-family-product-cpi', childProduct.cpi)}>

            <div>
              {childProduct.priceAsString && <p className="wcProductPrice">Price:<br/>{childProduct.priceAsString}</p>}
            </div>
            <span>
              <FamilyActionLink text="Proceed To Buy" />
            </span>
          </div>
        </div>
      </div>
    );
  });
});

class WideList extends React.Component {
  render() {
    const { data, reporting, hideProductImages } = this.props;

    let content = data ? (
      <div>
        {data.map((product, productIndex) => {
            reporting && WcReports('product-listing-wide-view-family-product-wcpc', product.wcpc);
               return <WideListProduct key={productIndex} responsiveStore={ResponsiveStore} product={product} hideProductImages={hideProductImages} />;

        })}
      </div>
    ) : null;
    return <div id="wcWideList">{content}</div>;
  }
}

export default WideList;
