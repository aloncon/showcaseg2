import React from 'react';
import '../../system/style/App.css'; 
import { WcIframe } from '../../system/codes/WcResource';

class Iframe extends React.Component {
    render() {
        return <div id="iframeContainer" style={{width:'98%' ,margin:'0px auto',height:'auto'}}>
                        <WcIframe
                        id={"entryPoint"}
                        src={"./siteadditions/adobe-creative-cloud-for-teams/index.html?domain=" + window.location.host + "-domain"}
                        title="adobe-creative-cloud-for-teams"/>
                    </div>
    }
}

export default Iframe;