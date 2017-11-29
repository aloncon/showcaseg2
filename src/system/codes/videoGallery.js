import React, { Component } from 'react';
import { Player, ControlBar , PlayToggle , BigPlayButton } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";
import "../../system/style/videoGallery.css";
import {WcImg , WcPlayer , absolutizeSrc} from './WcResource';
import play_thumbnails from "../resources/videoGallery/play_thumbnails.png";


import videoTestSrc from '../../custom_content/assets/video/videoTest.mp4';
import videoTestPoster from '../../custom_content/assets/video/posterTest.jpg'

let newVideoDetails = [];


function getDuration(url){
  //  console.log(url);
    return new Promise((resolve,rej) => {
       // console.log("duration 4");
        let videoElement = document.createElement('video');
            videoElement.src = url;
            videoElement.preload = 'metadata';
            videoElement.onloadedmetadata = setTimeout(function() {
                window.URL.revokeObjectURL(videoElement.src);
                let  durationVideo = videoElement.duration;
                resolve(videoElement.duration)
            },500)
            
            
            
    })
}
function getVideoDuration(videosTemp){
        let videos = videosTemp;
       return new Promise((resolve,reject) => {
                let list = [];
                let length = videos.length;
                videos.forEach((video,i) => {
                    let videoPoster = video.videoPoster;
                    let videoDuration;
                    let videoSrc = absolutizeSrc(video.videoSrc);
                    let videoTitle = video.videoTitle;
                    getDuration(videoSrc)
                    .then(result => {
                        console.log("LENGTHasdasdasd" + length);
                        list.push({duration : result ,poster : videoPoster, src : videoSrc, title : videoTitle});
                        length--;
                    }).then(()=>{
                        if(length==0){
                            resolve(list);  
                        }    
                            
                    })
            })
           
        
       }) 
 
}

// function secondsToTime(time){
//     return ~(time/60) + ":" + (time%60<10 ? "0" : "") + time %60;
// }


export default class Wcvg extends Component {
        
        state = {
            poster                  :           absolutizeSrc(this.props.data_info[0].videoPoster),
            src                     :           absolutizeSrc(this.props.data_info[0].videoSrc),
            videoObj                :           [],
            flag                    :           false,
            paused                  :           false,
            progress                :           0,
            duration                :           0,
            activeIndex: 0
        };  

        getIndex = (e) => {        
            var index = Number(e.target.dataset.id);
            this.setState({
                poster  : this.props.data_info[index].videoPoster,
                src     : this.props.data_info[index].videoSrc,
                activeIndex: index
            });

        }
        fetchData = (data) =>{
            getVideoDuration(data)
            .then(result => {
                this.setState({videoObj : result});
                this.setState({flag : true});
                
            })   
        }

        componentDidMount() {
            this.fetchData(this.props.data_info);              
        }

        displayDuration(duration){
            let time;
            let min = Math.floor(duration/60);
            let sec = Math.floor(duration%60);
    
            
            if(min>10) time = min.toString();
            else time = "0"+min.toString();
            time+=":";
            if(sec>10) time += sec.toString();
            else time += "0"+sec.toString();
            return time;

        }


        render() {  
            const {videoObj , flag} = this.state;


            return (   
                <div>
                    <div className="VideoPlayerContainer">
                         <WcPlayer
                            playsInline
                            poster={this.state.poster}
                            src={this.state.src}
                            
                            onSubmit={(e)=>{e.preventDefault()}}
                            
                        > 
                            <BigPlayButton position="center" />
                        </WcPlayer> 
                    </div>                
                    <div className="wc-play-list">
                            <ul className="wc-play-list">
                            
                            {flag && videoObj.map((video,index) => {
                                const className = this.state.activeIndex === index ? 'wc-center-container wc-movie-active' : 'wc-center-container';
                                return(
                                    <li className="wc-play-list-item"  key={index}>
                                        <div className="wc-thumbnail-wrap">
                                            <a className={className} title={video.title} data-id={index} onClick={this.getIndex}>
                                                <WcImg className="wc-thumbnail wc-center" title={video.videoTitle} src={video.poster} alt={video.title} data-id={index} onClick={this.getIndex}/>
                                                <WcImg className="wc-play wc-center" title={video.title} src={play_thumbnails} alt="" data-id={index} onClick={this.getIndex}  />
                                            </a>
                                            <span className="wc-duration">{this.displayDuration(video.duration)}</span>                         
                                        </div>
                                    </li> 
                                )
                            })}
                            </ul>
                        </div>
                    </div>                                        
            );
        }
    };

      
    
    

    
    /*TODO:
        - add correct dutation
    */
