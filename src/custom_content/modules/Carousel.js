import React, { Component } from 'react'
import Carousel from '../../system/codes/carousel.js';


const WcCarousel_Slides = [{
    "products" :     [
                      {
                          "title" : "Cooktops",
                          "image" : "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/_wc/assets/Cooktops.png",
                          "link"  : "http://www.test.electroluxus.webcollage.net/server/allassortment/electroluxus-showcase/si?ws-action=http%253A%252F%252Fwww.test.electroluxus.webcollage.net%252Fproduct-link.do%253Fwcpc%253Dei24id50qs%2526channel-product-id%253Dcpi-ei24id50qs-electroluxus%2526dollarvalue%253D%2526page-hash%253D-1513347744%2526partner-id%253Dallassortment%2526is-in-showcase%253Dtrue%2526is-in-standalone%253Dfalse"
                      },
                      {
                          "title" : "Wall Ovens",
                          "image" : "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/_wc/assets/WallOvens.png"
                      },
                      {
                          "title" : "Rangers",
                          "image" : "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/_wc/assets/Ranges.png"
                      },
                      {
                          "title" : "Refrigirators",
                          "image" : "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/_wc/assets/Refrigirators.png"
                      },
                      {
                          "title" : "Dishwashers",
                          "image" : "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/_wc/assets/Dishwashers.png"
                      },
                      {
                          "title" : "Washers",
                          "image" : "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/_wc/assets/Washers.png"
                      },
                      {
                          "title" : "Dryers",
                          "image" : "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/_wc/assets/Dryers.png"
                      },
                      {
                          "title" : "Microwaves",
                          "image" : "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/_wc/assets/Microwaves_HP_93x115.png"
                      }
                     ]
}];

const WcCarousel_Slides1 = [{
    "products" :     [
                      {
                          "title" : "Bose® SoundTouch® Wireless Link adapter",
                          "image" : "http://media-itest2.webcollage.net/rlfp/wc/test/module/bose/_wc/product-images/147265756710675px.jpg"
                      },
                      {
                          "title" : "Bose SoundTouch 300 soundbar",
                          "image" : "http://media-itest2.webcollage.net/rlfp/wc/test/module/bose/_wc/product-images/147265765103475px.jpg"
                      },
                      {
                          "title" : "Bose Lifestyle 650 home entertainment system",
                          "image" : "http://media-itest2.webcollage.net/rlfp/wc/test/module/bose/_wc/product-images/147265762156575px.jpg"
                      },
                      {
                          "title" : "Bose Lifestyle 600 home entertainment system",
                          "image" : "http://media-itest2.webcollage.net/rlfp/wc/test/module/bose/_wc/product-images/147265759311175px.jpg"
                      }
                     ]
}];



//********Carousel Settings  CHANGE ONLY BY REQUEST!! ****************//
const WcCarousel_Setting = {
    id                      :      '00',                //  Give the carousel unique ID                                                                                     (String - '00' as Default) 
    vertical                :       false,              //  Is the carousel vertical?                                                                                       (Boolean - false as Default)
    slidesToShow            :       3,                  //  Number of slides to be visible at a time                                                                        (Integer - 1 as Default)
    infinite                :       false,               //  Should the gallery wrap around it's contents                                                                    (Boolean - true as Default)
    sliderClass             :       'wc_carousel_1',    //  Give the carousel an internal class to control the design                                                       (String - '' as Default)
    responsive              :       true,               //  Is the carousel responsive (if the carousel is horizonal , it can be turned to vetical at a specific width)     (Boolean - false as Default)
    responsiveWidth         :       0,                  //  If the carousel is responsive , from witch width to transfer it to vertical                                     (Integer - 600 as Default)                   
    carouselWidth           :       '100%',             //  Give the carousel a width (px/presnteges...)                                                                    (String - '100%' fullscreen as Default)   
    //IF NOT NEEDED LEAVE AS 100%:
    productWidth            :       '200px',             //  IF NEEDED - give the carousel inside boxes width  (px/presnteges...)                                            (String - as Default) 
    productHeight           :       '120px',             //  IF NEEDED - give the carousel inside boxes height (px/presnteges...)                                            (String - as Default) 
    productLink             :        false,             //  IF NEEDED - Show 'Take a tour'?                                                                                 (Boolean - false as Default)'
}

const WcCarousel_Setting2 = {
    id                      :      '01',
    vertical                :       true,
    slidesToShow            :       2,
    infinite                :       false,
    sliderClass             :       'wcCarousel2',
    carouselWidth           :       '200px',
    productWidth            :       '200px',
    productHeight           :       '250px',
    responsive              :       true
}


class Wcca extends Component {
    render() {
      return (            
        <div className="WcCarousel">               
            <Carousel data_setting={WcCarousel_Setting}/>
        </div>                   
      );
    }
  }
  
  class Wcca1 extends Component {
    render() {
      return (         
        <div className="WcCarousel1">               
            <Carousel  data_setting={WcCarousel_Setting2}/>
        </div>                   
      );
    }
  }

export {
    Wcca , Wcca1
} 