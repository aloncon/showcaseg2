import React, { Component } from 'react';
import {Announcements} from '../modules/Announcements';
import {VideoGallery} from '../modules/VideoGallery';
import '../../system/style/App.css';
import '../../common/css/index.less';
import {WcLink , WcOverlayVideo} from '../../system/codes/WcResource';
import ProductListing from '../../system/codes/list/ProductListing';

import videoTest from '../assets/video/videoTest.mp4';

import ecosystem_brochure42017 from '../assets/pdf/76544_1_wwecosystem_brochure_42017.pdf';

import in2ecosystem_header_video from '../assets/video/alaris-in2-ecosystem-take-the-complexity-out-of-information-capture.mp4';


var featuredTitle = {
  width: '100%',
  fontWeight: 'bold',
  textAlign: 'center',
  fontFamily: 'Helvetica Neue LT St, Helvetica',
  fontSize:   '16px'
};
var leftSide = {
  float:'left',
  display: 'block',
  width: '80%'
}
var rightSide = {
  float:'right',
  borderLeft: '1px solid rgb(204, 204, 204)',
  paddingLeft: '10px',
  width: '20%'
}

class In2EcosystemHeader extends React.Component{
  render(){
      return(
              <div className="wc-in2-main-wrap">
              <div className="in2-header">
                  <div id="content">
                      <h1 className="caption">Alaris IN2 Ecosystem</h1>
                      <p className="description">Take the Complexity Out of Information Capture</p>

                      <WcOverlayVideo src={videoTest} playsInline autoPlay={false} tag='div' className="btn" id="btn-video-play"/>
                      <WcLink WcOpenAs="popup" href={ecosystem_brochure42017}>
                        <div className="btn" id="btn-brochure"></div>
                      </WcLink>
                  </div>
              </div>
              </div>  
      )
  }   
}


class ShowcaseBodyHeader extends React.Component{
  render() {
    return (
      <div className="wcShowcaseBody">
            <h2>Announcements:</h2>
            <Announcements />
            <hr/>      
      </div>
    );
  }
}

class ShowcaseBody extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h2>overlay video test:</h2>
          <In2EcosystemHeader/>
        </div>
        <div>
          <h2>Carousel:</h2>
          <ProductListing type="carousel" ids={["Carusel-Data"]} slidesToShow={4} ImageHeight="80px" carouselHeight='200px' productWidth="150px" productHeight='150px'/>
          {/* <ProductListing type="carousel" ids={["Carusel-Data"]} slidesToShow={4} carouselHeight='150px' /> */}
          <br/>
            {/* <ProductListing type="carousel" ids={["Carusel-Data-2"]} slidesToShow={4} carouselHeight='320px' ImageHeight='200px'/>  */}
          <br/>
           {/* <ProductListing type="carousel" vertical={true} ids={["Carusel-Data"]} slidesToShow={2} carouselHeight='600px' productWidth="200px" productHeight='200px'/>            */}
           </div>  
        <hr/>      
        <h2>Standalone Link:</h2>
        <div>
          <WcLink href="standalone/index.html" WcOpenAs='popup' WcHeight={1000} WcWidth={1000}>Open Standalone</WcLink>
        </div>
        <hr/>
        <h2>Video Gallery:</h2>
        <section>
              {/* <div style={rightSide}> 
                 <div style={featuredTitle}>Recommended Products</div> 
                 <ProductListing type="carousel" vertical={true} ids={["Carusel-Data"]} slidesToShow={3} carouselHeight='560px'  ImageHeight='100px'  productWidth="200px" productHeight='180px'/> 
             </div>    
             <div style={leftSide}> 
                 <VideoGallery /> 
             </div>  
            <div className="wcClear"></div>      */}
            <div>
                <br/>
                <br/>
            </div>
            <VideoGallery /> 
        </section>
      </div>

    );
  }
}



class ShowcaseApp extends Component {
  render() {
    return (
      <div className="wcShowcase" id="wc-reset">
        <ShowcaseBodyHeader />
        <ShowcaseBody />
      </div>

    );
  }
}

export default ShowcaseApp;
