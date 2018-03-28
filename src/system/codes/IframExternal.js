import React from 'react';
import'../style/iframe.css';
import WcShowcase from './moduleInfo'


class IframExternal extends React.Component {
    render() {
        const {id , title, src, height, WcParameters, supportsHttps} = this.props
        const width = this.props.width ? this.props.width : "100%"
        let display = true;
        let fullSrc
        
        if(WcParameters !== "true" && WcParameters !== "false" ){
            console.error("WC-ERROR: Please enter a boolean value in @WcParameters")
            display = false;
        }else{
            fullSrc = (WcParameters === "true") ? `${src}?_wcsite=${WcShowcase.siteName}?_wcworkspace=${WcShowcase.moduleName}?_wcenvironment=${WcShowcase.environmentId}`:src // ?_wcclient=${}
        }
        
        if(supportsHttps !== "true" && supportsHttps !== "false" ){
            console.error("WC-ERROR: Please enter a boolean value in @supportsHttps")
            display = false;
        }
        else if (window.location.protocol === 'https' && supportsHttps === "false") {
            display = false
        }

        return (
            <div>
                {display ? 
                <iframe sandbox = "allow-same-origin allow-scripts"
                    style={{overflow:'visible'}}
                    ref="iframe" 
                    src={fullSrc} 
                    scrolling="no" 
                    frameBorder="0"
                    id={id}
                    title={title}
                    height={height}
                    width={width}
                />
            : null}
            </div>
        );
    }
}

export default IframExternal;