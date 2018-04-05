/* eslint-disable  jsx-a11y/anchor-has-content */
/* The component's children are in the props */

import React from 'react';
import absolutizeSrc from './absolutizeSrc';
import '../../style/wcLink.css';

const WcLink = ({ ...props }) => {
   const href = absolutizeSrc(props.href);
   const type = props.WcOpenAs || '_blank';
   const height = props.WcHeight || '600';
   const width = props.WcWidth || '600';
   const onClickFunc = props.onClick || null;

   if (type === 'popup') {
      props.onClick = event => {
         event.preventDefault();
         if (onClickFunc) {
            onClickFunc();
         }
         window.open(href, '_blank', `height=${height},width=${width}`);
      };
   } else {
      props.target = type;
   }

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