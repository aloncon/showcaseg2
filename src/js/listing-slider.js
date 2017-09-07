import React, { Component } from 'react';
import Slider from 'react-slick';

import WcResource from '../WcResource';
import WcpcContent from '../WcpcContent';


/*

            <div className="wc-products-carousel-wrap">
                {
                    this.props.data_slides.products.map((slide) => (
                        <div key={slide.title}>

                           <div className='slider-container'>
                                <div key={slide.title} className='wc-product-details-container'>
                                    <div className='wc-product'>
                                        <div className="wc-product-image">
                                            <a href="#">
                                                <WcResource><img src={slide.image}/></WcResource>
                                            </a>
                                        </div>
                                        <div className='wc-title'><a href="#" >{slide.title}</a></div>
                                    </div>
                                </div>
                            </div>


                            <br/>
                        </div>
                    ))
                }
            </div>
*/

function SamplePrevArrow(props) {
  const {className, style, onClick} = props
  return (
    <a className="prev browse left wc-browse-carousel  wc-browse-carousel-arrows" onClick={onClick}>
        <div className="left"></div>
    </a>
  );
}

function SampleNextArrow(props) {
  const {className, style, onClick} = props
  return (
    <a className="next browse right wc-browse-carousel wc-browse-carousel-arrows" onClick={onClick}><div className="right"></div></a>
  );
}

export default class WcListing extends Component {

    render() {
        const settings = {
            className: 'wc-carousel-scrollable',
            dots: false,
            infinite: true,
            pauseOnHover: false,
            slidesToShow: 3,
            slidesToScroll: 3,
            speed: 500,
            arrows: true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            autoplay: false
        };
        return (
            <div className="wc-products-carousel-wrap">
                {
                    this.props.data_slides.map((slide) => (
                           <div className='slider-container'>
                                <Slider ref={ c => this.slider = c }{...settings}>
                                    {
                                        slide.products.map((product) => (
                                            <div key={product.title} className='wc-product-details-container'>
                                                <div className='wc-product'>
                                                    <div className="wc-product-image">
                                                        <a href="#">
                                                            <WcResource><img src={product.image}/></WcResource>
                                                        </a>
                                                    </div>
                                                    <div className='wc-title'><a href="#" >{product.title}</a></div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </Slider>
                            <br/>
                        </div>
                    ))
                }
            </div>
        );
    }
}
