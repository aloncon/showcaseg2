import React from 'react'
import { observer } from 'mobx-react';
import ActionLink from '../ActionLink'
import {Mosaic} from '../Mosaic'
import WcImg , { WcImgValid } from '../WcResource/WcImg'
import {NormalizeListDescription} from '../NormalizeListDescription'
import ResponsiveStore from '../../../store/ResponsiveStore';
import {WcReports} from '../WcEvents';
import '../../style/wide.css';

const placeholderPic = require('../../resources/placeholder.png');

const WideListProduct = observer(({ responsiveStore : {wcContainerSizeForWideClassName} , product , hideProductImages}) => { 
      let classProductName = '';
      let rowName = '';
      let descriptionClassName = '';
      switch(wcContainerSizeForWideClassName){
            case 'wide'      : classProductName = "wcWideProduct"; rowName = "bt-row"; descriptionClassName = 'wideDescription'; break;
            case 'narrow'    : classProductName = "wcNarrowProduct"; rowName = "row-narrow"; descriptionClassName = 'narrowDescription'; break;
            default          : break;
      }   
       return (
            <div className={classProductName}>
               <Mosaic wcpc={product.wcpc}/> 
               <div className={rowName}>
               {!hideProductImages && <div className="wcWideListImg">  
                  {product.listImage === undefined ? 
                  <WcImg className="wcPlaceHolderImageProductListing" src={placeholderPic} alt={product.vendorProductName} /> 
                  : 
                  <WcImgValid 
                    mobile={'/static/_wc/product-images/ver/150/' + product.wcpc + '.jpg.150px.jpg'}  
                    desktop={'/static/_wc/product-images/ver/150/' + product.wcpc + '.jpg.150px.jpg'} 
                    src={'/static' + product.listImage} />
                  }
                  </div>}
                  <div className="wcWideListDesc" onClick={() => WcReports("product-listing-wide-click-product",product.wcpc)}>
                     <h4>
                        <ActionLink wcpc={product.wcpc} type="p2b" unlink={true} >
                           {product.vendorProductName}
                        </ActionLink>
                     </h4>
                     <div className={descriptionClassName}>
                        <p>
                              <NormalizeListDescription>{product.listDescription}</NormalizeListDescription>
                        </p>
                     </div>
                  </div>
                  <div className="wcWideListButton" onClick={() => WcReports("product-listing-wide-click-product",product.wcpc)}>
                     <span>
                        <ActionLink wcpc={product.wcpc} type="p2b">
                           Proceed To Buy
                        </ActionLink>
                     </span>
                  </div>
               </div>
            </div>
         );
}) ;

const WideListFamilyProduct = ({ product , hideProductImages}) => {
   const { vendorProductName , listImage, listDescription } = product;

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
      const { data, reporting , hideProductImages } = this.props;

      let content = data ? (
         <div>
            {data.map((product, productIndex) => {
               // if there a cpi, or the cpi is '0' which means that we are in allassortment mode
               if (typeof product.cpi === 'string' || product.cpi === 0) {
                  reporting && WcReports("product-listing-wide-view-product",product.wcpc)
                  return <WideListProduct key={productIndex} 
                                          responsiveStore={ResponsiveStore} 
                                          product={product} 
                                          hideProductImages={hideProductImages}/>;
               } else {
                  reporting && WcReports("product-listing-wide-view-family-product-wcpc",product.wcpc)
                  return <WideListFamilyProduct key={productIndex} 
                                                product={product} 
                                                hideProductImages={hideProductImages}/>;
               }
            })}
         </div>
      ) : null;
      return <div id="wcWideList">{content}</div>;
   }
}

export default WideList;
