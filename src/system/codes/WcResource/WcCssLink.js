import React from 'react';
import absolutizeSrc from './absolutizeSrc';

const WcCssLink = ({ ...props}) => {
  const href = absolutizeSrc(props.href);
 
  props.href = href;

  return <link {...props} />
};

export default WcCssLink;