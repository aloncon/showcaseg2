"use strict";var precacheConfig=[["/index.html","b0d01cfc7444cc8df36943f96d92ed6d"],["/static/css/main.12512d1a.css","c3f12ae7f97e072b593ae57e052e2bb9"],["/static/js/main.1d74e4a8.js","a356e07644a4ff9037441f2ae678afd1"],["/static/media/1-s.77dade5e.jpg","77dade5ee358ec57bc81f1f29411a49b"],["/static/media/1.6bcc4939.jpg","6bcc4939296414b99df0bf491240f105"],["/static/media/2-s.a6b46068.jpg","a6b4606825277cb21905eff52b40fb66"],["/static/media/2.e60130d3.jpg","e60130d3d124b81ee0d2fe02b76113c6"],["/static/media/3-s.3fc36895.jpg","3fc368952dbd303e4191fa0c817b64bc"],["/static/media/3.b5e2ffbc.jpg","b5e2ffbcf2481095f987651d68337ad6"],["/static/media/4-s.62316668.jpg","623166686fcf21a6cebc477961607264"],["/static/media/4.b88a7fbf.jpg","b88a7fbfd30b257e1193a46797cecae8"],["/static/media/5-s.0916b42d.jpg","0916b42d5a8bf70dcee7d60bf11e1673"],["/static/media/5.668f3ef4.jpg","668f3ef429449d7ddac8457f5dbf0ea3"],["/static/media/9b54e547-b5ae-43ca-950a-07b77bdc8ffe.81de127f.jpg","81de127fb69fe77bff778a73eee86730"],["/static/media/9b54e547-b5ae-43ca-950a-07b77bdc8ffe.afa1af3e.png","afa1af3e9ab763f271daf954baf5f875"],["/static/media/Kaspersky_Magic_Quadrant_2016.788ff2af.pdf","788ff2af24ff6e17b8dabcac4a0d49c8"],["/static/media/Q4_16_KSV_New_Customer.0f192fad.pdf","0f192fad3bd5ba997c459fdfee8a98a6"],["/static/media/Q4_16_VSB_Customer_Provantage.6a09a387.pdf","6a09a387da15ed018d3614cb380b9bfb"],["/static/media/SYM-BLK-wide.71ccfa13.png","71ccfa13f10df8f16e1f740225001a3e"],["/static/media/USP5-02@0.5x.9305080b.webm","9305080bdb468c3ad78813517e2e19ec"],["/static/media/announcementVideoBackground - Copy.8400f8c6.jpg","8400f8c609b8dccf66e4da1cbc16162f"],["/static/media/announcementVideoBackground.1ef16737.jpg","1ef16737095bef7e93f3c25303eafafc"],["/static/media/ecosystem.ef4e8b3a.png","ef4e8b3a8a73be34a4ec31712481f81c"],["/static/media/grid.362e6d66.svg","362e6d6620157d640041e68d926933cf"],["/static/media/hamburger.f7d24c36.svg","f7d24c365251dc8655bab5f384aa1b28"],["/static/media/icon-close-white_.1989b3ab.svg","1989b3ab03dbc0fd8842deea531956d4"],["/static/media/icon-icon-minus-regular.365bdd2f.svg","365bdd2f68f52af02bd4b5d12140bb76"],["/static/media/icon-icon-plus-regular.42817a44.svg","42817a445e55825f8e3f5e022c81aa72"],["/static/media/index.71065a9a.less","71065a9acdfcbaecba17db35e17c9ac5"],["/static/media/list.ebc7763f.svg","ebc7763fa4e8e24cb91579409d2615c6"],["/static/media/office-365-hero-950x180_1.6def17d1.svg","6def17d13bdd4e5c51a770ad77e292d0"],["/static/media/office-365-hero-950x180_1.f2834a66.jpg","f2834a66d8f9a5eb4bcc7f5c8aebf8f3"],["/static/media/posterTest.3e6c87a5.jpg","3e6c87a5007813b8a52f222c47efdc49"],["/static/media/slick.b7c9e1e4.woff","b7c9e1e479de3b53f1e4e30ebac2403a"],["/static/media/slick.ced611da.eot","ced611daf7709cc778da928fec876475"],["/static/media/slick.d41f55a7.ttf","d41f55a78e6f49a5512878df1737e58a"],["/static/media/slick.f97e3bbf.svg","f97e3bbf73254b0112091d0192f17aec"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),n=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,c),e=urlsToCacheKeys.has(t));var n="/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});