import WcShowcase from '../moduleInfo';

const absolutizeSrc = src => {
   let srcBase = WcShowcase.showcasePrefix;
   let scriptUrl = WcShowcase.scriptsrcbaseurl;

   if (!src || src.startsWith('data:') || src.startsWith('http')) {
      return src;
   }

   if (scriptUrl.includes('localhost') && window.location.href.indexOf('://localhost:') !== -1 && window.location.href.indexOf('standalone/index.html') === -1) {
      return src;
   }

   if (scriptUrl.includes('localhost')) {
      return srcBase + src.replace(/^\./, '');
   }

   return `${srcBase}${src}`;
};

export default absolutizeSrc;
