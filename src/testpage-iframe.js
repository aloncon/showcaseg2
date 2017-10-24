import React from 'react';
import EntryPoint from './siteadditions/entryPoint';
import './system/style/App.css';

class TargetEntryPoint extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {}
    }

    render() {
        // const {content, counter, styles} = this.state;
        return <div id="iframeContainer"><EntryPoint/></div>
    }
}
 
export default TargetEntryPoint;