import React, { Fragment } from 'react'
import ShouldDisplay , {getNosaicConfiguration} from './ShouldDisplay'
import { observer } from 'mobx-react'
import { cpStore } from '../../store/ProductData'
const moduleInfo = require('../codes/moduleInfo')

// Singleton initMosaic object, decides how to initialize Mosaic Product Listing requests
// In case "Display all products" = true -> it will use loadProductContentForProductListing (by cpi)
// In case "Display all products" = false -> it will use loadProductContentForProductListingByWcpc (by wcpc)
class initMosaicProductListing{
    constructor(){
        this.initMosaic = false
        this.setConfig = (configObj) =>{
            return configObj ? {
                containerSelector       : ".wcMosaic",
                cpiAttribute            : "product-data-number",
                wcpcAttribute           : "product-data-number",
                layout                  : configObj.layout ? configObj.layout : "one-button",
                buttonPosition          : configObj.button_position ? configObj.button_position : "left-top",
                buttonType              : configObj.button_type ? configObj.button_type : "hotspot",
                defaultOverlayPosition  : configObj.default_overlay_position ? configObj.default_overlay_position : "",
                maxButtonsAllowed       : configObj.max_buttons_allowed ? configObj.max_buttons_allowed : 50,
                menuOrientation         : configObj.menu_orientation ? configObj.menu_orientation : "left-to-right",
                menuSize                : configObj.menu_size ? configObj.menu_size : "small",
                overlayType             : configObj.overlay_type ? configObj.overlay_type : "tooltip",
                poweredByWebcollage     : configObj.powered_by_webcollage ? configObj.powered_by_webcollage : "none",
                scrollOverlayToView     : configObj.scroll_overlay_to_view ? configObj.scroll_overlay_to_view : false,
                sectionOrder            : configObj.section_order ? configObj.section_order : [],
                tooltipType             : configObj.tooltip_type ? configObj.tooltip_type : "none"
            } : {
                containerSelector       : ".wcMosaic",
                cpiAttribute            : "product-data-number",
                wcpcAttribute           : "product-data-number",
                layout                  : "one-button",
                buttonPosition          : "left-top",
                menuSize                : "small"
            }
        }
    }

    init(){
        let config = this.setConfig(getNosaicConfiguration())

        if(this.initMosaic === false){
            if(!ShouldDisplay({ "wc_section": "display-all-vendor-products" })){
                window.Webcollage.loadProductContentForProductListing( moduleInfo.default.siteName, config)
                this.isWcpc = false
                // console.log("loadProductContentForProductListingByCpi")
            }else{

                window.Webcollage.loadProductContentForProductListingByWcpc(moduleInfo.default.siteName,moduleInfo.default.moduleName,'live',config)
                this.isWcpc = true
                // console.log("loadProductContentForProductListingByWcpc")
            }
            this.initMosaic = true
        }

        return this.isWcpc
    }
}
const initMosaic = new initMosaicProductListing()

/*
    ------------------------------------------------------------------------------------------------------------
    --                                                                                                        --
    --                                               MOSAIC                                                   --
    --                                                                                                        --
    ------------------------------------------------------------------------------------------------------------
*/
const MosaicListener = observer(({store : {data},id}) => {
    let productData = data
    if(productData && productData.cpi ){
        return <div className="wcMosaic" id={id} product-data-number={productData.cpi}/>
    }
    else return null

})

/*
    ----------------------------------------------------------------------------------------------------------------------------------------------
    for configuration Documentation please check: https://webcollage.freshdesk.com/support/solutions/articles/19000065099-mosaic-api-documentation
    ----------------------------------------------------------------------------------------------------------------------------------------------
*/
const Mosaic = ({wcpc, cpi, id}) => {
    let isWcpc = initMosaic.init();
    if(isWcpc)
        return <div className="wcMosaic" id={id} product-data-number={wcpc}/>
    else {
        if(cpi){
            return <div className="wcMosaic" id={id} product-data-number={cpi}/>
        }
        else return <MosaicListener store={cpStore(wcpc)} id={id}/>
    }

}


/*
    ------------------------------------------------------------------------------------------------------------
    --                                                                                                        --
    --                                           MOSAIC TILES                                                 --
    --                                                                                                        --
    ------------------------------------------------------------------------------------------------------------
*/
const  overlayStyle = { position: "fixed",width:  "100%",height: "100%",top: 0,left: 0,zIndex: 966}
const styleMosaicTilesOn = { width:500 , height:500 , position:"sticky" , left:"15%",top:"15%"}

const MosaicTilesListener = observer(({store : {data} , children , wcpc , ifMosaicContentMissingDisplay}) => {
    class MosaicTilesListener extends React.Component{

        constructor(props){
            super(props)
            if(ShouldDisplay({ "wc_section": "display-all-vendor-products" }))
                 this.isWcpc = true
            else this.isWcpc = false
            this.callMosiacContent = true
            this.state = {
                mosiacJson : null,
                openMosaic : false
            }
        }

        componentDidMount(){
            if(this.isWcpc){
                window.Webcollage.loadProductContentByWcpc(moduleInfo.default.siteName, wcpc, moduleInfo.default.moduleName, "live", {"mosaic-board":{"containerSelector": `.WcMosaicTile-${wcpc}`, layout: "tiles","tilesCallback" :this.tilesCallback.bind(this)}});
            }
        }

        componentWillUnmount(){
           if(window.Webcollage.terminateMosaic)
                window.Webcollage.terminateMosaic()
        }

        tilesCallback(json){
            this.setState( { mosiacJson : json } )
        }

        openMosaicHandler(){
            let  { mosiacJson } = this.state
            this.setState({openMosaic : true})

            setTimeout(()=>{
                window.Webcollage.openMosaicOverlay(mosiacJson.id,"all-content")
            },0)

        }

        closeMosaicHandler(){
            let  { mosiacJson , openMosaic } = this.state
            this.setState({openMosaic : !openMosaic})
            setTimeout(()=>{
                window.Webcollage.closeMosaicOverlay(mosiacJson.id)
            },0)
        }

        mosiacContent(){
            this.callMosiacContent = false
            window.Webcollage.loadProductContent(moduleInfo.default.siteName, data.cpi[0].cpi, {"mosaic-board":{"containerSelector": `.WcMosaicTile-${wcpc}`, layout: "tiles", "tilesCallback": this.tilesCallback.bind(this)}});
        }
        render(){
            const {data} = this.props
            const  {mosiacJson , openMosaic} = this.state

            if(!this.isWcpc && data && data.cpi && this.callMosiacContent){
                this.mosiacContent()
            }

            const validMosiac = mosiacJson !== null ? true : false
            const tileClass = `WcMosaicTile-${wcpc}`
            const childrenWithMosaicClick =  React.cloneElement(this.props.children, validMosiac ? {onClick: this.openMosaicHandler.bind(this) } : null)
            const children =  (validMosiac || ifMosaicContentMissingDisplay === true) && childrenWithMosaicClick
            return (
                <Fragment>
                    {children}
                    <div style={openMosaic ? overlayStyle : null}  onClick={this.closeMosaicHandler.bind(this)}>
                    <div className={tileClass} style={openMosaic ? styleMosaicTilesOn : null}/>
                    </div>
                </Fragment>
            )
        }
    }

    return <MosaicTilesListener data={data} children={children}/>
})


class MosaicTiles extends React.Component{

     render(){
      return(<MosaicTilesListener store={!this.isWcpc && cpStore(this.props.wcpc)} {...this.props}/>)
    }
}

export { Mosaic , MosaicTiles}