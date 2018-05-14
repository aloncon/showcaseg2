/* eslint-disable  jsx-a11y/anchor-has-content */
/* The component's children are in the props */

import React from 'react';
import absolutizeSrc from './absolutizeSrc';
import '../../style/wcLink.css';

/**
 * @returns {HTMLElement} A normal `<a>` HTML element. With a absolutize src, depends on the environment, also have all the other given attributes.
 * @param {object} WcOpenAs  A JavaScript object:
 *
 * If *WcOpenAs* is not provided, the type is not *popup* or the *WcOpenAs* is not typeof string that equal to *popup* the *default* type will be *_blank*, and will open the target in a new tab.
 *
 *
 * *WcOpenAs*: String
 * At the moment it can be only *popup*, if this is the case it will be open as popup in the default width/height values.
 *
 * *WcOpenAs* Object:
 *
 * * **type**: There is only one option at the moment: "*popup*", which will open the target in a _popup_ window with the *default* dimensions: `600x600`.
 * * **WcHeight**: - The height of the popup.
 * * **WcWidth**: - The width of the popup.
 *
 * For example: `WcOpenAs={{type: 'popup',WcWidth: 500, WcHeight: 300 }}`
 *
 * @param {object} props All the regular `<a>` attribute, like: _href_, _alt_, _className_, _onClick_ etc.
 */
const WcLink = ({ WcOpenAs, ...props }) => {
   const absolutizeHref = absolutizeSrc(props.href);
   const type = (WcOpenAs && WcOpenAs.type) || (typeof(WcOpenAs) === 'string' && WcOpenAs) || '_blank';
   const height = (WcOpenAs && WcOpenAs.WcHeight) || '600';
   const width = (WcOpenAs && WcOpenAs.WcWidth) || '600';
   const onClickFunc = props.onClick || null;

   if (type === 'popup') {
      props.onClick = event => {
         event.preventDefault();
         if (onClickFunc) {
            onClickFunc();
         }
         window.open(absolutizeHref, '_blank', `height=${height},width=${width}`);
      };
   } else {
      props.target = type;
   }

   // replace the local href to absolutize
   props.href = absolutizeHref;

   // delete un-html attributes
   delete props.WcOpenAs;
   delete props.WcHeight;
   delete props.WcWidth;

   if (props.className) {
      props.className = `${props.className} wcLink`;
   } else {
      props.className = 'wcLink';
   }

   return <a {...props} />;
};

export default WcLink;