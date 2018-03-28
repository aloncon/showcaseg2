import React from 'react';
import IframExecutor from '../IframExecutor';
import IframExternal from '../IframExternal';
import absolutizeSrc from './absolutizeSrc';

const WcIframe = ({ ...props}) => {
  if(props.src.startsWith("http")){
    return <IframExternal {...props}/>
  }
  props.src = absolutizeSrc(props.src);
  return <IframExecutor {...props}/>
};

export default WcIframe;