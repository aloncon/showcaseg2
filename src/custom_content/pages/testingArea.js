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


import { observer } from 'mobx-react'
import ResponsiveContainer from '../../system/codes/ResponsiveContainer';
import ResponsiveStore from '../../store/ResponsiveStore';


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
                        <br/><br/><br/>
                        <p className="description">A demo for overlay video and pop up window</p>
                        <WcOverlayVideo src={videoTest} playsInline autoPlay={false} tag='div' className="btn" id="btn-video-play"/>
                        <WcLink WcOpenAs="popup" href={ecosystem_brochure42017}>
                          <div className="btn" id="btn-brochure"></div>
                        </WcLink>
                    </div>
                </div>
                <br/>
                <WcLink href="./testingArea.html" WcOpenAs='popup' WcHeight={1000} WcWidth={1000}>
                  <div className="btn" style={{cursor:'pointer'}}>Open Internal Link</div>
                </WcLink>
              </div>
      )
  }   
}

class ToggleCarousel extends React.Component{
  render(){

    let _size = '';
   
    const Carousel = observer(({responsiveStore}) => {
      if (responsiveStore.wcContainerSize === 'xs' || responsiveStore.wcContainerSize === 'sm') {
        return <ProductListing type="carousel"  infinite={false}  vertical={true} ids={["Carusel-Data"]} slidesToShow={3} ImageHeight="80px" carouselHeight='450px' productWidth="200px" productHeight='200px'/>;
      }

      return <ProductListing type="carousel" ids={["Carusel-Data"]} slidesToShow={4} ImageHeight="80px" carouselHeight='230px' productWidth="150px" productHeight='150px'/>;
      
    });

    return(
      <Carousel responsiveStore={ResponsiveStore}/>
    )

  }
}


class ShowcaseBodyHeader extends React.Component{
  render() {
    return (
      <div className="wcShowcaseBody">
            <h1>Demos for Components:</h1>     
      </div>
    );
  }
}

class ShowcaseBody extends React.Component {
  render() {
    return (
      <div className="testingAreaGeneralDiv">
          <hr/>  
          <div>
            <h2>Announcements:</h2>
            <Announcements />
            <br/>
          </div>
          <hr/> 
          <div>
            <h2>Overlay Video + Popup Window:</h2>
            <In2EcosystemHeader/>
            <br/>
          </div>
          <hr/>
          <div>
            <h2>Carousel without toggle between horizonal and vertical:</h2>
            <ProductListing type="carousel" ids={["Carusel-Data"]} slidesToShow={4} ImageHeight="80px" carouselHeight='200px' productWidth="150px" productHeight='150px'/>
          </div>
          <br/> 
          <div>
            <h2>Carousel with toggle between horizonal and vertical:</h2>
            <ToggleCarousel/>
          </div> 
          <hr/> 
          <div>
          <h2>Video Gallery:</h2>
          <VideoGallery /> 
          </div>               
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
