import React, { Component } from 'react'
import VideoGalleryComp from '../../system/codes/videoGallery.js';

import videoTest from '../assets/video/videoTest.mp4'
import posterTest from '../assets/video/posterTest.jpg'

/*
##########Video Gallery Documention:##########
##############################################

This video gallery component based on our oldest webcollage video gallery that was on the old showcase. the design remains the same.

The video gallery is fully responsive, flexabe, and adopted to mobile.

**************************************************************************
****************            Features:                     ****************
**************************************************************************

1. support mp4, webm files. 
2. support both absulote links and local video sources.

**************************************************************************
****************           Fuctionality:                  ****************
**************************************************************************

1. Working with a built array.
    1.1. each node of the array contains:
        - videoTitle - title for the video      (optional)
        - videoPoster - poster for the video    (mandatory)
        - videoSrc - src for the video          (mandatory)
2. CSS Settings:
    2.1 cange width of player
    2.2 cange background color for thumbnails
    2.3 chnage background color/text color for duration tag.
3. Autoplay - can autoplay the videos if chosen.

**************************************************************************
****************    Include the component at a page:      ****************
**************************************************************************

1. Import {VideoGallery} from '../modules/VideoGallery';
2. Put <VideoGallery />  where you want the video galley.


*/
const wcvg_info = [
    {   
        videoTitle: "Video 1" , 
        videoPoster: posterTest, 
        videoSrc: videoTest
    },
    {   
        videoTitle: "Video 3" , 
        videoPoster:"http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_WashSystem_Video-Still.jpg.w960.jpg", 
        videoSrc: "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_WashSystem.mp4.mp4full.mp4"
    },
    {   
        videoTitle: "Video 5" , 
        videoPoster: "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_SmartBoost_Video-Still.jpg.w960.jpg", 
        videoSrc: "http://media-itest1.webcollage.net/rlfp/wc/test/module/electroluxus/wcdevres/videogallery_landing/videos/LuxCare_SmartBoost.mp4.mp4full.mp4"
    }
]

const videoGallerySettings = {
    autoPlay                    :   false,   //  Boolean - 'false' as default
    playerWidth                 :   '98%',   // (100% as Default)
    thumbnailAlignment          :   '',      // Left/Center/Right ('Left' as Default)
    thumbnailBackgroundColor    :   '',      // ('#ffffff' as  as Default)
    durationBackgroundColor     :   '',      // ('#000000' as  as Default)
    durationTextColor           :   '',      // ('#ffffff' as  as Default)
    
}


/* DO NOT CHANGE THIS PART UNLESS NECCESARY */
class VideoGallery extends Component {
    render() {
      return (
        <div>               
            <VideoGalleryComp data_info={wcvg_info} data_settings={videoGallerySettings} /> 
        </div>
      );
    }
}

export {
    VideoGallery
} 