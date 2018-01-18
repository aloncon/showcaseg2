"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/index.html","591381b5e30bea1e935bcc27712bb321"],["/static/css/main.9b7d85e5.css","6ff73a247d171bb97f861a647343d580"],["/static/js/main.0b18f601.js","e036a39259e2766f46dd14502930b6ae"],["/static/media/1-s.77dade5e.jpg","77dade5ee358ec57bc81f1f29411a49b"],["/static/media/1.6bcc4939.jpg","6bcc4939296414b99df0bf491240f105"],["/static/media/2-s.a6b46068.jpg","a6b4606825277cb21905eff52b40fb66"],["/static/media/2.e60130d3.jpg","e60130d3d124b81ee0d2fe02b76113c6"],["/static/media/3-s.3fc36895.jpg","3fc368952dbd303e4191fa0c817b64bc"],["/static/media/3.b5e2ffbc.jpg","b5e2ffbcf2481095f987651d68337ad6"],["/static/media/4-s.62316668.jpg","623166686fcf21a6cebc477961607264"],["/static/media/4.b88a7fbf.jpg","b88a7fbfd30b257e1193a46797cecae8"],["/static/media/5-s.0916b42d.jpg","0916b42d5a8bf70dcee7d60bf11e1673"],["/static/media/5.668f3ef4.jpg","668f3ef429449d7ddac8457f5dbf0ea3"],["/static/media/Kaspersky_Magic_Quadrant_2016.788ff2af.pdf","788ff2af24ff6e17b8dabcac4a0d49c8"],["/static/media/Q4_16_KSV_New_Customer.0f192fad.pdf","0f192fad3bd5ba997c459fdfee8a98a6"],["/static/media/Q4_16_VSB_Customer_Provantage.6a09a387.pdf","6a09a387da15ed018d3614cb380b9bfb"],["/static/media/announcementVideoBackground.8400f8c6.jpg","8400f8c609b8dccf66e4da1cbc16162f"],["/static/media/closeButton.8d265d3b.png","8d265d3bfee419b4196db83d3cd2356d"],["/static/media/grid.362e6d66.svg","362e6d6620157d640041e68d926933cf"],["/static/media/hamburger.f7d24c36.svg","f7d24c365251dc8655bab5f384aa1b28"],["/static/media/icon-icon-minus-regular.365bdd2f.svg","365bdd2f68f52af02bd4b5d12140bb76"],["/static/media/icon-icon-plus-regular.42817a44.svg","42817a445e55825f8e3f5e022c81aa72"],["/static/media/list.ebc7763f.svg","ebc7763fa4e8e24cb91579409d2615c6"],["/static/media/office-365-hero-950x180_1.f2834a66.jpg","f2834a66d8f9a5eb4bcc7f5c8aebf8f3"],["/static/media/posterTest.3e6c87a5.jpg","3e6c87a5007813b8a52f222c47efdc49"],["/static/media/slick.b7c9e1e4.woff","b7c9e1e479de3b53f1e4e30ebac2403a"],["/static/media/slick.ced611da.eot","ced611daf7709cc778da928fec876475"],["/static/media/slick.d41f55a7.ttf","d41f55a78e6f49a5512878df1737e58a"],["/static/media/slick.f97e3bbf.svg","f97e3bbf73254b0112091d0192f17aec"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),n=createCacheKey(c,hashParamName,a,/\.\w{8}\./);return[c.toString(),n]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var c=new Request(a,{credentials:"same-origin"});return fetch(c).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});