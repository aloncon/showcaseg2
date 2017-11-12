import React from 'react';
import moduleInfo from './moduleInfo.js';
import { Player } from 'video-react';

const WcImg = ({ ...props}) => {
    props.src = absolutizeSrc(props.src); 
    return <img {...props}/>
};

const WcLink = ({ ...props}) => {
    if (props.src){
        props.src = absolutizeSrc(props.src); 
        return <a {...props}/>
    }else{
        props.href = absolutizeSrc(props.href);
        return <a {...props}/>
    }

};

const WcPlayer = ({ ...props}) => {
    props.src = absolutizeSrc(props.src);
     return <Player {...props}/>
};

const absolutizeSrc= (src) => {
    let srcBase = moduleInfo.showcaseprefix; 
    let scriptUrl = moduleInfo.scriptsrcbaseurl;

    if (!src || src.startsWith('data:') || src.startsWith('http')){
        return src;
    }

    if (scriptUrl.includes('localhost') && (window.location.href.indexOf("://localhost:")!== -1)){
        return src;
    }

    if (scriptUrl.includes('localhost') ){
        return srcBase+src;
    }

    return `${srcBase}${src}`;
};

export { WcImg , WcLink , WcPlayer };