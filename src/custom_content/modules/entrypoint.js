import React from 'react';
import ReactDOM from 'react-dom';
import WcShowcase from '../../system/codes/moduleInfo';
import ShouldDisplay from '../../system/codes/ShouldDisplay';
import'../../system/style/iframe.css';

class EntryPoint extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            iFrameHeight: '0px',
            src: null,
            loader: true
        }
        
    }
    componentDidMount() {
        // console.log("xxxx",WcShowcase.siteName);
        let siteName = "?domain=" + window.location.host + "-domain"; // in the future change to : WcShowcase.siteName
        const entry=  ShouldDisplay({wc_entry: "entry"}); 
        this.setState({
            "src": this.props.src + siteName + "?ismail=t-textmail=" + encodeURIComponent(entry.mailto.value) +"-endmail" 
        });
    }
    onLoad = () => {
            this.setState({
                "iFrameHeight":  '1px',
                "loader" : false
            });
            const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
            const eventer = window[eventMethod];
            const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";
            const {id , title} = this.props
            const {iFrameHeight , src} = this.state


            eventer(messageEvent, function(e) {
                if(e.data.indexOf('isWebcollage')!== -1){
                    let data = JSON.parse(e.data);
                    if (data.scrollH !== undefined){					
                         let scrollHiegth = data.scrollH + iFrameHeight;						 					 
                    }else if (data.resizeH !== undefined){
                        console.log("parent height: " + data.resizeH + "px");						
                        document.getElementById(id).style.height = data.resizeH + "px";	
                        
                    }
                }
            },false);
        }
        render() {
        
            const {id , title} = this.props
            const {iFrameHeight , src,loader} = this.state
            return (
                <div>
                    {loader && <div id="loader"></div>}
                    <iframe 
                        style={{width:'100%', height:iFrameHeight, overflow:'visible'}}
                        onLoad={this.onLoad}
                        ref="iframe" 
                        src={src}   
                        scrolling="no" 
                        frameBorder="0"
                        id={id}
                        title={title}
                    />
                    
               </div>
           );
        }
}

export default EntryPoint;