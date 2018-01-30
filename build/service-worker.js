"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/index.html","32e9bbacfcb38422365f2229794e5d87"],["/static/css/main.89eeac33.css","91ed70f9c8bd25558f695298bfb62436"],["/static/js/main.59e67d95.js","8a00a3b9f64f631ab471324b7167df51"],["/static/media/1-s.77dade5e.jpg","77dade5ee358ec57bc81f1f29411a49b"],["/static/media/1.6bcc4939.jpg","6bcc4939296414b99df0bf491240f105"],["/static/media/2-s.a6b46068.jpg","a6b4606825277cb21905eff52b40fb66"],["/static/media/2.e60130d3.jpg","e60130d3d124b81ee0d2fe02b76113c6"],["/static/media/3-s.3fc36895.jpg","3fc368952dbd303e4191fa0c817b64bc"],["/static/media/3.b5e2ffbc.jpg","b5e2ffbcf2481095f987651d68337ad6"],["/static/media/4-s.62316668.jpg","623166686fcf21a6cebc477961607264"],["/static/media/4.b88a7fbf.jpg","b88a7fbfd30b257e1193a46797cecae8"],["/static/media/5-s.0916b42d.jpg","0916b42d5a8bf70dcee7d60bf11e1673"],["/static/media/5.668f3ef4.jpg","668f3ef429449d7ddac8457f5dbf0ea3"],["/static/media/9b54e547-b5ae-43ca-950a-07b77bdc8ffe.81de127f.jpg","81de127fb69fe77bff778a73eee86730"],["/static/media/9b54e547-b5ae-43ca-950a-07b77bdc8ffe.afa1af3e.png","afa1af3e9ab763f271daf954baf5f875"],["/static/media/Kaspersky_Magic_Quadrant_2016.788ff2af.pdf","788ff2af24ff6e17b8dabcac4a0d49c8"],["/static/media/Q4_16_KSV_New_Customer.0f192fad.pdf","0f192fad3bd5ba997c459fdfee8a98a6"],["/static/media/Q4_16_VSB_Customer_Provantage.6a09a387.pdf","6a09a387da15ed018d3614cb380b9bfb"],["/static/media/README.a7f94081.md","a7f94081ad3d670ecc58a13903cdbd6b"],["/static/media/SYM-BLK-wide.71ccfa13.png","71ccfa13f10df8f16e1f740225001a3e"],["/static/media/Thumbs.70f02254.db","70f022545eb822a217830d6e01f5f4b9"],["/static/media/Thumbs.839f8f47.db","839f8f4704a589e0d0b076e3f5ab4825"],["/static/media/Thumbs.93d8c0ae.db","93d8c0ae52faaeb78239c0db86964602"],["/static/media/USP5-02@0.5x.9305080b.webm","9305080bdb468c3ad78813517e2e19ec"],["/static/media/angle-down-flat.b9982bb3.svg","b9982bb381570bde48ee8f2034a98a68"],["/static/media/angle-up-flat.2501aa7c.svg","2501aa7cf3f00f3489b2f4b215d046ff"],["/static/media/announcementVideoBackground.8400f8c6.jpg","8400f8c609b8dccf66e4da1cbc16162f"],["/static/media/bullet.ea56bd88.svg","ea56bd88c50b68b83f659b2e965ef347"],["/static/media/checkmark.00a4e922.svg","00a4e92272e49cf5a84e595fd4126ae8"],["/static/media/closeButton.8d265d3b.png","8d265d3bfee419b4196db83d3cd2356d"],["/static/media/grid.362e6d66.svg","362e6d6620157d640041e68d926933cf"],["/static/media/hamburger.f7d24c36.svg","f7d24c365251dc8655bab5f384aa1b28"],["/static/media/hamburger2.18e8eb24.svg","18e8eb24997be99854c618429d0a9fa8"],["/static/media/icon-angle-down.84c265c7.svg","84c265c7cac061cdeef6b61f0f5fe78c"],["/static/media/icon-angle-left.09669fda.svg","09669fdabd7b06481c71049f6515ca53"],["/static/media/icon-angle-right.9d771e5a.svg","9d771e5a1100c36a715c7f11e657204c"],["/static/media/icon-angle-up.817d7d50.svg","817d7d50040313b37e24947080ff52fd"],["/static/media/icon-arrows.cbdf665c.svg","cbdf665c609c57ccdd43a1473d328b28"],["/static/media/icon-close_.3fc43b05.svg","3fc43b05f623f18d441f96234f6d2a0a"],["/static/media/icon-double-down.4be39dcb.svg","4be39dcb0adbeb11e9ec936b98510b8d"],["/static/media/icon-double-left.e63b8714.svg","e63b8714430a013aacf0bca46e0ae4d5"],["/static/media/icon-double-right.725e0b85.svg","725e0b85fedac41c87d9190745b8d342"],["/static/media/icon-double-up.74cc97d6.svg","74cc97d673f6c5494c17dfd56ef28f12"],["/static/media/icon-full-screen_.f193a288.svg","f193a288f416b4f243683a0722ad201c"],["/static/media/icon-i.a4f346c9.svg","a4f346c94d85cd9a51bb2ba00a4b8a8c"],["/static/media/icon-icon-close-regular.15940508.svg","1594050885b66763a1552ba4579662af"],["/static/media/icon-icon-minus-regular.365bdd2f.svg","365bdd2f68f52af02bd4b5d12140bb76"],["/static/media/icon-icon-plus-regular.42817a44.svg","42817a445e55825f8e3f5e022c81aa72"],["/static/media/icon-minimize-screen_.83685fb3.svg","83685fb31670670bbfeaaab0bc5b8e7b"],["/static/media/icon-minus.15b9b3d9.svg","15b9b3d9e9bb88e5944bf86663ef578e"],["/static/media/icon-pause-regular.cbd577b2.svg","cbd577b2424113025329c37361003ce4"],["/static/media/icon-pause.590e09a9.svg","590e09a9dca71bd243929f1c443247bb"],["/static/media/icon-play.7cd5d4b6.svg","7cd5d4b619b29c9e22091b701e980f2c"],["/static/media/icon-plus.f3e593e6.svg","f3e593e66c7d0941f48c7706d41571b1"],["/static/media/icon-rotate-clockwise.51f0ab78.svg","51f0ab78ef2f0b5b3286caefccec3294"],["/static/media/icon-rotate-counterclockwise_.dfbece16.svg","dfbece168ec1a439669f59d1c35be3f7"],["/static/media/icon-step-by-step.c3be9452.svg","c3be94523638fe3a6babb075c2afe225"],["/static/media/icon-video.1c87366f.svg","1c87366f3aedcc4621056c19f8337664"],["/static/media/info.b4df9b2f.svg","b4df9b2ffde004242b84012a25c97ed6"],["/static/media/list.ebc7763f.svg","ebc7763fa4e8e24cb91579409d2615c6"],["/static/media/logo.ee7cd8ed.svg","ee7cd8ed2dcec943251eb2763684fc6f"],["/static/media/more-info.e7c318c0.svg","e7c318c0d161792a31a72f448a909412"],["/static/media/mute.ca8b4169.svg","ca8b4169c0c26273084651d9f7c4e106"],["/static/media/next-video.2eaebe4b.svg","2eaebe4b7c68574694a436f6c1dba23d"],["/static/media/office-365-hero-950x180_1.6def17d1.svg","6def17d13bdd4e5c51a770ad77e292d0"],["/static/media/office-365-hero-950x180_1.f2834a66.jpg","f2834a66d8f9a5eb4bcc7f5c8aebf8f3"],["/static/media/pause.693893e3.svg","693893e3cf6204cad4c0e777dba8a089"],["/static/media/posterTest.3e6c87a5.jpg","3e6c87a5007813b8a52f222c47efdc49"],["/static/media/previous-video.555d276a.svg","555d276ac310ca49c25411f00336c835"],["/static/media/related-products.ab382be3.svg","ab382be36ab4033c97f679163207466b"],["/static/media/search.fb7466bc.svg","fb7466bcbe4b96844c87bd664e01b919"],["/static/media/slick.b7c9e1e4.woff","b7c9e1e479de3b53f1e4e30ebac2403a"],["/static/media/slick.ced611da.eot","ced611daf7709cc778da928fec876475"],["/static/media/slick.d41f55a7.ttf","d41f55a78e6f49a5512878df1737e58a"],["/static/media/slick.f97e3bbf.svg","f97e3bbf73254b0112091d0192f17aec"],["/static/media/sound-middle.c0ae6efb.svg","c0ae6efb5d21499c82d9ad7f931e810b"],["/static/media/sound.7a1807cc.svg","7a1807cc7ed7e82a840934d92f454f7a"],["/static/media/subtitles.e4d580b3.svg","e4d580b30285dff17b7496c057d3d9e0"],["/static/media/toggle-down.1cc81412.svg","1cc814121a021d330e16a54ce8d29304"],["/static/media/toggle-left.4a615455.svg","4a615455ed5006e7cecfaec564eceef9"],["/static/media/toggle-right.a6e8102d.svg","a6e8102d2f8c07b7cec01096d634e4fd"],["/static/media/toggle-up.1bfbcd5b.svg","1bfbcd5bb8b4db51e2ef9075c8c4d20e"],["/static/media/videos.ec7521cc.svg","ec7521cc900614e8e9ee45ec71afb74b"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var c=new URL(e);return"/"===c.pathname.slice(-1)&&(c.pathname+=a),c.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,c,t){var d=new URL(e);return t&&d.pathname.match(t)||(d.search+=(d.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(c)),d.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var c=new URL(a).pathname;return e.some(function(e){return c.match(e)})},stripIgnoredUrlParameters=function(e,a){var c=new URL(e);return c.hash="",c.search=c.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),c.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],c=e[1],t=new URL(a,self.location),d=createCacheKey(t,hashParamName,c,/\.\w{8}\./);return[t.toString(),d]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(c){if(!a.has(c)){var t=new Request(c,{credentials:"same-origin"});return fetch(t).then(function(a){if(!a.ok)throw new Error("Request for "+c+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(c,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(c){return Promise.all(c.map(function(c){if(!a.has(c.url))return e.delete(c)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,c=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(c))||(c=addDirectoryIndex(c,"index.html"),a=urlsToCacheKeys.has(c));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(c=new URL("/index.html",self.location).toString(),a=urlsToCacheKeys.has(c)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(c)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});