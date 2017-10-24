import React from 'react';
import EntryPoint from '../../system/codes/entryPoint';
import WcpcContent from '../../WcpcContent';
import '../../system/style/App.css';

class TargetEntryPoint extends React.Component {

    render() {
        return <div id="iframeContainer">
                    <EntryPoint 
                        id={"entryPoint"} 
                        src={'./siteadditions/adobe-creative-cloud-for-teams/index.html'} 
                        title="adobe-creative-cloud-for-teams"/>
                </div>
    }
}
 
export default TargetEntryPoint;