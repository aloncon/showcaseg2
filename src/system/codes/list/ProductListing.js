import React from 'react';
import WideList from './WideList';
import GridList from './GridList';
import Carousel from './Carousel';
import { observer } from 'mobx-react';
import Store from '../../../store/ProductData';
import ResponsiveStore from '../../../store/ResponsiveStore';
// import openIcon from '../../resources/icons/svg/icon-icon-plus-regular.svg';
// import closeIcon from '../../resources/icons/svg/icon-icon-minus-regular.svg';
import '../../style/productlisting.css';

const ProductListingObserver = observer(({ store: { data, changeDisplay, setType , nextPagenationIndex , previousPagenationIndex, setNumberProductInPage , NumberOfPages , setPaginationIndex , dropMenu , changeDropMenuStatus, amountOfProductsForShowMore, dispalyAmountOfProductsFromTotal,setMaxPagination}, orderNumber, settings, id , hideProductImages ,responsiveStore : { wcContainerSizeForFlexListing } }) => {
    const content = data;
    const numberOfPages = NumberOfPages;
    const showMore = amountOfProductsForShowMore
    let numberOfPagesElement = [];
    for(let i = 0 ; i < numberOfPages ; i ++){
        numberOfPagesElement.push(<a onClick={()=>setPaginationIndex(i)}>{i+1}</a>)
    }

    let type = content.type;
    const isDisplay = content.isDisplay;
    const typeBySizeResponsive = wcContainerSizeForFlexListing;

    if(type === 'flex' || type === undefined)
        type = typeBySizeResponsive;
    // const change = changeDisplay;
    const { isSubCategory } = settings;

    // let imgButtonOpenClose = isDisplay ? closeIcon : openIcon;
    let _isSubCategory = isSubCategory ? <h2 id={id}>{content.caption}</h2> : null
    // let pagination = <div className="wcPagination">
    //                         {numberOfPagesElement.length > 1 &&
    //                         <div>
    //                         <a onClick={previousPagenationIndex}>&laquo;</a>
    //                         { numberOfPagesElement }
    //                         <a onClick={nextPagenationIndex}>&raquo;</a>
    //                         </div>}
    //                             <button type="button"  onClick={changeDropMenuStatus} className="bt-btn bt-btn-outline-secondary bt-dropdown-toggle bt-dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //                             <span className="bt-sr-only">Toggle Dropdown</span>
    //                             </button>
    //                             {dropMenu &&
    //                             <div id="paginationDropMenu">
    //                                 <a  onClick={()=>setNumberProductInPage(9)}>9</a>
    //                                 <a  onClick={()=>setNumberProductInPage(12)}>12</a>
    //                                 <a  onClick={()=>setNumberProductInPage(24)}>24</a>
    //                             </div>}
    //                     </div>
    let amountOfProducts = <p style={{fontSize:"12px",marginTop:12.5,color:"#999999", maxWidth:"30%"}}>{dispalyAmountOfProductsFromTotal}</p>
    let showAllButton =    <button style={{color:"#0066CC",cursor:"pointer",boxShadow:"none",border:"none",backgroundColor:"transparent" , maxWidth:"30%"}}
                                   onClick={setMaxPagination}>
                                Show All {content.totalNumberOfProducts}
                            </button>
    let showMoreProducts=   <div style={{display: "flex",flexFlow: "row wrap",marginTop:15,maxWidth:"75%"}}>
                                                {amountOfProducts}
                                                {showMore > 0 &&
                                                <button style={{margin:"auto",cursor:"pointer",maxWidth:"30%",minPadding:"0 2.5%",borderRadius:"15px",fontSize:"80%"}}
                                                        onClick={nextPagenationIndex}
                                                        className="bt-btn bt-btn-outline-secondary bt-btn-sm">
                                                    Show {showMore} More
                                                </button>}
                                                {showMore > 0 && showAllButton}
                                                <div style={{width:"300px"}}/>
                                            </div>
    if(settings.reporting===undefined){
        settings.reporting=true;
    }
    hideProductImages = hideProductImages === true ? true : false;

    // Choosing the type of the listing ( currently between wide/grid/carousel/flex)
    // Default --> "flex"
    switch (content.products.length > 0 && type) {
        case "wide":
            return <div>
                        <div className="wcListBackground">
                            {_isSubCategory}
                        </div>
                        {isDisplay && <WideList data={content.products} hideProductImages={hideProductImages} reporting={settings.reporting} />}
                        {showMoreProducts}
                    </div>
        case "grid":
            return <div>
                        <div className="wcListBackground">
                            {_isSubCategory}
                            {amountOfProducts}
                        </div>
                        {isDisplay && <GridList data={content.products} caption={content.caption}  reporting={settings.reporting}/>}
                        {showMoreProducts}
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
        const { ids, type, isSubCategory, hideProductImages = false,vertical, carosulId, slidesToShow, infinite, responsive, responsiveWidth, carouselWidth, carouselHeight, productWidth, productHeight, ImageHeight, ImageWidth, reporting } = this.props;

        const settings = { ids, type, isSubCategory , vertical, carosulId, slidesToShow, infinite, responsive, responsiveWidth, carouselWidth, carouselHeight, productWidth, productHeight, ImageHeight, ImageWidth, reporting };

        return  <div>
                    {settings.ids.map((id, i) => <ProductListingObserver key={i} store={Store(id, type)} orderNumber={i} settings={settings} id={id} responsiveStore={ResponsiveStore} hideProductImages={hideProductImages}/>)}
                </div>
    }

}


export default ProductListing
