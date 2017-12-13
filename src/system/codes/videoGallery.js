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
            let waitToDuration = setInterval(()=>{
            console.log("videoElement.readyState",videoElement.readyState);
                if(videoElement.readyState > 0){
                    window.URL.revokeObjectURL(videoElement.src);
                    let  durationVideo = videoElement.duration;
                    resolve(videoElement.duration)
                    clearInterval(waitToDuration);
                }
            },200)
            
    })
}
function getVideoDuration(videosTemp){
        let videos = videosTemp;
        console.log("videos",videos)
        let temp = []
        return new Promise(res=>{
            videos.forEach(video => {
                temp.push(new Promise(resolve => {
                    let videoPoster = video.videoPoster;
                    let videoDuration;
                    let videoSrc = absolutizeSrc(video.videoSrc);
                    let videoTitle = video.videoTitle;
                    getDuration(videoSrc)
                    .then(result => {
                        resolve({duration : result ,poster : videoPoster, src : videoSrc, title : videoTitle});
                    })
                }))
            })
    
            Promise.all(temp).then(result => {res (result)})
        })
 
}


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
                    <div className="wcVideoPlayerContainer">
                         <WcPlayer
                            playsInline
                            poster={this.state.poster}
                            src={this.state.src}
                            
                            onSubmit={(e)=>{e.preventDefault()}}
                            
                        > 
                            <BigPlayButton position="center" />
                        </WcPlayer> 
                    </div>                
                    <div className="wcPlayList">
                            <ul className="wcPlayList">
                            
                            {flag && videoObj.map((video,index) => {
                                const className = this.state.activeIndex === index ? 'wcCenterContainer wcMovieActive' : 'wcCenterContainer';
                                return(
                                    <li className="wcPlayListItem"  key={index}>
                                        <div className="wcThumbnailWrap">
                                            <a className={className} title={video.title} data-id={index} onClick={this.getIndex}>
                                                <WcImg className="wcThumbnail wcCenter" title={video.videoTitle} src={video.poster} alt={video.title} data-id={index} onClick={this.getIndex}/>
                                                <WcImg className="wcPlay wcCenter" title={video.title} src={play_thumbnails} alt="" data-id={index} onClick={this.getIndex}  />
                                            </a>
                                            <span className="wcDuration">{this.displayDuration(video.duration)}</span>                         
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
