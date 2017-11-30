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
        this.state = {
            id                      :           (this.props.data_setting.id!=null                   ? this.props.data_setting.id                        : '00'     ),
            isVertical              :           (this.props.data_setting.vertical!=null             ? this.props.data_setting.vertical                  :  false   ),
            slidesToShow            :           (this.props.data_setting.slidesToShow!=null         ? this.props.data_setting.slidesToShow              :  1       ),
            infinite                :           (this.props.data_setting.infinite != null           ? this.props.data_setting.infinite                  :  true    ),
            responsive              :           (this.props.data_setting.responsive != null         ? this.props.data_setting.responsive                :  false   ),
            responsiveWidth         :           (this.props.data_setting.responsiveWidth            ? this.props.data_setting.responsiveWidth           :  600     ),
            carouselWidth           :           (this.props.data_setting.carouselWidth!=null        ? this.props.data_setting.carouselWidth             :  '100%'  ),
            productWidth            :           (this.props.data_setting.productWidth!=null         ? this.props.data_setting.productWidth              :  '100%'  ),
            productHeight           :           (this.props.data_setting.productHeight!=null        ? this.props.data_setting.productHeight             :  '100%'  ),
            productLink             :           (this.props.data_setting.productLink!=null          ? this.props.data_setting.productLink               :   false  ),
            //NOT TO EDIT - USES AS FLAGS
            latestSlide             :           0,
            windowHeight            :           window.innerHeight,
            windowWidth             :           window.innerWidth,
            productsListFlag        :           false           
        };       
    }

    componentWillMount(){
        api.getListOfVerifyWcpcs("12417832,637,30,632,1")
        .then(result => { 
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!',result)           
         productsList = VendorData.filter(list =>  result.includes(list.wcpc));
         console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! productsList',productsList)
          //console.log('productsList: '+productsList);
          this.setState({productsListFlag: true});  
          console.log('productsListFlag: '+this.state.productsListFlag);      
        }).catch(err => {console.log(err)})
    }

    componentDidMount() { 
        //NEEDED FOR THE VERTICAL lISTING - SO THEY CAN FULLY UPLODED
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 500);

        //For responsive
            //Enable responsive only on horizonal carusel
            if(this.state.responsive && this.state.isVertical){
                this.state.responsive = false;
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
       if(this.state.responsive === true){
           if(window.innerWidth >= this.state.responsiveWidth){
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
        var totalSlides = Number(productsList.length);
        var maxSlides = totalSlides-this.state.slidesToShow; 

        document.getElementById(this.state.id+('_wcca_arrows_next')).disabled = true;
        document.getElementById(this.state.id+('_wcca_arrows_previous')).disabled = true;

        if(e.target.dataset.id === 'previous' && this.state.latestSlide!==0)
        {
                document.getElementById(this.state.id+('_wcca_arrows_next')).className = 'wcNext wcCarouselArrowsBrowseVertical';
                document.getElementById(this.state.id+('_wcca_arrows_previous')).className = 'wcPrev wcCarouselArrowsBrowseVertical';

                this.slider.slickPrev();
                this.state.latestSlide = this.state.latestSlide - 1;

                if(this.state.latestSlide===0){
                    document.getElementById(this.state.id+('_wcca_arrows_previous')).className = 'wcPrev wcCarouselArrowsBrowseVertical wcDisabled';
                }
        }
        else if(e.target.dataset.id === 'next' && this.state.latestSlide!==maxSlides)
        {
            document.getElementById(this.state.id+('_wcca_arrows_next')).className = 'wcNext wcCarouselArrowsBrowseVertical';
            document.getElementById(this.state.id+('_wcca_arrows_previous')).className = 'wcPrev wcCarouselArrowsBrowseVertical';

            this.slider.slickNext();
            this.state.latestSlide = this.state.latestSlide  + 1;

            if(this.state.latestSlide===maxSlides){
                document.getElementById(this.state.id+('_wcca_arrows_next')).className = 'wcNext wcCarouselArrowsBrowseVertical wcDisabled';
            }
        }

         setTimeout(() => {
             document.getElementById(this.state.id+('_wcca_arrows_next')).disabled = false;
             document.getElementById(this.state.id+('_wcca_arrows_previous')).disabled = false;
         }, 500);

    }


    render() {

        const settings = {
            arrows: !this.state.isVertical,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            dots: false,
            infinite: this.state.infinite,
            speed: 500,
            slidesToShow: this.state.slidesToShow,
            slidesToScroll: 1,
            vertical: this.state.isVertical
          };
        

        var divStyle = {
            width: this.state.carouselWidth
        };


        var divStyleProduct = {
            width: this.state.productWidth,
            height: this.state.productHeight
        };
        return (
            <div>
                { this.state.productsListFlag &&
                <div>
                    
                    <div  style={divStyle} className={!this.state.isVertical ? 'wcCarouselWrap' : 'wcCarouselWrapVertical'}>
                        { this.state.isVertical &&
                            <div className="wcCarouselArrowsContainerVertical">
                                <button id={this.state.id+('_wcca_arrows_previous')} data-id='previous' onClick={this.sliderArrows} className={(!this.state.infinite ? ' wcDisabled ' :  ' ') + (' wcPrev wcCarouselArrowsBrowseVertical')}>
                                    <div className="wcLeft"></div>
                                </button> 
                            </div>                    
                        }                   
                        {
                            //  this.init.productsList.map((slide, index) => (
                            //  <div key={index} className={!this.state.isVertical ? 'wcCarouselSliderContainer' : 'wcCarouselSliderContainerVertical'}>
                            <div className={!this.state.isVertical ? 'wcCarouselSliderContainer' : 'wcCarouselSliderContainerVertical'}> 
                                     <Slider ref={ c => this.slider = c }{...settings} > 
                                        {
                                            // slide.products.map((product, index) => (
                                             productsList.map((product, index) => (
                                                <div key={index} className={this.props.data_setting.sliderClass+(' wcCarouselProductContainer')}>
                                                    <div style={divStyleProduct}  className={!this.state.isVertical ? 'wcCarouselProductBrowse' :'wcCarouselProductBrowseVertical'} >
                                                        <div className="wcCarouselProductImage">
                                                            <a href={product.link}>
                                                                <WcImg src={product.listImage} alt=""/>
                                                            </a>
                                                        </div>
                                                        { product.vendorProductName &&
                                                            <div className="wcCarouselProductTitle"><a href=''>{product.vendorProductName}</a></div>           
                                                        }
                                                        { (product.link && this.state.productLink) &&
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
                                <button id={this.state.id+('_wcca_arrows_next')} data-id='next' onClick={this.sliderArrows} className="wcNext wcCarouselArrowsBrowseVertical">
                                    <div className="wcRight"></div>
                                </button>
                            </div>
                        }                           
                    </div>
                </div>
                }            
            </div>
        )
    }
}