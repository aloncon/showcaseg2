import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { cpStore } from '../../store/ProductData'
import ShouldDisplay from './ShouldDisplay'
import configuration from './configuration';
const partner = require('../codes/moduleInfo')


class InitActionLink {
    constructor() {
        this.allassortment = null
        this.mosaicListOn = false
        this.mosaicConfiguration = (configuration) => {
            return {
                layout : configuration ? configuration.layout : "hero-ribbon",
                buttonType : configuration ? configuration.buttonType : "hidden",
                buttonPosition : configuration ? configuration.buttonPosition : "top-left"
            }
        }
    }
    allassortmentMode = () => {

        if (!this.allassortment)
            return this.allassortment = ShouldDisplay({ "wc_section": "wc_all_module_products" }) || partner.default.siteName === 'allassortment'
        else
            return this.allassortment
    }
    enterMosaicListProducts = (mosaicConfiguration) =>{ 
    //   const config = this.mosaicConfiguration(mosaicConfiguration);
    //   !this.mosaicListOn && 
    //   (this.mosaicListOn = true) && 
    //   window.Webcollage.loadProductContentForProductListing( partner.default.siteName, 
    //                                                         {containerSelector : ".wcMosaicImage",  
    //                                                          layout : config.layout,
    //                                                          buttonType : config.buttonType,
    //                                                          buttonPosition : config.buttonPosition, 
    //                                                          cpiAttribute : "data-cpi" }) 
    }

    enterMosaicProduct = (cpi , mosaicConfiguration) => {
        const config = this.mosaicConfiguration(mosaicConfiguration);
        console.log("config",config , mosaicConfiguration) 
        setTimeout(
            ()=>{window.Webcollage.loadProductContent(  partner.default.siteName, 
                                                        cpi, 
                                                        {"mosaic-board": {  containerSelector :`#wcMosaicImage_${cpi}`, 
                                                                                        layout : config.layout , 
                                                                                        buttonType : config.buttonType,
                                                                                        buttonPosition : config.buttonPosition}})} , 500
        )
    }
}

const init = new InitActionLink();

const Allassortment = ({ children , unlink}) => (
    ( unlink !== undefined && unlink === true ) && <a>{children}</a>
)


const P2b = ({ children, siteName, cpi }) => (
    <a href={`http://content.webcollage.net/${siteName}/actions?action=p2b&channel-product-id=${cpi}`}>{children}</a>
)

const MosaicList = ({ children, cpi , mosaicConfiguration}) => {
    init.enterMosaicListProducts(mosaicConfiguration)
    return <div className="wcMosaicImage" data-cpi={cpi}>{children}</div>
}

const Mosaic = ({ children, cpi  , mosaicConfiguration}) => {
    init.enterMosaicProduct(cpi, mosaicConfiguration)
    return <div id={`wcMosaicImage_${cpi}`}>{children}</div>
}

/* NOT IN USE
const MiniSite = ({ children }) => (
    <div style={{ border: "1px solid red" }}>{children}</div>
) */

const ActionLinkObserver = observer(({ store: { data }, type, unlink, children , mosaicConfiguration}) => {
    let productId = data
    const siteName = partner.default.siteName
    const allProducts = ShouldDisplay({ "wc_section": "wc_all_module_products" })
    const allassortmentMode = init.allassortmentMode()
    switch (productId && (!allassortmentMode || type.indexOf("mosaic") > -1) && type) {
        case 'p2b':         return <P2b children={children}
                                        cpi={productId.cpi}
                                        siteName={siteName} /> 
        case 'mosaic':      return <Mosaic  children={children}
                                            cpi={productId.cpi}
                                            mosaicConfiguration={mosaicConfiguration}/>
        case 'mosaic-list': return <MosaicList  children={children}
                                                cpi={productId.cpi}
                                                mosaicConfiguration={mosaicConfiguration}/>
       // case 'mini-site': return <MiniSite children={children} /> // not in use
        default: return <Allassortment children={children} unlink={unlink} />
    }
})

/*
    ActionLink usage : 
     when needed to control content which has a link, currently, there is only one type - 'p2b' (proceed to buy),
     in the future in case need to add more types - create a new case in upper component 'ActionLinkObserver'.

     In case the configuration of the current partner of this module is 'show all products' (in contextfile configuration)
     or the partner is 'Allassortment' - ActionLink unlink if we add attr 'unlink={true}' otherwise disappear.   
*/
const ActionLink = ({ wcpc, type, children, unlink ,location ,mosaic}) => {
    const pathname = location.pathname.replace("/", "")
    return <ActionLinkObserver store={cpStore(wcpc)} type={type} children={children} unlink={unlink} mosaicConfiguration={mosaic}/>
}

export default withRouter(ActionLink);