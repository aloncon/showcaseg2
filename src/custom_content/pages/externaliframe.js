import React from 'react';
import '../../system/style/App.css'; 
import { WcIframe } from '../../system/codes/WcResource';
import ShouldDisplay from '../../system/codes/ShouldDisplay'

class Externaliframe extends React.Component {
    render() {
        return <div>
        <ShouldDisplay wc_section="custom-listing_scanners,wc_all_module_products">
        <h1>Showcase App</h1>
        </ShouldDisplay>

        <WcIframe
        src="https://www.samsung.com/us/virtualkitchenconsultant/"
        title="Adobe Acrobat DC showcase"
        height="700"
        WcParameters="true"
        supportsHttps="true"/>  
      </div>
    }
}

export default Externaliframe;