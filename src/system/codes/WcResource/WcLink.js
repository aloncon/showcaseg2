/* eslint-disable  jsx-a11y/anchor-has-content */
/* The component's children are in the props */

import React from 'react';
import absolutizeSrc from './absolutizeSrc';
import '../../style/wcLink.css';

const WcLink = ({ ...props}) => {
  const href = absolutizeSrc(props.href);
  let type   = props.WcOpenAs || '_blank';
  let height = props.WcHeight || '600';
  let width  = props.WcWidth || '600';

  if (type === 'popup') {
      props.onClick = () => window.open(href,'_blank',`height=${height},width=${width}`);
  } else {
      props.onClick = () => window.open(href,'_blank');
  }
  // delete un-html attributes
  delete props.href;
  delete props.WcOpenAs;
  delete props.WcHeight;
  delete props.WcWidth;

  if (props.className) {
      props.className = `${props.className} wcLink`;
  } else {
      props.className = 'wcLink';
  }

  return <a {...props} />
};

export default WcLink;