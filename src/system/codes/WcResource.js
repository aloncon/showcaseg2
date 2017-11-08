import React from 'react';
import moduleInfo from './moduleInfo.js';

export default ({children}) => (console.log(children), (
    <span>
        {absolutizeChildren(children)}
    </span>
));

const absolutizeChildren = (child) => {
    let src = child.props.src;
    let srcBase = moduleInfo.showcaseprefix;    
    let scriptUrl = moduleInfo.scriptsrcbaseurl;
    console.log('original Element src', src);

    if (!src || src.startsWith('data:') || src.startsWith('http'))
        return child;
    if (scriptUrl.includes('localhost') && (window.location.href.indexOf("://localhost:")!= -1))
        return child;

    if (scriptUrl.includes('localhost') ){
        console.log("IFFF window.location.href:" + window.location.href);
        return <img {...child.props} src={srcBase+src} />;
    }


    console.log('final src!', src);
    //child.props.src = src;
    child.props.src = `${srcBase}${src}`;

    return child
};
