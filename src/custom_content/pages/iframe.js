import React from 'react';
import EntryPoint from '../modules/entrypoint';
import '../../system/style/App.css'; 
import WcpcContent from '../../system/codes/WcpcContent'
import { WcIframe } from '../../system/codes/WcResource';

class Iframe extends React.Component {
    render() {
        return <div id="iframeContainer" style={{width:'98%' ,margin:'0px auto',height:'auto'}}>
                        <WcIframe
                        id={"entryPoint"}
                        src={'./siteadditions/adobe-creative-cloud-for-teams/index.html'}
                        title="adobe-creative-cloud-for-teams"/>
                    </div>
    }
}

export default Iframe;