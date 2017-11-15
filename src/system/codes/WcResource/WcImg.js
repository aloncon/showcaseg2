import React from 'react';
import absolutizeSrc from './absolutizeSrc';

const WcImg = ({ ...props}) => {
  props.src = absolutizeSrc(props.src);
  return <img {...props}/>
};

export default WcImg;