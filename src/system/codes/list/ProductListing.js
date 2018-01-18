import React from 'react'
import WideList from './WideList'
import GridList from './GridList'
import Carousel from './Carousel'
import { observer } from 'mobx-react'
import Store from '../../../store/ProductData'
import ChangeView from './ChangeView'
import ResponsiveStore from '../../../store/ResponsiveStore';
import WcImg from '../WcResource/WcImg'
import openIcon from '../../resources/icons/svg/icon-icon-plus-regular.svg'
import closeIcon from '../../resources/icons/svg/icon-icon-minus-regular.svg'

const ProductListingObserver = observer(({ store: { data, changeDisplay, setType }, orderNumber, settings, id }) => {
    const content = data,
        _type = content.type,
        _isDisplay = content.isDisplay,
        _length = content.productsLength

    const change = changeDisplay;
    const { isSubCategory, viewChange, vertical, carosulId, slidesToShow, infinite, responsive, responsiveWidth, carouselWidth, carouselHeight, productWidth, productHeight, ImageHeight, ImageWidth } = settings

    let imgButtonOpenClose = _isDisplay ? closeIcon : openIcon
    let _viewChangeHeader = viewChange ? <ChangeView type={_type} ids={[id]} callBack={setType} /> : null
    let buttonOepnClose = <button style={{ backgroundColor: "#F6F7F9", border: "none", float: "right", outline: "none", marginTop: "0.8%", marginRight: "1%" }}
        onClick={change}><WcImg src={imgButtonOpenClose} /></button>

    let _isSubCategory = isSubCategory ? <h2 id={id}>{content.caption}{buttonOepnClose}</h2> : null
    switch (content.products.length > 0 && _type) {
        case "wide":
            return <div>
                {_viewChangeHeader}
                <div style={{ background: "#F6F7F9" }}>
                    {_isSubCategory}
                </div>
                {_isDisplay && <WideList data={content.products} />}
            </div>
            break
        case "grid":
            return <div>
                {_viewChangeHeader}
                <div style={{ background: "#F6F7F9" }}>
                    {_isSubCategory}
                </div>
                {_isDisplay && <GridList data={content.products} />}
            </div>
            break
        case "carousel":
            return <div>
                {_isDisplay && <Carousel data={content} settings={settings} ResponsiveStore={ResponsiveStore} />}
            </div>
            break
        default: return null
    }
});

class ProductListing extends React.Component {

    render() {
        const { ids, type = "wide", isSubCategory, vertical, carosulId, slidesToShow, infinite, responsive, responsiveWidth, carouselWidth, carouselHeight, productWidth, productHeight, ImageHeight, ImageWidth } = this.props
        let { viewChange } = this.props
        viewChange = (viewChange == undefined) ? false : viewChange
        const settings = { ids, type, isSubCategory, viewChange, vertical, carosulId, slidesToShow, infinite, responsive, responsiveWidth, carouselWidth, carouselHeight, productWidth, productHeight, ImageHeight, ImageWidth }
        return <div>
            {settings.ids.map((id, i) => <ProductListingObserver key={i} store={Store(id, type)} orderNumber={i} settings={settings} id={id} />)}
        </div>
    }

}


export default ProductListing
