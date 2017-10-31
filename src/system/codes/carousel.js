import React, { Component } from 'react';
import Slider from 'react-slick';
import WcResource from './WcResource';
import'../style/carousel.css';


//arrows for horizonal carousel
function SamplePrevArrow(props) {
  const {onClick,className} = props
  return (
    <div className='wcca_arrows_container_horizonal'>
        <a className="prev browse left wcca_arrows_browse" onClick={onClick}><div className={className + ( " left")}><span className="wcca_arrows_browse_horizonal">{'<'}</span></div></a>
     </div>
  );
}

function SampleNextArrow(props) {
  const {onClick,className} = props
  return (
      <div className='wcca_arrows_container_horizonal'>
          <a className=' next browse right wcca_arrows_browse' onClick={onClick}><div className={className + ( " right")}><span className="wcca_arrows_browse_horizonal">{'>'}</span></div></a>
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
        };       
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
        var totalSlides = Number(this.props.data_slides[0].products.length);
        var maxSlides = totalSlides-this.state.slidesToShow; 

        document.getElementById(this.state.id+('_wcca_arrows_next')).disabled = true;
        document.getElementById(this.state.id+('_wcca_arrows_previous')).disabled = true;

        if(e.target.dataset.id === 'previous' && this.state.latestSlide!==0)
        {
                document.getElementById(this.state.id+('_wcca_arrows_next')).className = 'next wcca_arrows_browse_vertical';
                document.getElementById(this.state.id+('_wcca_arrows_previous')).className = 'prev wcca_arrows_browse_vertical';   
                
                this.slider.slickPrev();
                this.state.latestSlide = this.state.latestSlide - 1;

                if(this.state.latestSlide===0){
                    document.getElementById(this.state.id+('_wcca_arrows_previous')).className = 'prev wcca_arrows_browse_vertical disabled';
                }
        }
        else if(e.target.dataset.id === 'next' && this.state.latestSlide!==maxSlides)
        {
            document.getElementById(this.state.id+('_wcca_arrows_next')).className = 'next wcca_arrows_browse_vertical';
            document.getElementById(this.state.id+('_wcca_arrows_previous')).className = 'prev wcca_arrows_browse_vertical';
            
            this.slider.slickNext();
            this.state.latestSlide = this.state.latestSlide  + 1;
            
            if(this.state.latestSlide===maxSlides){
                document.getElementById(this.state.id+('_wcca_arrows_next')).className = 'next wcca_arrows_browse_vertical disabled'; 
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
                <div  style={divStyle} className={!this.state.isVertical ? 'wcca_wrap' : 'wcca_wrap_vertical'}>
                    { this.state.isVertical &&
                        <div className='wcca_arrows_container_vertical'>
                            <button id={this.state.id+('_wcca_arrows_previous')} data-id='previous' onClick={this.sliderArrows} className={(!this.state.infinite ? 'disabled ' :  ' ') + (' prev wcca_arrows_browse_vertical')}>
                                <div className="left"></div>
                            </button> 
                        </div>                    
                    }                   
                    {
                        this.props.data_slides.map((slide, index) => (
                           <div key={index} className={!this.state.isVertical ? 'wcca_slider_container' : 'wcca_slider_container_vertical'}>
                                <Slider ref={ c => this.slider = c }{...settings} >
                                    {
                                        slide.products.map((product, index) => (
                                            <div key={index} className={this.props.data_setting.sliderClass+(' wcca_product_container')}>
                                                <div style={divStyleProduct}  className={!this.state.isVertical ? 'wcca_product_browse' :'wcca_product_browse_vertical'} >
                                                    <div className="wcca_product_image">
                                                        <a href={product.link}>
                                                            <WcResource><img src={product.image} alt=""/></WcResource>
                                                        </a>
                                                    </div>
                                                    { product.title &&
                                                        <div className="wcca_product_title"><a href={product.link}>{product.title}</a></div>           
                                                    }
                                                    { (product.link && this.state.productLink) &&
                                                        <div className="wcca_product_link"><WcResource><a href={product.link}>Take a Tour</a></WcResource></div>           
                                                    }                                                   
                                                </div>
                                            </div>
                                        ))
                                    }
                                </Slider>
                           </div>
                    ))
                    }
                    { this.state.isVertical &&
                        <div className='wcca_arrows_container_vertical'>
                            <button id={this.state.id+('_wcca_arrows_next')} data-id='next' onClick={this.sliderArrows} className='next wcca_arrows_browse_vertical'>
                                <div className="right"></div>
                            </button>
                        </div>
                    }                           
                </div>
            </div>
        )
    }
}