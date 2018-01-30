import React, { Component } from 'react';
import configuration from '../../system/codes/configuration';
import { WcImg } from '../../system/codes/WcResource';
import'../../system/style/footer.css';
import ShouldDisplay from '../../system/codes/ShouldDisplay';


class ShowcaseFooter extends Component{

  render() {
    let footerStyle = {backgroundColor : configuration.footerDetails.backgroundColor};
    let imgSrc = configuration.footerDetails.imgProvidedBy;
    return(
      <ShouldDisplay wc_section="wc_footer">
            <div className="wcFooter" style={footerStyle}>
                <div className="wcPoweredBy" >
                  <WcImg alt="Powered by Webcollage" src={imgSrc} title="Powered by Webcollage"/>
                </div>
            </div>
      </ShouldDisplay>
    );
  }
}

export default ShowcaseFooter;


