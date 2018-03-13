/* eslint-disable  jsx-a11y/alt-text*/
/* all images should already have the `alt` value in props */

import React from 'react';
import absolutizeSrc from './absolutizeSrc';

const WcImg = ({ ...props}) => {
  props.src = absolutizeSrc(props.src);
  return <img {...props}/>
};

export default WcImg;