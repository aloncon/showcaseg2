import React from 'react';
import ReactDOM from 'react-dom';
import InputProviderCenter from '../../siteadditions/inputProviderCenter.json'


class iframeConfig extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            iFrameHeight: '0px',
            src: this.props.src,
            answer: InputProviderCenter.adobe.mailto.value,
        }
    }


    componentDidMount() {
        console.log("AAAAAAAAAAAA"+document.getElementById("entryPoint").src);
        var domain = "domain=" + window.location.host + "-domain";
        this.setState({
            "src": this.state.src + '?'+ domain + "ismail=t-textmail=" + encodeURIComponent(this.state.answer)+"-endmail", 
        });
    }
    componentWillUpdate() {
        // console.log('Component is about to update...');
    }
     
	// change code below this line
    componentWillReceiveProps(nextProps){
        //console.log("this:: "+this.props);
        //console.log(nextProps);
    }
    componentDidUpdate(){
        //console.log("the component has updated")

    }

    _updateIframe = () => {
                    const obj = ReactDOM.findDOMNode(this);
                    console.log("location "+ (window.addEventListener ? "addEventListener" : "attachEvent"))
                    
                    this.setState({
                        "iFrameHeight":  obj.contentWindow.document.body.scrollHeight + 'px',
                    });
                    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
                    var eventer = window[eventMethod];
                    var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

                    {/* console.log("obj.contentWindow.document--------------" + obj.contentWindow.document.getElementsByClassName[0]("creative-cloud")) */}

                    eventer(messageEvent,function(e) {
                        if(e.data.indexOf('isWebcollage')!== -1){
                            var data = JSON.parse(e.data);
                            if (data.scrollH !== undefined){					
                                 var scrollHiegth = data.scrollH + this.state.iFrameHeight;						 
                                 //obj.contentWindow.document.body.animate({scrollTop: scrollHiegth}, 1000);					 
                            }else if (data.resizeH !== undefined){
                                console.log("parent height: " + data.resizeH + "px");						
                                document.getElementById('entryPoint').style.height = data.resizeH + "px";	
                            }
                        }

                    },false);


                }
     render() {
         
        return (
            <iframe 
                style={{width:'100%', height:this.state.iFrameHeight, overflow:'visible'}}
                onLoad={this._updateIframe}   
                ref="iframe" 
                src={this.state.src} 
                width="100%" 
                height={this.state.iFrameHeight} 
                scrolling="no" 
                frameBorder="0"
                id={this.props.id}
                title={this.props.title}
            />
            
        );
    }


}

export default iframeConfig;