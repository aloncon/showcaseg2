/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import {BigPlayButton} from 'video-react';
import "../../system/style/videoGallery.css";
import {WcImg , WcPlayer , absolutizeSrc} from './WcResource';
import play_thumbnails from "../resources/videoGallery/play_thumbnails.png";
import {WcReports} from './WcEvents';


//getVideoData(),getDuration():  get the complete data for each video (with duration) - create the array with the duration.
function getVideoData(videosTemp){
        let videos = videosTemp;
        let temp = []

        return new Promise(res=>{
            videos.forEach(video => {
                temp.push(new Promise(resolve => {
                    let videoPoster = video[1];
                    let videoSrc = absolutizeSrc(video[2]);
                    let videoTitle = video[0];
                    getDuration(videoSrc)
                    .then(result => {
                        resolve({duration : result ,poster : videoPoster, src : videoSrc, title : videoTitle});
                    })
                }))
            })
    
            Promise.all(temp).then(result => {res (result)})
        }) 
}

function getDuration(url){
    return new Promise((resolve,rej) => {
        let videoElement = document.createElement('video');
            videoElement.src = url;
            videoElement.preload = 'metadata';
            let waitToDuration = setInterval(()=>{
                if(videoElement.readyState > 0){
                    window.URL.revokeObjectURL(videoElement.src);
                    resolve(videoElement.duration)
                    clearInterval(waitToDuration);
                }
            },200)
            
    })
}


export default class Wcvg extends Component {

    constructor(props) {
        super(props)
        this.s = this.props;
        this.init = {
            //get initial settings from user
            autoplay                    :   (this.s.autoplay                    != null ? this.s.autoplay                   : false),            
            playerWidth                 :   (this.s.playerWidth                 != null ? this.s.playerWidth                : '100%'),
            thumbnailAlignment          :   (this.s.thumbnailAlignment          != null ? this.s.thumbnailAlignment         : 'left'),
            thumbnailBackgroundColor    :   (this.s.thumbnailBackgroundColor    != null ? this.s.thumbnailBackgroundColor   : '#ffffff'),            
            durationTextColor           :   (this.s.durationTextColor           != null ? this.s.durationTextColor          : '#ffffff'),
            durationBackgroundColor     :   (this.s.durationBackgroundColor     != null ? this.s.durationBackgroundColor    : '#000000'),            
        }
    }
     
        state = {
            //uses for flags and keeping data
            autoPlay                    :   false,
            poster                      :   null,
            src                         :   null,
            title                       :   null,
            videoObj                    :   [],
            flag                        :   false,
            flag1stLoad                 :   true,
            flag1video                  :   false,
            activeIndex                 :   0,

        };  

        componentDidMount() {
            this.getDataFromComponent();
            this.setState({autoPlay:this.init.autoplay});           
        }
        
        //get the videos from the user (from each div)
        getDataFromComponent= () =>{
            let {children} = this.props;
            let videosInitialArray=[], videosTempArray=[], videosArr=[];
            let lengthArr = 0;   
             
            if(children){
                //if only one video
                if(!children.length){
                    lengthArr = 1;
                    this.state.videoObj = [children];

                    this.setState({flag1video:true});
                    this.setState({
                        poster : this.state.videoObj[0].props.videoPoster,
                        src    : this.state.videoObj[0].props.videoSrc,
                        title  : this.state.videoObj[0].props.videoTitle,
                    });                    
                }else{
                    //if not only one video create the array with duration (uses fetchData)
                    lengthArr = children.length;
                    videosInitialArray = children;
                    
                    for (var i = 0; i < lengthArr; i++) {
                        videosTempArray = [];
                        let video = videosInitialArray[i].props;
                        var videoTitle = video.videoTitle!==undefined?video.videoTitle:'';
                        if(video.videoPoster===undefined){
                            console.error('WC-ERROR: Video Gallery : Missing Poster for video  '+video.id);
                        }else{
                            var videoPoster = video.videoPoster
                        }
                        if(video.videoSrc===undefined){
                            console.error('WC-ERROR: Video Gallery : Missing Src for video  '+video.id);
                        }else{
                            var videoSrc = video.videoSrc
                        }

                        videosTempArray.push(videoTitle,videoPoster,videoSrc);
                        videosArr.push(videosTempArray);
                    }
                    this.fetchData(videosArr);  
                }                
              }else(
                  console.error('WC-ERROR: Please Note! Video Gallery missing Childrens!!')
              )            

        }

        getIndex = (e) => {               
            var index = Number(e.target.dataset.id);    
            this.setState({
                poster  : this.state.videoObj[index].poster,
                src     : this.state.videoObj[index].src,
                title   : this.state.videoObj[index].title,
                flag1stLoad:false,
                activeIndex: index,
                autoPlay:true
            }); 
                   
        }

        sendReport = (n) => {
            if(n===1){
                if(this.state.flag1stLoad){
                    WcReports("video-click",this.state.title)
                }                   
                this.state.flag1stLoad = false
            }else if(n===2){
                WcReports("video-click",this.state.title)                  
            }else if(n===3 && this.state.flag1stLoad){
                WcReports("video-view",this.state.title)
                this.setState({flag1stLoad:false})                
            }
            if(this.state.flag1video){
                this.setState({flag1video:false})
            }
            
        }

        fetchData = (data) =>{
            getVideoData(data)
            .then(result => {
                this.setState({videoObj : result});
                this.setState({flag : true});
                this.setState({
                    poster : this.state.videoObj[0].poster,
                    src    : this.state.videoObj[0].src,
                    title  : this.state.videoObj[0].title,
                });               
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
            const {autoPlay , poster , src , videoObj , flag, flag1stLoad,flag1video} = this.state;
            const {playerWidth , thumbnailAlignment , thumbnailBackgroundColor , durationTextColor , durationBackgroundColor} = this.init;

            return (   
                <div>
                    <div className="wcVideoPlayerContainer" style={{width: playerWidth}}  onClick={ () => (this.sendReport(1))}>                        
                         <WcPlayer
                            playsInline
                            poster={poster}
                            src={src}
                            autoPlay={autoPlay}                            
                         >   
                            <BigPlayButton position="center"/>
                            
                        </WcPlayer> 
                    </div> 
                    {flag && videoObj.length > 1 &&                                  
                        <div className="wcPlayList">
                                <ul className="wcPlayList" style={{textAlign: thumbnailAlignment}}>                            
                                    {flag && videoObj.map((video,index) => {
                                        const className = this.state.activeIndex === index ? 'wcCenterContainer wcMovieActive' : 'wcCenterContainer';
                                        return(
                                            <li className="wcPlayListItem"  key={index} onClick={ () => this.sendReport(2)}>
                                                <div className="wcThumbnailWrap">
                                                    <a className={className} title={video.title} data-id={index} onClick={this.getIndex}  style={{backgroundColor: thumbnailBackgroundColor}}>
                                                        <WcImg className="wcThumbnail wcCenter" title={video.videoTitle} src={video.poster} alt={video.title} data-id={index} onClick={this.getIndex}/>
                                                        <WcImg className="wcPlay wcCenter" title={video.title} src={play_thumbnails} alt="play Button" data-id={index} onClick={this.getIndex}  />
                                                    </a>
                                                    {flag1stLoad && this.sendReport(3)}
                                                    <span className="wcDuration"   style={{backgroundColor: durationBackgroundColor,color: durationTextColor}}>{this.displayDuration(video.duration)}</span>                         
                                                </div>
                                            </li> 
                                        )
                                    })}
                                </ul>
                            </div>
                    
                }                    
                {flag1video &&  videoObj.length === 1 && WcReports("video-view",videoObj[0].title)} 
                {flag1video && this.sendReport()} 
                </div>                                                         
            );
        }
    };