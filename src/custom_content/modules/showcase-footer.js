import React, { Component } from 'react';
import configuration from '../configuration.js';
import { WcImg } from '../../system/codes/WcResource';
import'../../system/style/footer.css';
import WcpcContent from '../../system/codes/WcpcContent';


class ShowcaseFooter extends Component{

  render() {
    let footerStyle = {backgroundColor : configuration.footerDetails.backgroundColor};
    let imgSrc = configuration.footerDetails.imgProvidedBy;
    return(
      <WcpcContent wc_section="wc_footer">
            <div className="wcFooter" style={footerStyle}>
                <div className="wcPoweredBy" >
                  <WcImg alt="Powered by Webcollage" src={imgSrc} title="Powered by Webcollage"/>
                </div>
            </div>
      </WcpcContent>
    );
  }
}

export default ShowcaseFooter;


