import React, { Component } from 'react';
import { Player, ControlBar , PlayToggle , BigPlayButton } from 'video-react';
import "../../system/style/videoGallery.css";
import {WcImg , WcPlayer , absolutizeSrc} from './WcResource';
import play_thumbnails from "../resources/videoGallery/play_thumbnails.png";



function getDuration(url){
    return new Promise((resolve,rej) => {
        let videoElement = document.createElement('video');
            videoElement.src = url;
            videoElement.preload = 'metadata';
            let waitToDuration = setInterval(()=>{
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

    constructor(props) {
        super(props)
        this.s = this.props.data_settings;
        this.init = {
            autoPlay                    :   (this.s.autoPlay                    != null ? this.s.autoPlay                   : false),
            playerWidth                 :   (this.s.playerWidth                 != null ? this.s.playerWidth                : '100%'),
            thumbnailAlignment          :   (this.s.thumbnailAlignment          != null ? this.s.thumbnailAlignment         : 'left'),
            thumbnailBackgroundColor    :   (this.s.thumbnailBackgroundColor    != null ? this.s.thumbnailBackgroundColor   : '#ffffff'),            
            durationTextColor           :   (this.s.durationTextColor           != null ? this.s.durationTextColor          : '#ffffff'),
            durationBackgroundColor     :   (this.s.durationBackgroundColor     != null ? this.s.durationBackgroundColor    : '#000000'),            
        }
    }
     
        state = {
            poster                      :   absolutizeSrc(this.props.data_info[0].videoPoster),
            src                         :   absolutizeSrc(this.props.data_info[0].videoSrc),
            videoObj                    :   [],
            flag                        :   false,
            activeIndex                 :   0,

        };  

        componentDidMount() {
            this.fetchData(this.props.data_info);              
        }

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
            const {poster , src , videoObj , flag} = this.state;
            const {autoPlay , playerWidth , thumbnailAlignment , thumbnailBackgroundColor , durationTextColor , durationBackgroundColor} = this.init;

            return (   
                <div>
                    <div className="wcVideoPlayerContainer" style={{width: playerWidth}}>
                         <WcPlayer
                            playsInline
                            poster={poster}
                            src={src}
                            autoPlay={autoPlay}
                         >   
                            <BigPlayButton position="center" />
                        </WcPlayer> 
                    </div>                
                    <div className="wcPlayList">
                            <ul className="wcPlayList" style={{textAlign: thumbnailAlignment}}>                            
                                {flag && videoObj.map((video,index) => {
                                    const className = this.state.activeIndex === index ? 'wcCenterContainer wcMovieActive' : 'wcCenterContainer';
                                    return(
                                        <li className="wcPlayListItem"  key={index}>
                                            <div className="wcThumbnailWrap">
                                                <a className={className} title={video.title} data-id={index} onClick={this.getIndex}  style={{backgroundColor: thumbnailBackgroundColor}}>
                                                    <WcImg className="wcThumbnail wcCenter" title={video.videoTitle} src={video.poster} alt={video.title} data-id={index} onClick={this.getIndex}/>
                                                    <WcImg className="wcPlay wcCenter" title={video.title} src={play_thumbnails} alt="" data-id={index} onClick={this.getIndex}  />
                                                </a>
                                                <span className="wcDuration"   style={{backgroundColor: durationBackgroundColor,color: durationTextColor}}>{this.displayDuration(video.duration)}</span>                         
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