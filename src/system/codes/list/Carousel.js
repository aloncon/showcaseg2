import React, { Component } from 'react';
import Slider from 'react-slick';
import { WcImg } from '../WcResource';
import'../../style/carousel.css';
import api from '../../../store/Api';
import VendorData from '../../data/vendor-data.json'


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

export default class Wcca extends Component {
    constructor(props) {
        super(props)
        this.sliderArrows = this.sliderArrows.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.onImgLoad = this.onImgLoad.bind(this);
        this.settings = this.props.settings

        this.state = {
            carosulId               :           (this.props.settings.id!=null                ? this.props.settings.id               : '00'     ),
            isVertical              :           (this.props.settings.vertical!=null          ? this.props.settings.vertical         :  false   ),
            slidesToShow            :           (this.props.settings.slidesToShow!=null      ? this.props.settings.slidesToShow     :  1       ),
            infinite                :           (this.props.settings.infinite != null        ? this.props.settings.infinite         :  true    ),
            responsive              :           (this.props.settings.responsive != null      ? this.props.settings.responsive       :  false   ),
            responsiveWidth         :           (this.props.settings.responsiveWidth         ? this.props.settings.responsiveWidth  :  600     ),
            carouselWidth           :           (this.props.settings.carouselWidth!=null     ? this.props.settings.carouselWidth    :  '100%'  ),
            carouselHeight          :           (this.props.settings.carouselHeight!=null    ? this.props.settings.carouselHeight   :  '100px'  ),
            productHeight           :           (this.props.settings.productHeight!=null     ? this.props.settings.productHeight    :  '100%'  ),
            productWidth            :           (this.props.settings.productWidth!=null      ? this.props.settings.productWidth     :  '100%'  ),
            ImageHeight             :           (this.props.settings.ImageHeight!=null       ? this.props.settings.ImageHeight      :  '60px'  ),
            ImageWidth              :           (this.props.settings.ImageWidth!=null        ? this.props.settings.ImageWidth       :  '100%'  ),
            productLink             :           (this.props.productLink!=null                ? this.props.productLink               :   true  ),
            //NOT TO EDIT - USES AS FLAGS
            latestSlide             :           0,
            windowHeight            :           window.innerHeight,
            windowWidth             :           window.innerWidth,
            productsList            :           this.props.data,  
            maxImgHieght            :           null
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
            this.setState({
                maxImgHieght : this.state.productHeight
            });
            
            console.log('ImageWidth: '+this.state.ImageWidth)
            
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
        var totalSlides = Number(this.state.productsList.products.length);
        var maxSlides = totalSlides-this.state.slidesToShow; 

        document.getElementById(this.state.carosulId+('_wcca_arrows_next')).disabled = true;
        document.getElementById(this.state.carosulId+('_wcca_arrows_previous')).disabled = true;

        if(e.target.dataset.id === 'previous' && this.state.latestSlide!==0)
        {
                document.getElementById(this.state.carosulId+('_wcca_arrows_next')).className = 'wcNext wcCarouselArrowsBrowseVertical';
                document.getElementById(this.state.carosulId+('_wcca_arrows_previous')).className = 'wcPrev wcCarouselArrowsBrowseVertical';

                this.slider.slickPrev();
                this.state.latestSlide = this.state.latestSlide - 1;

                if(this.state.latestSlide===0){
                    document.getElementById(this.state.carosulId+('_wcca_arrows_previous')).className = 'wcPrev wcCarouselArrowsBrowseVertical wcDisabled';
                }
        }
        else if(e.target.dataset.id === 'next' && this.state.latestSlide!==maxSlides)
        {
            document.getElementById(this.state.carosulId+('_wcca_arrows_next')).className = 'wcNext wcCarouselArrowsBrowseVertical';
            document.getElementById(this.state.carosulId+('_wcca_arrows_previous')).className = 'wcPrev wcCarouselArrowsBrowseVertical';

            this.slider.slickNext();
            this.state.latestSlide = this.state.latestSlide  + 1;

            if(this.state.latestSlide===maxSlides){
                document.getElementById(this.state.carosulId+('_wcca_arrows_next')).className = 'wcNext wcCarouselArrowsBrowseVertical wcDisabled';
            }
        }

         setTimeout(() => {
             document.getElementById(this.state.carosulId+('_wcca_arrows_next')).disabled = false;
             document.getElementById(this.state.carosulId+('_wcca_arrows_previous')).disabled = false;
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
            infinite: this.state.infinite,
            speed: 500,
            slidesToShow: this.state.slidesToShow,
            slidesToScroll: 1,
            vertical: this.state.isVertical
          };

          var divStyle = {
            width: this.state.carouselWidth,
            height: this.state.carouselHeight,
            display:'block',
            //border:'1px solid blue'
        };

       
        return (
            <div>
                <div className="WcCarousel"  style={divStyle} >                  
                    <div className={!this.state.isVertical ? 'wcCarouselWrap' : 'wcCarouselWrapVertical'}>
                        { this.state.isVertical &&
                            <div className="wcCarouselArrowsContainerVertical">
                                <button id={this.state.carosulId+('_wcca_arrows_previous')} data-id='previous' onClick={this.sliderArrows} className={(!this.state.infinite ? ' wcDisabled ' :  ' ') + (' wcPrev wcCarouselArrowsBrowseVertical')}>
                                    <div className="wcLeft"></div>
                                </button> 
                            </div>                    
                        }                   
                        {
                           <div className={!this.state.isVertical ? 'wcCarouselSliderContainer' : 'wcCarouselSliderContainerVertical'}> 
                                     <Slider ref={ c => this.slider = c }{...settings} > 
                                        {
                                             this.state.productsList.products.map((product, index) => (
                                                <div key={index}  style={{width:'95%'}}>
                                                    
                                                    <div className={!this.state.isVertical ? 'wcCarouselProductBrowse' :'wcCarouselProductBrowseVertical'} style={{height:this.state.productHeight ,width:this.state.productWidth}} >
                                                        <div className="wcCarouselProductImage" style={!this.state.isVertical ? {height:this.state.ImageHeight ,width:this.state.ImageWidth ,display:'block',position: 'relative'} : {height:this.state.ImageHeight ,width:this.state.ImageWidth}}>
                                                            <a href={product.link}>
                                                               {/* <WcImg src={"/static"+product.listImage} alt="" style={!this.state.isVertical ? {maxWidth:'100%', maxHeight:'100%',position: 'absolute', bottom: 0}: {}} /> */}
                                                               <WcImg src={"/static"+product.listImage} alt="" style={!this.state.isVertical ? {maxWidth:'100%', maxHeight:'100%', bottom: 0}: {}} />
                                                            </a>
                                                        </div>
                                                        { product.vendorProductName &&
                                                            <div className="wcCarouselProductTitle"><a href=''>{product.vendorProductName}</a></div>           
                                                        }
                                                        { (product.link && this.state.productLink) &&
                                                            <div><a href=''>Take a Tour</a></div>           
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
                                <button id={this.state.carosulId+('_wcca_arrows_next')} data-id='next' onClick={this.sliderArrows} className="wcNext wcCarouselArrowsBrowseVertical">
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