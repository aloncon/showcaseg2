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

/**
 *
 * @param {object} props All the `WcPlayer` props.
 * @param {object} wrapContentOptions (*MUST HAVE*)
 * * **id** - The id of the specific wrap element video overlay.
 * * **className** - The className of the all wrap elements video overlay in the component.
 * * **tag** - The type of the wrap element, the *+default+* is `<span>`, it could be also `<a>` or `<div>`
 * * **value** - The wrap element content.
 * @returns {React.Component} A `wrapContent` (depends the values in _`wrapContentOptions`_), onClick it will open a `WcPlayer` component which display as overlay video on the current page.
 */
const WcOverlayVideo = ({ wrapContentOptions, ...props }) => {
   props.src = absolutizeSrc(props.src);

   if (!wrapContentOptions) {
      console.error('The prop: wrapContentOptions, is undefined. You have to pass it to WcOverlayVideo');
   }

   const style = {
      cursor: 'pointer',
   };

   let WrapContent;

   if (wrapContentOptions.tag === 'a') {
      WrapContent = () => (
         <a href="javascript:void(0)" onClick={() => ShowOverlay()}>
            {wrapContentOptions.value}
         </a>
      );
   } else if (wrapContentOptions.tag === 'div') {
      WrapContent = () => (
         <div id={wrapContentOptions.id} className={wrapContentOptions.className} onClick={() => ShowOverlay()} style={style}>
            {wrapContentOptions.value}
         </div>
      );
   } else {
      WrapContent = () => (
         <span id={wrapContentOptions.id} className={wrapContentOptions.className} onClick={() => ShowOverlay()} style={style}>
            {wrapContentOptions.value}
         </span>
      );
   }

   return (
      <div style={{ display: 'inline' }}>
         <WrapContent />
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
};

export default WcOverlayVideo;
