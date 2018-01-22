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

import '../../style/productlisting.css'

const ProductListingObserver = observer(({ store: { data, changeDisplay, setType }, orderNumber, settings, id }) => {
    const content = data,
        _type = content.type,
        _isDisplay = content.isDisplay,
        _length = content.productsLength

    const change = changeDisplay
    const { isSubCategory, vertical, carosulId, slidesToShow, infinite, responsive, responsiveWidth, carouselWidth, carouselHeight, productWidth, productHeight, ImageHeight, ImageWidth } = settings

    let imgButtonOpenClose = _isDisplay ? closeIcon : openIcon
    let buttonOepnClose = 
                <button className="wcListHeaderButton"
                        onClick={change}>
                            <WcImg src={imgButtonOpenClose} />
                </button>
    let _isSubCategory = isSubCategory ? <h2 id={id}>{content.caption}{buttonOepnClose}</h2> : null

  // Choosing the type of the listing ( currently between wide/grid/carousel)
    switch (content.products.length > 0 && _type) {
        case "wide":
            return <div>
                        <div className="wcListBackground">
                            {_isSubCategory}
                        </div>
                        {_isDisplay && <WideList data={content.products} />}
                    </div>
            break
        case "grid":
            return <div>
                        <div className="wcListBackground">
                            {_isSubCategory}
                        </div>
                        {_isDisplay && <GridList data={content.products} caption={content.caption}/>}
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
    
        const settings = { ids, type, isSubCategory , vertical, carosulId, slidesToShow, infinite, responsive, responsiveWidth, carouselWidth, carouselHeight, productWidth, productHeight, ImageHeight, ImageWidth }
        return  <div>
                    {settings.ids.map((id, i) => <ProductListingObserver key={i} store={Store(id, type)} orderNumber={i} settings={settings} id={id} />)}
                </div>
    }

}


export default ProductListing
