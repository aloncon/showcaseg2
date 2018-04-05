import React, { Component } from 'react';
import {Announcements} from '../modules/Announcements';
import {VideoGallery} from '../modules/VideoGallery';
import '../../system/style/App.css';
import '../../common/css/index.less';
import {WcLink , WcOverlayVideo , absolutizeSrcExternal} from '../../system/codes/WcResource';
import ProductListing from '../../system/codes/list/ProductListing';
import videoTest from '../assets/video/videoTest.mp4';
import ecosystem_brochure42017 from '../assets/pdf/76544_1_wwecosystem_brochure_42017.pdf';
import { observer } from 'mobx-react'
import ResponsiveStore from '../../store/ResponsiveStore';



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
                <br/><br/>
                <div className="btn" style={{cursor:'pointer'}} onClick={()=>absolutizeSrcExternal('mailto:test@gmail.com','ext')}>
                    Open Mailto Link (by absolutizeSrcExternal())
                </div>
                <br/><br/>
                <div className="btn" style={{cursor:'pointer'}} onClick={()=>absolutizeSrcExternal('www.gmail.com','ext')}>
                    Open External Link (by absolutizeSrcExternal() and not WcLink)
                </div>
                <br/><br/>
                {/* <div className="btn" style={{cursor:'pointer'}} onClick={()=>absolutizeSrcExternal('./EndpointSolutions','int')}>
                    Open internal Link (by absolutizeSrcExternal() and not WcLink)
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

class ShowcaseBody extends React.Component {
  render() {
    return (
      <div className="wcShowcaseBody testingAreaGeneralDiv">
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
            <ProductListing type="carousel" infinite={false} ids={["Business-Networking-Access-Point"]} carosulId={'00'}/>
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
