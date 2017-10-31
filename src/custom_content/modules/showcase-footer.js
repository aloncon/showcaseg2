import React, { Component } from 'react';
import configuration from '../configuration.js';

class ShowcaseFooter extends Component{

  render() {
    let styleObj = {backgroundColor : configuration.footerDetails.backgroundColor};
    let imgSrc = configuration.footerDetails.imgProvidedBy;
    return(
      <span id="wc-reset" >
            <div className="Footer" style={styleObj}>
                <div className="wc-powered-by" ><img ref="pb" alt="Powered by Webcollage" src={imgSrc} title="Powered by Webcollage" /></div>
            </div>
        </span>

    );
  }
}

export default ShowcaseFooter;


