import React, { Component } from 'react'
import VideoGallery from '../../system/codes/videoGallery.js';

const wcvg_info = [
    [   "1" , 
        "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_SmartBoost_Video-Still.jpg.w960.jpg", 
        "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_SmartBoost.mp4.mp4full.mp4"],
    [   "2" , 
        "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_PerfectSteam_Video-Still.jpg.w960.jpg", 
        "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_PerfectSteam.mp4.mp4full.mp4"],
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