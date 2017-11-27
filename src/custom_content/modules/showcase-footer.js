import React, { Component } from 'react';
import configuration from '../configuration.js';
import { WcImg } from '../../system/codes/WcResource';

class ShowcaseFooter extends Component{

  render() {
    let footerStyle = {backgroundColor : configuration.footerDetails.backgroundColor};
    let imgSrc = configuration.footerDetails.imgProvidedBy;
    return(
      <span>
            <div className="wc-footer" style={footerStyle}>
                <div className="wc-powered-by" >
                  <WcImg alt="Powered by Webcollage" src={imgSrc} title="Powered by Webcollage"/>
                </div>
            </div>
      </span>
    );
  }
}

export default ShowcaseFooter;


