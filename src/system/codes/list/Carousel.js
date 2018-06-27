import React, { Component } from 'react';
import Slider from 'react-slick';
import { observer } from 'mobx-react';
import {WcReports} from '../WcEvents';
import { WcImg, WcPlaceHolderImage } from '../WcResource';
import'../../style/carousel.css';
import ActionLink from '../ActionLink';


const placeholderPic = require('../../resources/placeholder_small.png')

//arrows for horizonal carousel
function SamplePrevArrow(props) {
  const {onClick,className} = props
  return (
    <div className="wcCarouselArrowsContainerHorizonal">
        <a className="wcPrev wcBrowse wcLeft wcCarouselArrowsBrowse" onClick={onClick}><div className={className + ( " wcLeft")}><span className="wcCarouselArrowsBrowseHorizonal">{'<'}</span></div></a>
     </div>
  );
}

function SampleNextArrow(props) {
  const {onClick,className} = props
  return (
      <div className="wcCarouselArrowsContainerHorizonal">
          <a className="wcNext wcBrowse wcRight wcCarouselArrowsBrowse" onClick={onClick}><div className={className + ( " wcRight")}><span className="wcCarouselArrowsBrowseHorizonal">{'>'}</span></div></a>
      </div>
  );
}
//TODO: the user needs to give an height to the carousel

const Wcca = observer (class extends Component {
    constructor(props) {
        super(props)
        this.sliderArrows = this.sliderArrows.bind(this);
        //this.handleResize = this.handleResize.bind(this);
        this.onImgLoad = this.onImgLoad.bind(this);
        this.s = this.props.settings;
        this.init = {
            slidesToShow            :           (this.s.slidesToShow!=null      ? this.s.slidesToShow     :  4       ),
            slidesToShowDefault     :           (this.s.slidesToShow!=null      ? this.s.slidesToShow     :  4       ),
            reporting               :           (this.s.reporting!=null         ? this.s.reporting        :  true    )
        }
        this.state = {
            carosulId               :           (this.s.carosulId!=null                 ? this.s.carosulId        : '00'     ),
            isVertical              :           (this.s.vertical!=null                  ? this.s.vertical         :  false   ),
            infinite                :           (this.s.infinite != null                ? this.s.infinite         :  true    ),
            carouselWidth           :           (this.s.carouselWidth!=null             ? this.s.carouselWidth    :  '100%'  ),
            carouselHeight          :           (this.s.carouselHeight!=null            ? this.s.carouselHeight   :  'auto'  ),
            productHeight           :           (this.s.productHeight!=null             ? this.s.productHeight    :  'auto'  ),
            productHeightVertical   :           (this.s.productHeightVertical!=null     ? this.s.productHeightVertical    :  '300px' ),
            productWidth            :           (this.s.productWidth!=null              ? this.s.productWidth     :  '160px'  ),
            ImageHeight             :           (this.s.ImageHeight!=null               ? this.s.ImageHeight      :  '160px'  ),
            ImageWidth              :           (this.s.ImageWidth!=null                ? this.s.ImageWidth       :  '160px'  ),
            productLink             :           (this.props.productLink!=null           ? this.props.productLink  :   true    ),
            //NOT TO EDIT - USES AS FLAGS
            latestSlide             :           0,
            productsList            :           this.props.data,
            maxImgHieght            :           null,
            showArrowsV             :           true,
            showArrowsH             :           true
        };
    }

    componentDidMount() {
        let {isVertical , productHeight , productWidth , productsList , } = this.state
        let {slidesToShowDefault} = this.init
        this.setState({
            maxImgHieght : productHeight
        });

        if(isVertical){
            this.setState({
                carouselWidth : productWidth
            });
        }

        if(Number(productsList.products.length) <= Number(slidesToShowDefault)){
            this.setState({
                infinite : false,
                showArrowsV : false,
            });

            if(!isVertical){
                this.setState({
                    showArrowsH : false,
                });
            }
        }



    }

    sliderArrows(e) {
    //control the arrows buttons of the slider (preview/next)
        const {carosulId , infinite, productsList, slidesToShow} = this.state
        let {latestSlide} = this.state

        var totalSlides = Number(productsList.products.length);
        var maxSlides = totalSlides-slidesToShow;



        document.getElementById(carosulId+('_wcca_arrows_next')).disabled = true;
        document.getElementById(carosulId+('_wcca_arrows_previous')).disabled = true;

        if(e.target.dataset.id === 'previous' && latestSlide!==0)
        {
                document.getElementById(carosulId+('_wcca_arrows_next')).className = 'wcNext wcCarouselArrowsBrowseVertical';
                document.getElementById(carosulId+('_wcca_arrows_previous')).className = 'wcPrev wcCarouselArrowsBrowseVertical';

                this.slider.slickPrev();
                latestSlide = latestSlide - 1;

                if(latestSlide===0 && ! infinite){
                    document.getElementById(carosulId+('_wcca_arrows_previous')).className = 'wcPrev wcCarouselArrowsBrowseVertical wcDisabled';
                }
        }
        else if(e.target.dataset.id === 'next' && latestSlide!==maxSlides)
        {
            document.getElementById(carosulId+('_wcca_arrows_next')).className = 'wcNext wcCarouselArrowsBrowseVertical';
            document.getElementById(carosulId+('_wcca_arrows_previous')).className = 'wcPrev wcCarouselArrowsBrowseVertical';

            this.slider.slickNext();
            latestSlide = latestSlide  + 1;

            if(latestSlide===maxSlides && !infinite){
                document.getElementById(carosulId+('_wcca_arrows_next')).className = 'wcNext wcCarouselArrowsBrowseVertical wcDisabled';
            }
        }else if (e.target.dataset.id === 'previous' && infinite){
            this.slider.slickPrev();
        }else if (e.target.dataset.id === 'next' && infinite){
            this.slider.slickNext();
        }

         setTimeout(() => {
             document.getElementById(carosulId+('_wcca_arrows_next')).disabled = false;
             document.getElementById(carosulId+('_wcca_arrows_previous')).disabled = false;
         }, 500);

    }

    onImgLoad = ({target:img}) =>{
        let imgHeight = this.state.maxImgHieght;
        if(imgHeight == null || imgHeight < img.height || img.height*0.85 <= this.state.productHeight)
        {
            imgHeight = img.height;
            this.setState({ maxImgHieght : imgHeight });
        }
    }

    handleResize(size) {
        if(size === 'xs'){
            this.init.slidesToShow = 1;
        }else if(size === 'sm'){
            this.init.slidesToShow = 2;
        }else if(size === 'md'){
            this.init.slidesToShow = 3;
        }else{
            this.init.slidesToShow = this.init.slidesToShowDefault;
        }
    }
    render() {
        const {responsiveStore} = this.props
        this.handleResize(responsiveStore.wcContainerSize);

        const {carosulId, isVertical, productsList, infinite, showArrowsV , showArrowsH, carouselWidth, carouselHeight, productWidth, productHeightVertical, ImageWidth, ImageHeight} = this.state
        const {slidesToShow ,reporting} = this.init

        const settings = {
            arrows: showArrowsH,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            dots: false,
            infinite: infinite,
            speed: 500,
            slidesToShow: slidesToShow,
            slidesToScroll: 1,
            vertical: isVertical,
            swipe:          false,
            touchMove:      false,
            swipeToSlide:   false
            };
        var divStyle = {
            width: carouselWidth,
            height: carouselHeight,
            display:'block'
        };

        return (
            <div>
                <div className="WcCarousel"  style={divStyle} >
                    <div className={!isVertical ? 'wcCarouselWrap' : 'wcCarouselWrapVertical'}>
                        { (isVertical && showArrowsV) &&
                            <div className="wcCarouselArrowsContainerVertical wcCarouselArrowsContainerVerticalTop">
                                <button id={carosulId+('_wcca_arrows_previous')} data-id='previous' onClick={this.sliderArrows} className={(!infinite ? ' wcDisabled ' :  ' ') + (' wcPrev wcCarouselArrowsBrowseVertical')}>
                                    <div className="wcLeft"></div>
                                </button>
                            </div>
                        }
                        { (productsList.products) &&
                           <div className={!isVertical ? 'wcCarouselSliderContainer' : 'wcCarouselSliderContainerVertical'}>
                                     <Slider ref={ c => this.slider = c }{...settings} >
                                        {
                                             productsList.products.map((product, index) => (
                                                <div key={index}  style={{width:'100%'}}>

                                                    <div className={!isVertical ? 'wcCarouselProductBrowse' :'wcCarouselProductBrowseVertical'} style={isVertical ? {height: productHeightVertical ,width:productWidth} : {width:productWidth}} >
                                                        <div className="wcCarouselProductImage" style={!isVertical ? {height:ImageHeight ,width:ImageWidth ,display:'block',position: 'relative'} : {height:ImageHeight ,width:ImageWidth}}>
                                                            <a href={product.link}>
                                                            {product.listImage ? (
                                                                <WcImg src={`/static${product.listImage}`} alt={product.vendorProductName} style={!isVertical ? {maxWidth:'100%', maxHeight:'100%', bottom: 0}: {}} />
                                                            ) : (
                                                                <WcPlaceHolderImage  alt={product.vendorProductName} style={!isVertical ? {maxWidth:'100%', maxHeight:'100%', bottom: 0}: {}} />
                                                            )
                                                            }
                                                            </a>
                                                        </div>
                                                        { (product.cpi !== 0) &&
                                                            <div style={{ width: "100%",height: "20px",marginTop: '-10px'}} className="">
                                                                <div className="wcMosaic" data-cpi={product.cpi} animation="true"/>
                                                            </div>

                                                         }
                                                        {reporting &&
                                                            WcReports("product-listing-carousel-view",product.wcpc)
                                                        }
                                                        { product.vendorProductName &&
                                                        <div className="wcCarouselProductTitle"  onClick={() => WcReports("product-listing-carousel-click",product.wcpc)}>
                                                            {/* <br/> */}
                                                            <ActionLink wcpc={product.wcpc} type="p2b"  title={product.vendorProductName} unlink={true}>
                                                            {/* <ActionLink wcpc={product.wcpc} type="p2b"  title={product.vendorProductName} onClick={() => WcReports("p2b",product.wcpc)}> */}
                                                            {/* <ActionLink wcpc={product.wcpc} type="p2b"  title={product.vendorProductName} onClick={WcReports("p2b",product.wcpc)}> */}
                                                                {Number(product.vendorProductName.length) > 80 ? product.vendorProductName.trim().substring(0, 80).concat('...') : product.vendorProductName}
                                                            </ActionLink>
                                                        </div>
                                                        }
                                                         {/* <div className="wcMosaic" data-cpi={53028274}/> */}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                     </Slider>
                            </div>
                        //  ))
                        }
                        { (isVertical && showArrowsV) &&
                            <div className="wcCarouselArrowsContainerVertical wcCarouselArrowsContainerVerticalBottom">
                                <button id={carosulId+('_wcca_arrows_next')} data-id='next' onClick={this.sliderArrows} className="wcNext wcCarouselArrowsBrowseVertical">
                                    <div className="wcRight"></div>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
})

export default Wcca;