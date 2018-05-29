import React from 'react'
import ActionLink from '../ActionLink'
import {Mosaic} from '../Mosaic'
import WcImg from '../WcResource/WcImg'
import {NormalizeListDescription} from '../NormalizeListDescription'
import ShouldDisplay from '../ShouldDisplay'
import {WcReports} from '../WcEvents';
import '../../style/wide.css'

const placeholderPic = require('../../resources/placeholder.png');

const WideListProduct = ({ product }) => {
      console.log("product",product)
   return (
      <div className="wcWideProduct">
         <div className="bt-row">
            <div className="wcWideListImg">
               {product.listImage ? <WcImg src={'/static/' + product.listImage} alt={product.vendorProductName} /> : <img src={placeholderPic} alt={product.vendorProductName} />}
            </div>
            <Mosaic wcpc={product.wcpc}/>
            <div className="wcWideListDesc">
                
               <h4>
                  <ActionLink wcpc={product.wcpc} type="p2b" unlink={true} >
                     {product.vendorProductName}
                  </ActionLink>
               </h4>
               <p>
                  <NormalizeListDescription>{product.listDescription}</NormalizeListDescription>
               </p>
            </div>
            <div className="wcWideListButton" style={{ height: 150 }} onClick={() => WcReports("product-listing-wide-click-product",product.wcpc)}>
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
      console.log("product family",product,product.cpi.length)
   const { vendorCleanProductName } = product;

   return product.cpi.map((childProduct, childProductIndex) => (           
            <div key={childProductIndex} className="wcWideProduct">
               <div className="bt-row">
                  <div className="wcWideListDesc">
                  <Mosaic cpi={product.wcpc}/>
                        <h4 className="wcOnlyTitle">
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
               </div>
               {WcReports("product-listing-wide-view-family-product-cpi",childProduct.cpi)}
            </div>
   ));
};

class WideList extends React.Component {
   

   render() {
      const { data, reporting } = this.props;
            
      
      console.log("gitit1: "+reporting)
      //console.log("DATA ",data)
      let content = data ? (
         <div>
            {data.map((product, productIndex) => {
                  console.log("product data ",product)
               // if there a cpi, or the cpi is '0' which means that we are in allassortment mode
               if (typeof product.cpi === 'string' || product.cpi === 0) {
                  reporting && WcReports("product-listing-wide-view-product",product.wcpc)   
                  return <WideListProduct key={productIndex} product={product} />;                 
               } else {
                  reporting && WcReports("product-listing-wide-view-family-product-wcpc",product.wcpc)                     
                  return <WideListFamilyProduct key={productIndex} product={product} />;
               }
            })}
         </div>
      ) : null;
      return <div id="wcWideList">{content}</div>;
   }
}

export default WideList;