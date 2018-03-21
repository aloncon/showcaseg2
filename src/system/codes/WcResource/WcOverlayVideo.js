/* eslint-disable no-script-url */

import React from 'react';
import absolutizeSrc from './absolutizeSrc';
import "../../../../node_modules/video-react/dist/video-react.css";
import { Player , BigPlayButton } from 'video-react';
import "../../../../node_modules/video-react/dist/video-react.css";
import WcImg from './WcImg';
import ClosingBut from '../../resources/icons/svg/icon-close-white_.svg';

function ShowOverlay() {
    document.getElementById('video-view').style.display = "block";
    document.getElementsByTagName('body')[0].style.overflow = "hidden";
    document.getElementsByTagName('body')[0].style.paddingRight  = "17px";
}

function HideOverlay() {
    document.getElementById('video-view').style.display = "none";
    document.getElementsByTagName('body')[0].style.overflow = "auto";
    document.getElementsByTagName('body')[0].style.paddingRight  = "0";
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
                <div className='class-video'>
                <div className="close-video" onClick={() => HideOverlay()}>
                 <WcImg src={ClosingBut}/>
                </div>
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