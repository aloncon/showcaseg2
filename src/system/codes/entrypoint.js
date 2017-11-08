import React from 'react';
import ReactDOM from 'react-dom';
import FromProviderCenter from '../data/module-profiles/fromProviderCenter.json'
// import ToProviderCenter from './toProviderCenter.json'
// var fs = require("fs");



class EntryPoint extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            iFrameHeight: '0px',
            src: null,
            answer: FromProviderCenter.adobe.mailto.value,
            entryPointAssortment : this.props.config
        }
    }


    componentDidMount() {
        console.log("AAAAAAAAAAAA"+document.getElementById("entryPoint").src);
        var domain = "domain=" + window.location.host + "-domain";
        let k = encodeURI(this.state.answer);
        this.setState({
            "src": this.props.src + '?'+ domain + "ismail=t-textmail=" + k+"-endmail", 
        });
        if(this.props.src.indexOf("http") !== -1){
            //document.getElementById('entryPoint').style.height = data.resizeH + "px";
        }
        
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

        if(this.props.src.indexOf("http") === -1){
                    // write configuration to jason file for providerCenter

                    if(FromProviderCenter["adobe"] != undefined){
                        let tempModuleName = "adobe"
                        // alert("Has the module" + this.state.entryPointAssortment.title)
                        // FromProviderCenter[tempModuleName] = this.state.entryPointAssortment


                        // var newName = FromProviderCenter,
                        // xhr = new XMLHttpRequest();

                        // xhr.open('POST', '/angelaserver');
                        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        // xhr.onload = function() {
                        //     if (xhr.status === 200 && xhr.responseText !== newName) {
                        //         alert('Something went wrong.  Name is now ' + xhr.responseText);
                        //     }
                        //     else if (xhr.status !== 200) {
                        //         alert('Request failed.  Returned status of ' + xhr.status);
                        //     }
                        // };
                        // xhr.send(encodeURI('name=' + this.state.entryPointAssortment));
                    }

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

                else{
                    this.setState({
                        src: this.props.src,
                        iFrameHeight: '100%'
                    })
                }
                }
     render() {
        
        const {id , title} = this.props
        const {iFrameHeight , src} = this.state
        return (
            <iframe 
                style={{width:'100%', height:iFrameHeight, overflow:'visible'}}
                onLoad={this._updateIframe}   
                ref="iframe" 
                src={src}   
                scrolling="no" 
                frameBorder="0"
                id={id}
                title={title}
            /> 
        );
    }


}

export default EntryPoint;