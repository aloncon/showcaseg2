import React, { Component } from 'react';
import configuration from '../configuration.js';
import { WcImg } from '../../system/codes/WcResource';
import'../../system/style/footer.css';


class ShowcaseFooter extends Component{

  render() {
    let footerStyle = {backgroundColor : configuration.footerDetails.backgroundColor};
    let imgSrc = configuration.footerDetails.imgProvidedBy;
    return(
      <span>
            <div className="wcFooter" style={footerStyle}>
                <div className="wcPoweredBy" >
                  <WcImg alt="Powered by Webcollage" src={imgSrc} title="Powered by Webcollage"/>
                </div>
            </div>
      </span>
    );
  }
}

export default ShowcaseFooter;


