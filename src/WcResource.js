import React from 'react';


export default ({children}) => (console.log(children), (
    <span>
        {absolutizeChildren(children)}
    </span>
));

const getScriptURL = (function() {
    const scripts = document.getElementsByTagName('script');
    const index = scripts.length - 1;
    const myScript = scripts[index];
    return function() { return myScript.src; };
})();

function getSrcBase(scriptUrl) {
    if (scriptUrl.includes('rawgit.com')) {
            console.log('in git!')
            return `https://rawgit.com/aloncon/showcaseg2/master/build/`;             
    }

    if (scriptUrl.includes('media-preview.')) {
            console.log('in stage!')
            return `http://media-preview.webcollage.net/rwvfp/wc/live/99999991/module/webcollage/_wc/react_showcase/showcase-app-1/`; 
            //src = `http://media-preview.webcollage.net/rwvfp/wc/live/99999991/module/webcollage/_wc/react_showcase/showcase-app-1/${src}`;        
    }

    if (scriptUrl.includes('www.test.')) {
            console.log('in test!')
            return `http://www.test.webcollage.webcollage.net/_wc/react_showcase/showcase-app-1/`;
    }

    if (scriptUrl.includes('localhost:')) {
            console.log('in test!')
            return `http://localhost:3000`;
    }
    
  //localhost  
   return null; 
}

const scriptUrl = getScriptURL();
console.log('original JS src', scriptUrl);
const srcBase = getSrcBase(scriptUrl);
console.log('base Src' + srcBase);

const absolutizeChildren = (child) => {
    let src = child.props.src;
    console.log('original Element src', src);

    if (!src || src.startsWith('data:'))
        return child;

    
    if (scriptUrl.includes('localhost') && (window.location.href.indexOf("://localhost:")!= -1))
        return child;

console.log("window.location.href:" + window.location.href);
console.log("window.location.href:" + (window.location.href.indexOf("://localhost:")== -1) );
    if (scriptUrl.includes('localhost') ){
        console.log("IFFF window.location.href:" + window.location.href);
        return <img {...child.props} src={srcBase+src} />;
    }


    console.log('final src!', src);
    //child.props.src = src;
    child.props.src = `${srcBase}${src}`;

    return child
};
