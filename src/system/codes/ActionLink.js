import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { cpStore } from '../../store/ProductData'
import ShouldDisplay from './ShouldDisplay'
const partner = require('../codes/moduleInfo')

class Init {
    constructor() {
        this.allassortment = null
    }
    allassortmentMode = () => {

        if (!this.allassortment)
            return this.allassortment = ShouldDisplay({ "wc_section": "wc_all_module_products" }) || partner.default.siteName === 'allassortment'
        else
            return this.allassortment
    }
}

const init = new Init();

const Allassortment = ({ children , unlink}) => (
    ( unlink !== undefined && unlink === true ) && <a>{children}</a>
)


const P2b = ({ children, siteName, cp }) => (
    <a href={`http://content.webcollage.net/${siteName}/actions?action=p2b&channel-product-id=${cp}`}>{children}</a>
)

// const MiniSite = ({ children }) => (
//     <div style={{ border: "1px solid red" }}>{children}</div>
// )

const Mosaic = ({ children, siteName, cp }) => (
    <div className="wcMosaicImage" data-cpi={cp}>{children}</div>
)


const ActionLinkObserver = observer(({ store: { data }, type, unlink, children }) => {
    let productId = data
    const siteName = partner.default.siteName
    const allProducts = ShouldDisplay({ "wc_section": "wc_all_module_products" })

    const allassortmentMode = init.allassortmentMode()
    switch (productId && !allassortmentMode && type) {
        case 'p2b': return <P2b children={children}
                cp={productId.cp}
                siteName={siteName} /> 
        case 'mosaic': return <Mosaic   children={children}
                                        cp={productId.cp}
                                        siteName={siteName} />
       // case 'mini-site': return <MiniSite children={children} />
        default: return <Allassortment children={children} unlink={unlink} />
    }
})

/*
    ActionLink usage : 
     one needed to control content which has a link, currently, there is only one type - 'p2b' (proceed to buy),
     in the future in case need to add more types - create a new case in upper component 'ActionLinkObserver'.

     In case the configuration of the current partner of this module is 'show all products' (in contextfile configuration)
     or the partner is 'Allassortment' - ActionLink unlink if we add attr 'unlink={true}' otherwise disappear.   
*/
const ActionLink = ({ wcpc, type, children, unlink ,location }) => {
    const pathname = location.pathname.replace("/", "");
    type==='mosaic' && window.Webcollage.loadProductContentForProductListing(partner.default.siteName, {containerSelector: ".wcMosaicImage", cpiAttribute: "data-cpi"});
    return <ActionLinkObserver store={cpStore(wcpc)} type={type} children={children} unlink={unlink}/>
}

export default withRouter(ActionLink);