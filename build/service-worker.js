"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/index.html","d503634b3c002485e96849c4755d7bdf"],["/static/js/main.09729631.js","6fe5444c8794cfa7081d1bdee5424a9f"],["/static/media/1-s.f0ed4d46.jpg","f0ed4d4626da441faac915f0f69f6dd8"],["/static/media/1.ab7a5a0b.jpg","ab7a5a0b3b16fb0db92facc00021cf16"],["/static/media/2-s.3e2205c6.jpg","3e2205c6809b3c0217b904b7aaa46d05"],["/static/media/2.9fec14f2.jpg","9fec14f2ac8b37d15849d5d1906f9ca2"],["/static/media/3-s.d6872178.jpg","d68721789b775bdcc71a72f4110bb6e0"],["/static/media/3.e0f2de26.jpg","e0f2de261b94988ffd2eb801b6279e8f"],["/static/media/4-s.59f4f2c4.jpg","59f4f2c464cff10774bca1c1acecb76b"],["/static/media/4.1b9742c8.jpg","1b9742c815228fa4055fae379f82a980"],["/static/media/5-s.106be8ed.jpg","106be8edc04adb93f82e4488de44f58d"],["/static/media/5.65350a89.jpg","65350a893e822ec2f60f430ba45dcc1f"],["/static/media/9b54e547-b5ae-43ca-950a-07b77bdc8ffe.afa1af3e.png","afa1af3e9ab763f271daf954baf5f875"],["/static/media/Kaspersky_Magic_Quadrant_2016.788ff2af.pdf","788ff2af24ff6e17b8dabcac4a0d49c8"],["/static/media/Q4_16_KSV_New_Customer.0f192fad.pdf","0f192fad3bd5ba997c459fdfee8a98a6"],["/static/media/Q4_16_VSB_Customer_Provantage.6a09a387.pdf","6a09a387da15ed018d3614cb380b9bfb"],["/static/media/SYM-BLK-wide.71ccfa13.png","71ccfa13f10df8f16e1f740225001a3e"],["/static/media/glyphicons-halflings-regular.448c34a5.woff2","448c34a56d699c29117adc64c43affeb"],["/static/media/glyphicons-halflings-regular.89889688.svg","89889688147bd7575d6327160d64e760"],["/static/media/glyphicons-halflings-regular.e18bbf61.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["/static/media/glyphicons-halflings-regular.f4769f9b.eot","f4769f9bdb7466be65088239c12046d1"],["/static/media/glyphicons-halflings-regular.fa277232.woff","fa2772327f55d8198301fdb8bcfc8158"],["/static/media/logo.5d5d9eef.svg","5d5d9eefa31e5e13a6610d9fa7a283bb"],["/static/media/office-365-hero-950x180_1.be3d47f8.svg","be3d47f81f6fbc992cdaa263b9fbd1f2"],["/static/media/office-365-hero-950x180_1.f2834a66.jpg","f2834a66d8f9a5eb4bcc7f5c8aebf8f3"],["/static/media/slick.b7c9e1e4.woff","b7c9e1e479de3b53f1e4e30ebac2403a"],["/static/media/slick.ced611da.eot","ced611daf7709cc778da928fec876475"],["/static/media/slick.d41f55a7.ttf","d41f55a78e6f49a5512878df1737e58a"],["/static/media/slick.f97e3bbf.svg","f97e3bbf73254b0112091d0192f17aec"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),n=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),n]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("/index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});