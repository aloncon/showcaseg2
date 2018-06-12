import absolutizeSrc from './absolutizeSrc';

const wcGoToURL = (href,type) => {
  let fixHref = href;
  if(type.indexOf("ext") > -1){
    if (href.startsWith('mailto:')) {
      document.location = fixHref;
    }else{
      if (!href.startsWith('http')) {
        fixHref = `http://${href}`;
      }
      if(type.indexOf("blank") > -1){
        window.open(fixHref,'_blank');
      }else{
        window.open(fixHref,'_top');
      }
        
    }
  }else{
    if(type.indexOf("blank") > -1){
      window.open(absolutizeSrc(href),'_blank');
    }else{
      window.open(absolutizeSrc(href),'_top');
    }    
    
  }

};

export default wcGoToURL;