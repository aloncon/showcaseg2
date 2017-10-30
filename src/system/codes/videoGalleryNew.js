import React, { Component } from 'react';
import { Player } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";
import "../../system/style/videoGallery.css";
import WcResource from '../../WcResource';
import play_thumbnails from "../resources/videoGallery/play_thumbnails.png";


export default class Wcvg extends Component {

    state = {
        poster                  :           this.props.data_info[0][1],
        src                     :           this.props.data_info[0][2],
        videoDurationArray      :           [],
        isDurationReady         :           false  
    }

    componentDidMount()  {
        this.getVideoDuration1()    
        console.log('loding...') 
        //this.startSlideTimeout();       
    }

    waitForDuration = () => {
        console.log('im starting...')
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    getVideoDuration1 = () => {
		this.waitForDuration().then(() => {
            var videoArrayLength = this.props.data_info.length;
            for (var i = 0; i < videoArrayLength; i++) {
                var video = document.createElement('video');
                video.src = this.props.data_info[i][2]; 
                video.preload = 'metadata';
                    this.timeout = setTimeout(() => {  
                        video.onloadedmetadata = function() {
                            window.URL.revokeObjectURL(this.src)
                            var duration = video.duration;
                            this.state.videoDurationArray[i] = duration
                            console.log('videoDurationArray['+i+']: '+this.state.videoDurationArray[i]);
                        }
                    },  200);
                
            }
            this.setState({isDurationReady:true})
		});        
    }

    // startSlideTimeout() {
    //         this.timeout = setTimeout(() => {
    //                 if(this.state.flag){
    //                     this.endSlideTimeout();
    //                 }else{
    //                     this.getVideoDuration();
    //                     this.startSlideTimeout();
    //                 }
    //         },  1200);
    //     }
    
    // endSlideTimeout() {
    //     //on use when we want autoplay for the slider - uses to stop the autoplay
    //         clearTimeout(this.timeout);
    //     }

    getIndex = (e) => {        
        var i = Number(e.target.dataset.id);
        //console.log('e.target.dataset.id: '+e.target.dataset.id);
        //console.log('i: '+i);
        var src = this.props.data_info[i][2];
        this.setState({
            poster  : this.props.data_info[i][1],
            src     : this.props.data_info[i][2]
        });
    }
    
    getVideoDuration = (index) => {
        console.log('getVideoDuration moudle');
        var videoArrayLength = this.props.data_info.length;
        console.log('videoArrayLength: '+videoArrayLength);
          var ArrayT = []
          var video = document.createElement('video');
          video.src = this.props.data_info[0][2]; 
          video.preload = 'metadata';
          video.onloadedmetadata = function() {
            window.URL.revokeObjectURL(this.src)
            var duration = video.duration;
            ArrayT[0] = duration
            console.log('ArrayT: '+ArrayT[0]);
          }
        //   console.log('videoDurationArray: '+this.state.videoDurationArray);
            this.timeout = setTimeout(() => {  
                this.state.videoDurationArray[0] = ArrayT[0];
                console.log('videoDurationArray: '+this.state.videoDurationArray[0]);
                //this.state.flag = true;
            },  200);
          //video.src = URL.createObjectURL(files[0]);;

        //var time = 0;         
        //var vid = document.createElement('video');
        //vid.src = this.props.data_info[index][2]; 
        // this.timeout = setTimeout(() => {
        //     vid.ondurationchange = function() {
        //         console.log('videoDuration: '+this.duration);          
        //     };     
            
        //         console.log('vid.duration: '+vid.duration);
                                    
        // },  1200);
        

    }

    render() {  
        
        let playerContainerStyle = {
            width: '90%'
        };
        let galleryContainerStyle = {
            width: '90%'
        }; 

        const { poster, src , videoDurationArray , isDurationReady } = this.state;

        return (             
            
            <div>
                <div style={playerContainerStyle}>
                    <Player
                        playsInline
                        poster={poster}
                        src={src}
                    /> 
                </div>
                { isDurationReady && 
                    <div className="wc-play-list">
                        <ul className="wc-play-list">
                        { this.props.data_info.map((video, index) => ( 
                                <li className="wc-play-list-item"  key={index} >
                                    <div className="wc-thumbnail-wrap">
                                        <a className="wc-center-container" title={video[0]} data-id={index} onClick={this.getIndex}>
                                            <img className="wc-thumbnail wc-center" title={video[0]} src={video[1]} alt={video[0]} data-id={index} onClick={this.getIndex}/>
                                            <img className="wc-play wc-center" title={video[0]} src={play_thumbnails} alt="" data-id={index} onClick={this.getIndex}/>
                                            <span className="wc-duration">{this.state.videoDurationArray[index]}</span>
                                            <span className="wc-hidden">undefined</span>                                          
                                        </a>                                        
                                    </div>                                    
                                </li>                                
                            )) }
                        </ul>
                    </div> 
                }                

                                               
                </div>                  
          
                 
        );
    }
};

/* 
        
        this.props.data_info.map((movie, index) => ( 
            <div key={index}>
                
                <div data-id={index} onClick={this.getIndex} className="wcvg_galleryBox_wrap" title={movie[0]}>
                Video Number {movie[0]}                                
                <span className="wc-duration">{this.getVideoDuration}</span>
            </div>
        </div>   
    ))
  


*/


//  margin: 0 auto;
// left: 0;
// right: 0;
// top: 44%;

/*TODO:
    - add correct dutation
    - change play in player and to the center
    - mark the corrent video that playing
    - if movie has title if not: title = video 
*/