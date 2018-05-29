import React from 'react';
import WideList from './WideList';
import GridList from './GridList';
import Carousel from './Carousel';
import { observer } from 'mobx-react';
import Store from '../../../store/ProductData';
import ResponsiveStore from '../../../store/ResponsiveStore';
import WcImg from '../WcResource/WcImg';
import openIcon from '../../resources/icons/svg/icon-icon-plus-regular.svg';
import closeIcon from '../../resources/icons/svg/icon-icon-minus-regular.svg';
import '../../style/productlisting.css';

const ProductListingObserver = observer(({ store: { data, changeDisplay, setType }, orderNumber, settings, id ,responsiveStore}) => {
    const content = data;
    let type = content.type;
    const isDisplay = content.isDisplay;
    const sizeResponsive = responsiveStore.wcContainerSize;
    if(((sizeResponsive === 'sm' || sizeResponsive === 'xs')) && type === 'wide')
        type = 'grid'
    const change = changeDisplay;
    const { isSubCategory } = settings;

    let imgButtonOpenClose = isDisplay ? closeIcon : openIcon;
    let buttonOpenClose =
                <button className="wcListHeaderButton"
                        onClick={change}>
                            <WcImg src={imgButtonOpenClose} alt="Open/Close Button"/>
                </button>
    let _isSubCategory = isSubCategory ? <h2 id={id}>{content.caption}{buttonOpenClose}</h2> : null
    
    if(settings.reporting===undefined){
        settings.reporting=true;
    }

  // Choosing the type of the listing ( currently between wide/grid/carousel)
  //console.log(content.products)
    switch (content.products.length > 0 && type) {
        case "wide":
            return <div>
                        <div className="wcListBackground">
                            {_isSubCategory}
                        </div>
                        {isDisplay && <WideList data={content.products}  reporting={settings.reporting} />}
                    </div>
        case "grid":
            return <div>
                        <div className="wcListBackground">
                            {_isSubCategory}
                        </div>
                        {isDisplay && <GridList data={content.products} caption={content.caption}  reporting={settings.reporting}/>}
                    </div>
        case "carousel":
            return  <div>
                        {isDisplay && <Carousel data={content} settings={settings} responsiveStore={ResponsiveStore}/>}
                    </div>
        default: return null
    }
});



class ProductListing extends React.Component {

    render() {
        const { ids, type = "wide", isSubCategory, vertical, carosulId, slidesToShow, infinite, responsive, responsiveWidth, carouselWidth, carouselHeight, productWidth, productHeight, ImageHeight, ImageWidth, reporting } = this.props;
        const settings = { ids, type, isSubCategory , vertical, carosulId, slidesToShow, infinite, responsive, responsiveWidth, carouselWidth, carouselHeight, productWidth, productHeight, ImageHeight, ImageWidth, reporting };

        return  <div>
                    {settings.ids.map((id, i) => <ProductListingObserver key={i} store={Store(id, type)} orderNumber={i} settings={settings} id={id} responsiveStore={ResponsiveStore}/>)}
                </div>
    }

}


export default ProductListing
