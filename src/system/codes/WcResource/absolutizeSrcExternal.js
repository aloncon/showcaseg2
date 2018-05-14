import absolutizeSrc from './absolutizeSrc';

const absolutizeSrcExternal = (href,type) => {
  let fixHref = href;
  if(type==='ext'){
    if (href.startsWith('mailto:')) {
      document.location = fixHref;
    }
    else{
      if (!href.startsWith('http')) {
        fixHref = `http://${href}`;
      }
      window.open(fixHref,'_blank');
    }
  }else{
    window.open(absolutizeSrc(href),'_blank');
  }

};

export default absolutizeSrcExternal;