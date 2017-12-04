import React, { Component } from 'react';
import Slider from 'react-slick';
import { WcImg } from './WcResource';
import'../style/carousel.css';
import api from '../../store/Api';
import VendorData from '../data/vendor-data.json'


let productsList;

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


export default class Wcca extends Component {
    constructor(props) {
        super(props)
        this.sliderArrows = this.sliderArrows.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.init = {
            carosulId               :   (this.props.carosulId        !=null     ?   this.props.carosulId        :   '00'),
            slidesToShow            :   (this.props.slidesToShow     !=null     ?   this.props.slidesToShow     :   1),
            infinite                :   (this.props.infinite         !=null     ?   this.props.infinite         :   false),
            responsive              :   (this.props.responsive       !=null     ?   this.props.responsive       :   false),
            responsiveWidth         :   (this.props.responsiveWidth  !=null     ?   this.props.responsiveWidth  :   540),
            carouselWidth           :   (this.props.carouselWidth    !=null     ?   this.props.carouselWidth    :   '100%'),
            carouselHeight          :   (this.props.carouselHeight   !=null     ?   this.props.carouselHeight   :   '300px'),
            productWidth            :   (this.props.productWidth     !=null     ?   this.props.productWidth     :   '200px'),
            productHeight           :   (this.props.productHeight    !=null     ?   this.props.productHeight    :   '300px'),
            productTour             :   (this.props.productTour      !=null     ?   this.props.productTour      :   false)

        }
        this.state = {
            isVertical              :   (this.props.vertical         !=null     ?   this.props.vertical         :   false),            
            // //NOT TO EDIT - USES AS FLAGS
            latestSlide             :           0,
            windowHeight            :           window.innerHeight,
            windowWidth             :           window.innerWidth,
            productsList            :           this.props.data[0].productsData,
            maxImgHieght             :           null  
        };       
    }


    componentDidMount() { 
        //NEEDED FOR THE VERTICAL lISTING - SO THEY CAN FULLY UPLODED        
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 500);

        //For responsive
            //Enable responsive only on horizonal carusel
            if(this.init.responsive && this.state.isVertical){
                this.init.responsive = false;
                //this.setState({
                //    responsive : false
                //});
            }
            //Detect resize and if requested change from horizonal to vertical carusel
            this.handleResize();
            window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        //For responsive - Detect resize and if requested change from Horizonal to Vertical carusel
            this.handleResize();
            window.removeEventListener('resize', this.handleResize);
    }

    //For responsive - Detect resize and if requested change from Horizonal to Vertical carusel
    handleResize(e) {
        this.setState({
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
        });
       if(this.init.responsive === true){
           if(window.innerWidth >= this.init.responsiveWidth){
               this.setState({
                   isVertical : false
               });
           }else{
            this.setState({
                isVertical : true
            });
           }
       }
   }


    sliderArrows(e) {
    //control the arrows buttons of the slider (preview/next)
        // var totalSlides = Number(this.props.data_slides[0].products.length);
        var totalSlides = Number(this.state.productsList.length);
        var maxSlides = totalSlides-this.init.slidesToShow; 

        document.getElementById(this.init.carosulId+('_wcca_arrows_next')).disabled = true;
        document.getElementById(this.init.carosulId+('_wcca_arrows_previous')).disabled = true;

        if(e.target.dataset.id === 'previous' && this.state.latestSlide!==0)
        {
                document.getElementById(this.init.carosulId+('_wcca_arrows_next')).className = 'wcNext wcCarouselArrowsBrowseVertical';
                document.getElementById(this.init.carosulId+('_wcca_arrows_previous')).className = 'wcPrev wcCarouselArrowsBrowseVertical';

                this.slider.slickPrev();
                this.state.latestSlide = this.state.latestSlide - 1;

                if(this.state.latestSlide===0){
                    document.getElementById(this.init.carosulId+('_wcca_arrows_previous')).className = 'wcPrev wcCarouselArrowsBrowseVertical wcDisabled';
                }
        }
        else if(e.target.dataset.id === 'next' && this.state.latestSlide!==maxSlides)
        {
            document.getElementById(this.init.carosulId+('_wcca_arrows_next')).className = 'wcNext wcCarouselArrowsBrowseVertical';
            document.getElementById(this.init.carosulId+('_wcca_arrows_previous')).className = 'wcPrev wcCarouselArrowsBrowseVertical';

            this.slider.slickNext();
            this.state.latestSlide = this.state.latestSlide  + 1;

            if(this.state.latestSlide===maxSlides){
                document.getElementById(this.init.carosulId+('_wcca_arrows_next')).className = 'wcNext wcCarouselArrowsBrowseVertical wcDisabled';
            }
        }

         setTimeout(() => {
             document.getElementById(this.init.carosulId+('_wcca_arrows_next')).disabled = false;
             document.getElementById(this.init.carosulId+('_wcca_arrows_previous')).disabled = false;
         }, 500);

    }

    onImgLoad = ({target:img}) =>{
        // console.log(img.height);
        let imgHeight = this.state.maxImgHieght;
        if(imgHeight == null || imgHeight < img.height || img.height*0.85 <= this.state.productHeight)
        {
            imgHeight = img.height;
            this.setState({ maxImgHieght : imgHeight });   
        }
    } 

    render() {

        const settings = {
            arrows: !this.state.isVertical,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            dots: false,
            infinite: this.init.infinite,
            speed: 500,
            slidesToShow: this.init.slidesToShow,
            slidesToScroll: 1,
            vertical: this.state.isVertical
          };
        

        var divStyle = {
            width: this.init.carouselWidth,
            height: this.init.carouselHeight,
            display:'block'
        };


        var divStyleProduct = {
            width: this.init.productWidth,
            height: this.init.productHeight
        };

        let maxImgHieght = { height : this.state.maxImgHieght } 

        return (
            <div>
                <div>                   
                    <div className={!this.state.isVertical ? 'wcCarouselWrap' : 'wcCarouselWrapVertical'}>
                        { this.state.isVertical &&
                            <div className="wcCarouselArrowsContainerVertical">
                                <button id={this.init.carosulId+('_wcca_arrows_previous')} data-id='previous' onClick={this.sliderArrows} className={(!this.init.infinite ? ' wcDisabled ' :  ' ') + (' wcPrev wcCarouselArrowsBrowseVertical')}>
                                    <div className="wcLeft"></div>
                                </button> 
                            </div>                    
                        }                   
                        {
                            //  this.init.productsList.map((slide, index) => (
                            //  <div key={index} className={!this.init.isVertical ? 'wcCarouselSliderContainer' : 'wcCarouselSliderContainerVertical'}>
                            <div  style={divStyle} className={!this.state.isVertical ? 'wcCarouselSliderContainer' : 'wcCarouselSliderContainerVertical'}> 
                                     <Slider ref={ c => this.slider = c }{...settings} > 
                                        {
                                            // slide.products.map((product, index) => (
                                                this.state.productsList.map((product, index) => (
                                                // <div key={index} className={this.props.data_setting.sliderClass+(' wcCarouselProductContainer')}>
                                                <div key={index}>
                                                    <div style={divStyleProduct}  className={!this.state.isVertical ? 'wcCarouselProductBrowse' :'wcCarouselProductBrowseVertical'} >
                                                        <div className="wcCarouselProductImage" style={maxImgHieght}>
                                                            <a href={product.link}>
                                                                <WcImg src={product.listImage} alt=""  onLoad={this.onImgLoad}/>
                                                            </a>
                                                        </div>
                                                        { product.vendorProductName &&
                                                            <div className="wcCarouselProductTitle"><a href=''>{product.vendorProductName}</a></div>           
                                                        }
                                                        { (product.link && this.init.productTour) &&
                                                            <div className="wcCarouselProductLink"><a href=''>Take a Tour</a></div>           
                                                        }                                                   
                                                    </div>
                                                </div>
                                            ))
                                        }
                                     </Slider> 
                            </div>
                        //  ))
                        }
                        { this.state.isVertical &&
                            <div className="wcCarouselArrowsContainerVertical">
                                <button id={this.init.carosulId+('_wcca_arrows_next')} data-id='next' onClick={this.sliderArrows} className="wcNext wcCarouselArrowsBrowseVertical">
                                    <div className="wcRight"></div>
                                </button>
                            </div>
                        }                           
                    </div>
                </div>          
            </div>
        )
    }
}