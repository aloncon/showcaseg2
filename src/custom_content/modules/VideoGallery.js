import React, { Component } from 'react'
import VideoGallery , {getVideoDuration} from '../../system/codes/videoGallery.js';

import videoTest from '../assets/video/videoTest.mp4'
import posterTest from '../assets/video/posterTest.jpg'

//import video3 from '../assets/videoGallery/Avery Custom Print Flash Cards-1730775777001.mp4'


const wcvg_info = [
    {   videoTitle: "Video 1" , 
        videoPoster: posterTest, 
        videoSrc: videoTest
    },
    {   videoTitle:"Video 2" , 
        videoPoster:"http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_PerfectSteam_Video-Still.jpg.w960.jpg", 
        videoSrc: "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_PerfectSteam.mp4.mp4full.mp4"},
    {   videoTitle: "Video 3" , 
        videoPoster:"http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_WashSystem_Video-Still.jpg.w960.jpg", 
        videoSrc: "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_WashSystem.mp4.mp4full.mp4"}
    ,{   videoTitle: "Video 4" , 
        videoPoster:"https://cdn.vox-cdn.com/thumbor/JjF7WD0nHMvplJQbZYt9lb_ajLs=/800x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/8571065/spider_man_poster2.jpg", 
        videoSrc: "http://media-itest3.webcollage.net/rlfp/wc/test/module/autodeskus/_wc/videos/future-of-making-things-video-pro-res-hq-1080p-en.mp4.mp4full.mp4"
    },
    {   videoTitle: "Video 5" , 
    videoPoster: "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_SmartBoost_Video-Still.jpg.w960.jpg", 
    videoSrc: "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_SmartBoost.mp4.mp4full.mp4"
    },
    {   videoTitle:"Video 6" , 
        videoPoster:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5nkTAXQirUOrhpxRNXHPY9SKhtcyC97uKbxLIzyF-oQmrJae9DA", 
        videoSrc: "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_PerfectSteam.mp4.mp4full.mp4"},
    {   videoTitle: "Video 7" , 
        videoPoster:"https://i.imgur.com/zO4faen.jpg", 
        videoSrc: "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_WashSystem.mp4.mp4full.mp4"}
    ,{   videoTitle: "Video 8" , 
        videoPoster:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjkFKsuwhSCt7EkIJLsbAnOtBNRTPuwXK6wHk_jLkr79lGeRlq", 
        videoSrc: "http://media-itest3.webcollage.net/rlfp/wc/test/module/autodeskus/_wc/videos/future-of-making-things-video-pro-res-hq-1080p-en.mp4.mp4full.mp4"
    }
]


//const vid = getVideoDuration(wcvg_info);




const Wcvg_setting = '';

class Wcvg extends Component {
    render() {
      return (
        <div>               
            {/* <VideoGallery data_vid={vid} data_info={wcvg_info} data_setting={Wcvg_setting}/>  */}
            <VideoGallery data_info={wcvg_info} data_setting={Wcvg_setting}/> 
        </div>
      );
    }
}

export {
    Wcvg
} 