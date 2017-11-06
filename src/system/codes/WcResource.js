import React from 'react';
import moduleInfo from './moduleInfo.js';

export default ({children}) => (console.log(children), (
    <span>
        {absolutizeChildren(children)}
    </span>
));

// const Img = (props) => absolutizeChildren(<img {...props}/>);
// const Video = (props) => absolutizeChildren(<Player {...props}/>);



const absolutizeComponent = (Comp) => ({ children, ...props}) => {
  return absolutizeChildren(<Comp {...props}>{children}</Comp>);
};



const Img = absolutizeComponent(React.DOM.img);
const Video = absolutizeComponent(Player);

<Video src="http/....">
    <Sources>{[]}</Sources>
</Video>


const absolutizeChildren = (child) => {
    let src = child.props.src;
    let srcBase = moduleInfo.showcaseprefix;    
    let scriptUrl = moduleInfo.scriptsrcbaseurl;
    console.log('original Element src', src);

    if (!src || src.startsWith('data:'))
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
