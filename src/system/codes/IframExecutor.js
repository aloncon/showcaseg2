import React from 'react';
import'../style/iframe.css';
import { absolutizeSrcExternal } from './WcResource';
import WcShowcase from './moduleInfo'

let eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
let eventRemoveMethod = window.removeEventListener ? "removeEventListener" : "removeEvent";
let messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";
let eventer = '';


class IframExecutor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iFrameHeight: '0px',
            loader: true,
        }
    }

    onLoad = () => {
        this.setState({
            iFrameHeight:  '1px',
            loader : false
        }); 
        const {id} = this.props
        const { loader } = this.state
        let scrollH = document.getElementById(id).offsetTop -200;
        if(!loader){ eventer = window[eventRemoveMethod];}
        else{eventer = window[eventMethod];}
        
        
        eventer(messageEvent, function(e) {
            if(e.data !== undefined){
                if(e.data.toString().indexOf("exit") !== -1){
                    if(e.data.toString().indexOf("-chat-exit") !== -1 ||
                        e.data.toString().indexOf("-email-exit") !== -1)
                        {
                        absolutizeSrcExternal(document.getElementById(e.data.toString()).getAttribute('href'),'ext')
                        }
                    else{
                        let href = document.getElementById(e.data.toString().replace("-exit","")).getAttribute('href');
                        absolutizeSrcExternal(href,'ext');
                    }
                }else if (e.data.toString().indexOf("goto-") !== -1){
                    let href = document.getElementById(e.data.toString().replace("goto-","")).getAttribute('href');
                    absolutizeSrcExternal(href,'int');
                    
                }else if (e.data.toString().indexOf("scrollup") !== -1){
                    if (e.data.toString().indexOf("nav") === -1){
                        window.scroll(0, scrollH);
                    }
                }else if (e.data.toString().indexOf("reporting-") !== -1){
                    ///WebCollage.wcReportCustomAction(e.data.toString().replace("reporting-","")); (????)
                }else{				
                    document.getElementById(id).style.height = e.data + "px";	                      
                }
            }
        },false);
    }
    render() {
        
        const {id , title, src, WcParameters} = this.props
        const { iFrameHeight ,loader } = this.state
        let display = true;
        let fullSrc

        if(WcParameters !== "true" && WcParameters !== "false" && WcParameters !== undefined ){
            console.error("WC-ERROR: Please enter a boolean value in @WcParameters")
            display = false;
        }else{
            const wcclient = (typeof window.orientation !== 'undefined')?  "mobile" :  "desktop"
            fullSrc = (WcParameters === "true") ? `${src}?_wcsite=${WcShowcase.siteName}?_wcworkspace=${WcShowcase.moduleName}?_wcenvironment=${WcShowcase.environmentId}?_wcclient=${wcclient}`:src 
        }

        return (
            <div>
                {loader && display && <div id="loader"></div>}
                <iframe sandbox = "allow-same-origin allow-scripts"
                    style={{width:'100%', height:iFrameHeight, overflow:'visible'}}
                    onLoad={this.onLoad}
                    ref="iframe" 
                    src={fullSrc} 
                    scrolling="no" 
                    frameBorder="0"
                    id={id}
                    title={title}
                    allowFullScreen="true"
                />
            </div>
        );
    }
}

export default IframExecutor;