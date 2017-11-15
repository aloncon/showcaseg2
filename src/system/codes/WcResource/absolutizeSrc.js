import moduleInfo from '../moduleInfo';

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

export default absolutizeSrc;