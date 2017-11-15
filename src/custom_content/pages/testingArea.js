import React, { Component } from 'react';
import {Wcan} from '../modules/Announcments';
import {Wcca , Wcca1} from '../modules/Carousel';
import {Wcvg} from '../modules/VideoGallery';
import '../../system/style/App.css';
import { WcImg, WcLink } from '../../system/codes/WcResource';
import {Button} from 'react-bootstrap'

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

class ShowcaseBodyHeader extends React.Component{
  render() {
    return (
      <div className="ShowcaseBody">
            <Wcan />
            <br/>
      </div>
    );
  }
}

class ShowcaseBody extends React.Component {
  render() {
    return (
      <div>
        <Wcca />
        <section>
            <div style={rightSide}>
                <div style={featuredTitle}>Recommended Products</div>
                <Wcca1 />
            </div>
            <div  style={leftSide}>
                 <Wcvg />
            </div>
            <div className='clear'></div>
            <div>
                <br/>
                <br/>
                <WcLink href='' />
                <div className="wc-wrap-button">
                  <WcLink href="http://www.test.symantecbtobuk.webcollage.net/wcdevres/_wc/pdf-white_papers/reaping-the-benefits-en.pdf" WcOpenAs='popup' WcHeight={1000} WcWidth={1000}>
                      <Button style={{backgroundColor:'#150e34',color:'white',marginLeft:10}}>Test the pop up button</Button>
                  </WcLink>
                </div>
            </div>

        </section>
      </div>

    );
  }
}


class ShowcaseApp extends Component {
  render() {
    return (
      <div className="Showcase" id="wc-reset">
        <ShowcaseBodyHeader />
        <ShowcaseBody />
      </div>

    );
  }
}

export default ShowcaseApp;
