import React from 'react';
import EntryPoint from '../../../custom_content/modules/entrypoint';
import absolutizeSrc from './absolutizeSrc';

const WcIframe = ({ ...props}) => {
  props.src = absolutizeSrc(props.src);
  return <EntryPoint {...props}/>
};

export default WcIframe;