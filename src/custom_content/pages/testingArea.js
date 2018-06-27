import React, { Component } from 'react';

import '../../system/style/App.css';
import '../../common/css/index.less';
import {WcLink , WcOverlayVideo , wcGoToURL} from '../../system/codes/WcResource';
import ProductListing from '../../system/codes/list/ProductListing';

import ecosystem_brochure42017 from '../assets/pdf/76544_1_wwecosystem_brochure_42017.pdf';
import { observer } from 'mobx-react'
import ResponsiveStore from '../../store/ResponsiveStore';

import Announcements from '../../system/codes/announcement.js';
// import {VideoGallery} from '../modules/VideoGallery';
import VideoGallery from '../../system/codes/videoGallery';

import videoTest from '../assets/video/videoTest.mp4'
import posterTest from '../assets/video/posterTest.jpg'

class In2EcosystemHeader extends React.Component{
  render(){
      return(
              <div className="wc-in2-main-wrap">
                <div className="in2-header">
                    <div id="content">
                        <br/><br/><br/>
                        <p className="description">A demo for overlay video and pop up window</p>
                        <WcOverlayVideo src={videoTest}
                                        playsInline
                                        wrapContentOptions ={{
                                          id: "btn-video-play",
                                          className: "btn",
                                          tag: 'div'
                                        }}
                        />
                        <WcLink WcOpenAs="popup" href={ecosystem_brochure42017}>
                          <div className="btn" id="btn-brochure"></div>
                        </WcLink>
                    </div>
                </div>
                <br/>
                <WcLink href="./testingArea.js" WcOpenAs={{type: 'popup', WcHeight: 1000, WcWidth:1000}}>
                  <div className="btn" style={{cursor:'pointer'}}>Open Internal Link</div>
                </WcLink>
                <br/><br/>
                <div className="btn" style={{cursor:'pointer'}} onClick={()=>wcGoToURL('mailto:test@gmail.com','ext')}>
                    Open Mailto Link (by wcGoToURL())
                </div>
                <br/><br/>
                <div className="btn" style={{cursor:'pointer'}} onClick={()=>wcGoToURL('www.gmail.com','ext')}>
                    Open External Link (by wcGoToURL() and not WcLink)
                </div>
                <br/><br/>
                {/* <div className="btn" style={{cursor:'pointer'}} onClick={()=>wcGoToURL('./EndpointSolutions','int')}>
                    Open internal Link (by wcGoToURL() and not WcLink)
                </div>   */}

              </div>
      )
  }
}

class ToggleCarousel extends React.Component{
  render(){

    const Carousel = observer(({responsiveStore}) => {
      if (responsiveStore.wcContainerSize === 'xs' || responsiveStore.wcContainerSize === 'sm') {
        return <div><h4>Carousel 03:</h4><ProductListing type="carousel"  vertical={true} ids={["Carusel-Data"]} carosulId={'03'}/></div>;
      }

      return <div><h4>Carousel 02:</h4><ProductListing type="carousel" ids={["Carusel-Data"]} carosulId={'02'}/></div>;

    });

    return(
      <Carousel responsiveStore={ResponsiveStore}/>
    )

  }
}


class ShowcaseBodyHeader extends React.Component{
  render() {
    return (
      <div className="wcShowcaseBodyHeader">
            <h1>Demos for Components:</h1>
      </div>
    );
  }
}

class VideoGalleryClass extends React.Component{
  render() {
    return (
      <VideoGallery autoplay={false}>
      <div
        id={0}
        videoTitle= "Video 1"
        videoPoster= {posterTest}
        videoSrc= {videoTest}
                    />
      <div
        id={0}
        videoTitle='Video 3'
        videoPoster='http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_WashSystem_Video-Still.jpg.w960.jpg'
        videoSrc='http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_WashSystem.mp4.mp4full.mp4'
      />
    </VideoGallery>
    );
  }
}

class AnnouncementsClass extends React.Component{
  render() {
    return (
        <Announcements isDots={true} responsiveSize='sm'>
               <div
                  id={0}
                  asset='Kaspersky_Magic_Quadrant_2016.pdf'
                  type='asset'
                  title='KSV 25% Discount'
                  image='1.jpg'
                  imageSmall='1-s.jpg'
                  assortment='all'
                  startDate={false}
                  endDate={false}
              />
               <div
                  id={1}
                  type='banner'
                  title='Q4_16_KSV_New_Customer'
                  image='2.jpg'
                  imageSmall='2-s.jpg'
                  assortment='all'
                  startDate={false}
                  endDate={1522555201000}
              />
              <div
                  id={6}
                  type='videoLink'
                  image='announcementVideoBackground.jpg'
                  imageSmall='announcementVideoBackground.jpg'
                  bannerContent='<h2>Sale Sale Sale 2</h2><p>Sale Sale Sale</p><p>Sale Sale Sale</p>'
                  videoSrc='videoTest.mp4'
                  videoPoster='posterTest.jpg'
                  videoWidth='300px'
                  videoHeight='200px'
                  videoTitle='video...'
                  assortment='all'
                  startDate={false}
                  endDate={false}
              />
              <div
                  id={2}
                  asset='Q4_16_VSB_Customer_Provantage.pdf'
                  type='asset'
                  title='Q4_16_VSB_Customer_Provantage'
                  image='3.jpg'
                  imageSmall='3-s.jpg'
                  assortment='all'
                  startDate={false}
                  endDate={false}
              />
              <div
                  id={3}
                  asset='Kaspersky_Magic_Quadrant_2016.pdf'
                  type='asset'
                  title='KSV 25% Discount'
                  image='4.jpg'
                  imageSmall='4-s.jpg'
                  assortment='all'
                  startDate={false}
                  endDate={false}
              />
              <div
                  id={4}
                  to='iframe'
                  type='localLink'
                  title='Q4_16_KSV_New_Customer'
                  image='5.jpg'
                  imageSmall='5-s.jpg'
                  assortment='all'
                  startDate={false}
                  endDate={false}
              />
              <div
                  id={5}
                  type='videoLink'
                  image='announcementVideoBackground.jpg'
                  imageSmall='announcementVideoBackground.jpg'
                  bannerContent='<h2>Sale Sale Sale 2</h2><p>Sale Sale Sale</p><p>Sale Sale Sale</p>'
                  videoSrc='videoTest.mp4'
                  videoPoster='posterTest.jpg'
                  videoWidth='300px'
                  videoHeight='200px'
                  videoTitle='video...'
                  assortment='all'
                  startDate={false}
                  endDate={false}
              />
          </Announcements>
    );
  }
}

class ShowcaseBody extends React.Component {
  render() {
    return (
      <div className="testingAreaGeneralDiv">
        <div>
          <hr/>
          <h2>Announcements:</h2>
            <AnnouncementsClass/>

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
            <h2>Mosaic testing:</h2>
            <div >
              {/* <div className="wcMosaic" data-cpi={53028274}/> */}
            </div>
            <br/>
          </div>
          <hr/>
          <div>
            <h2>Carousel without toggle between horizonal and vertical - vertical:</h2>
            <h4>Carousel 00:</h4>
            <ProductListing type="carousel" infinite={false} ids={["Business-Networking-Unmanaged-Switch"]} carosulId={'00'} reporting={false}/>
            {/* <ProductListing type="carousel" infinite={false} ids={["Business-Networking-Access-Point"]} carosulId={'00'}/> */}
            {/* <ProductListing type="carousel"  vertical={true} ids={["Carusel-Data-2"]} carosulId={'00'}/> */}
          </div>
          <br/>
          <div>
            <h2>Carousel without toggle between horizonal and vertical:</h2>
            <h4>Carousel 01:</h4>
            {/* <ProductListing type="carousel" ids={["Carusel-Data"]} carosulId={'01'}/> */}
          </div>
          <br/>
          <div>
            <h2>Carousel with toggle between horizonal and vertical:</h2>
              {/* <ToggleCarousel/> */}
          </div>
          <hr/>
          <div>
          <h2>Video Gallery:</h2>
            {/* <VideoGalleryClass/> */}


          </div>
          <div>
            <p>end of testing</p>
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
