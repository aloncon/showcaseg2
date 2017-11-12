import React, { Component } from 'react'
import VideoGallery from '../../system/codes/videoGallery.js';
import VideoTest from '../assets/video/videoTest.mp4';
import VideoTest2 from '../assets/video/videoTest1.mp4';

const wcvg_info = [
    [   "1" , 
        "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_SmartBoost_Video-Still.jpg.w960.jpg", 
        VideoTest],
    [   "2" , 
        "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_PerfectSteam_Video-Still.jpg.w960.jpg", 
        VideoTest2],
    [   "3" , 
        "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_WashSystem_Video-Still.jpg.w960.jpg", 
        "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_WashSystem.mp4.mp4full.mp4"]
]


const Wcvg_setting = '';

class Wcvg extends Component {
    render() {
      return (
        <div>               
            <VideoGallery data_info={wcvg_info} data_setting={Wcvg_setting}/> 
        </div>
      );
    }
}

export {
    Wcvg
} 