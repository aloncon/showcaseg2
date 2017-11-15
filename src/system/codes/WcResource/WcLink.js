import React from 'react';
import absolutizeSrc from './absolutizeSrc';

const WcLink = ({ ...props}) => {
  const href = absolutizeSrc(props.href);
  // console.log('lol',{props})
  let type   = props.WcOpenAs || '_blank';
  let height = props.WcHeight || '600';
  let width  = props.WcWidth || '600';

  if (type === 'popup') {
      props.onClick = () => window.open(href,'_blank',`height=${height},width=${width}`);
  } else {
      props.onClick = () => window.open(href,'_blank');
  }
  delete props.href;
  return <a {...props} />
};

export default WcLink;