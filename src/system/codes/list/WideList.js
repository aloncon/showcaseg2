import React, { Fragment } from 'react';
import ActionLink from '../ActionLink';
import WcImg from '../WcResource/WcImg';
import { NormalizeListDescription } from '../NormalizeListDescription';
import '../../style/wide.css';

const placeholderPic = require('../../resources/placeholder.png');

const WideListProduct = ({ product }) => {
   return (
      <div className="wcWideProduct">
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
   return (
      <Fragment>
         {product.cpi.map((childProduct, childProductIndex) => (
            <div key={childProductIndex} className="wcWideProduct">
               <div className="bt-row">
                  <div className="wcMosaicWideList ">
                     <div className="wcMosaic" data-cpi={childProduct.cpi} />
                  </div>
               </div>
               <div className="bt-row">
                  <div className="wcWideListDesc">
                     <h4>
                        <ActionLink cpi={childProduct.cpi} type="p2b">
                           {childProduct.channelProductName}
                        </ActionLink>
                     </h4>
                  </div>
               </div>
            </div>
         ))}
      </Fragment>
   );
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