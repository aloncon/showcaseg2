import React from 'react';
import IframExecutor from '../IframExecutor';
import absolutizeSrc from './absolutizeSrc';

const WcIframe = ({ ...props}) => {
  props.src = absolutizeSrc(props.src);
  return <IframExecutor {...props}/>
};

export default WcIframe;