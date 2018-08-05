import React from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { cpStore } from '../../store/ProductData';
import ShouldDisplay from './ShouldDisplay';
import {WcReports} from './WcEvents';

const partner = require('../codes/moduleInfo');

class Init {
   constructor() {
      this.allassortment = null;
      this.mosaicOn = false;
   }
   allassortmentMode = () => {
      if (!this.allassortment) return (this.allassortment = ShouldDisplay({ wc_section: 'display-all-vendor-products' }) || partner.default.siteName === 'allassortment');
      else return this.allassortment;
   };
}

const init = new Init();

const Allassortment = ({ children, unlink , ...props}) => {
      delete props.history;
      delete props.match;
      delete props.staticContext;
      return unlink !== undefined && unlink === true && <a {...props}>{children}</a>;
}
      ;

const P2b = ({ children, siteName, cpi , ...props}) => {
      delete props.history;
      delete props.match;
      delete props.staticContext;
      return <a href={`http://content.webcollage.net/${siteName}/actions?action=p2b&channel-product-id=${cpi}`} {...props}>{children}</a>;
};

const ActionLinkObserver = observer(({ store: { data }, type, unlink, children, ...props }) => {
   let productId = data;
   const siteName = partner.default.siteName;

   const allassortmentMode = init.allassortmentMode();
   switch (productId && !allassortmentMode && type) {
      case 'p2b':
         return <P2b children={children} cpi={productId.cpi} siteName={siteName} {...props }  onClick={() => WcReports("p2b",productId.wcpc)} />;
      default:
         return <Allassortment children={children} unlink={unlink} {...props }/>;
   }
});

const ActionLinkStatic = ({ cpi, type, unlink, children , ...props}) => {
   const siteName = partner.default.siteName;

   const allassortmentMode = init.allassortmentMode();
   switch (cpi && !allassortmentMode && type) {
      case 'p2b':
         return <P2b children={children} cpi={cpi} siteName={siteName} {...props }/>;
      default:

         return <Allassortment children={children} unlink={unlink} {...props }/>;
   }
};

/*
    ActionLink usage :
     one needed to control content which has a link, currently, there is only one type - 'p2b' (proceed to buy),
     in the future in case need to add more types - create a new case in upper component 'ActionLinkObserver'.

     In case the configuration of the current partner of this module is 'show all products' (in contextfile configuration)
     or the partner is 'Allassortment' - ActionLink unlink if we add attr 'unlink={true}' otherwise disappear.
*/
const ActionLink = ({ wcpc, type, children, unlink, location, cpi, ...props }) => {
   //const pathname = location.pathname.replace("/", "")
   switch (typeof cpi) {
      case 'string':
         if (cpi.length > 0) {
            return <ActionLinkStatic cpi={cpi} type={type} children={children} unlink={unlink} {...props }/>;
         } else return null;
      default:
         if (wcpc) {
            return <ActionLinkObserver store={cpStore(wcpc)} type={type} children={children} unlink={unlink} {...props }/>;
         } else return null;
   }

};

export default withRouter(ActionLink);