import React from 'react';
import absolutizeSrc from './absolutizeSrc';
import "../../../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';

const WcPlayer = ({ ...props}) => {
    props.src = absolutizeSrc(props.src);
    props.poster = absolutizeSrc(props.poster);
    return <Player {...props}/>
};

export default WcPlayer;