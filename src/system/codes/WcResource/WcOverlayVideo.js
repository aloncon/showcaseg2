/* eslint-disable no-script-url */

import React from 'react';
import absolutizeSrc from './absolutizeSrc';
import '../../../../node_modules/video-react/dist/video-react.css';
import '../../style/overlay.css';
import { Player, BigPlayButton } from 'video-react';
import WcImg from './WcImg';
import ClosingBut from '../../resources/icons/svg/icon-close-white_.svg';

var bodyElem = document.getElementsByTagName('body')[0];

function ShowOverlay() {
   document.querySelector('.wcOverlayVideo video').load();
   document.getElementById('video-view').style.display = 'block';

   //calculate scrollbar size
   var previousWidth = bodyElem.offsetWidth;
   bodyElem.style.overflow = 'hidden';
   var scrollBarWidth = bodyElem.offsetWidth - previousWidth;
   bodyElem.style.paddingRight = scrollBarWidth + 'px';
}

function HideOverlay() {
   document.querySelector('.wcOverlayVideo video').pause();
   document.getElementById('video-view').style.display = 'none';
   bodyElem.style.overflow = 'auto';
   bodyElem.style.paddingRight = '0';
}

const WcOverlayVideo = ({ ...props }) => {
   props.src = absolutizeSrc(props.src);

   const style = {
      cursor: 'pointer',
   };

   if (props.childImage) {
      style.backgroundImage = `url(${props.childImage.src})`;
      style.backgroundRepeat = 'no-repeat';
      style.backgroundPosition = 'center';
      style.backgroundSize = 'cover';
      // style.display = 'inline-block';
      style.height = props.childImage.height;
      style.width = props.childImage.width;
   }
   return (
      <div style={{ display: 'inline' }}>
         {props.tag === 'a' ? (
            <a href="javascript:void(0)" onClick={() => ShowOverlay()}>
               {props.value}
            </a>
         ) : props.tag === 'div' ? (
            <div id={props.id} className={props.className} onClick={() => ShowOverlay()} style={style}>
               {props.value}
            </div>
         ) : (
            <span id={props.id} className={props.className} onClick={() => ShowOverlay()} style={style}>
               {props.value}
            </span>
         )}
         {delete props.id}
         {delete props.className}
         {delete props.tag}
         {delete props.value}

         <div id="video-view">
            <div className="wcOverlay" />
            <div className="wcOverlayVideo">
               <div className="wcCloseVideo" onClick={() => HideOverlay()}>
                  <WcImg src={ClosingBut} />
               </div>
               <Player {...props}>
                  <BigPlayButton position="center" />
               </Player>
            </div>
         </div>
      </div>
   );
   // return (
   //
   // )
   // ;
};

export default WcOverlayVideo;
