/* eslint-disable no-script-url */

import React from 'react';
import absolutizeSrc from './absolutizeSrc';
import "../../../../node_modules/video-react/dist/video-react.css";
import { Player , BigPlayButton } from 'video-react';
import "../../../../node_modules/video-react/dist/video-react.css";

function ShowOverlay() {
    //document.getElementById('wcOverlay').style.display = "block"
    document.getElementById('video-view').style.display = "block";
}


const WcOverlayVideo = ({ ...props}) => {
     props.src = absolutizeSrc(props.src);
    // props.poster = absolutizeSrc(props.poster);


    return (
        <div style={{display:'inline'}} >
            {props.tag === 'a' ?
                <a href="javascript:void(0)" onClick={() => ShowOverlay()}>{props.value}</a>
                :  props.tag === 'div' ?
                        <div id={props.id} className={props.className} onClick={() => ShowOverlay()}  style={{cursor:'pointer'}}>{props.value}</div>
                    :
                        <span id={props.id} className={props.className} onClick={() => ShowOverlay()}  style={{cursor:'pointer'}}>{props.value}</span>
            }
              
            { delete props.id }
            { delete props.className }
            { delete props.tag }
            { delete props.value }

            <div id="video-view">
                <div className="overlay"></div>
                <span className="close-video" onClick={() => document.getElementById('video-view').style.display = "none"} >X</span>
                <div className='class-video' style={{width:'695px',height:'400px'}}>
                    <Player {...props}>
                        <BigPlayButton position="center" />
                    </Player>
                </div>
            </div>
        </div>
    )
    // return (
    //         
            
    //        )
    // ;
};

export default WcOverlayVideo;