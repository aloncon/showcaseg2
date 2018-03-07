  //var url = "https//scontent.webcollage.net/cdw/showcase?showcase=adobe";

  var WebcollageShowcase = {};
     
	  console.log("xxx Y ",WebcollageShowcase);
  
  function buildDynamicLink (link){
   var my_link1 = document.createElement('link'); 
       my_link1.setAttribute('rel','stylesheet');
	   my_link1.setAttribute('type','text/css');
	  
	   my_link1.setAttribute('href', link); 
  
      return my_link1;
  }	  	  
  
  function buildDynamicScript (src){
   var my_script1 = document.createElement('script'); 
       my_script1.setAttribute('src',src);
	   	console.log("XXXXXXXXXXXXXXXX getParentElement scroipt 1  " ,my_script1.src)
   return my_script1;
  }
  
  function getScriptElement() {
    const scripts = document.getElementsByTagName('script');
    const index = scripts.length - 1;
    const myScript = scripts[index];
	console.log("get script url XX " + scripts + " index:"+ index);
	
    return myScript;
  }

 
  function initWebcollageVar(srcUri) {
    var environmentPrefx = location.protocol + "//media-itest3.webcollage.net/rlfp/wc/test/module/";
       
	  WebcollageShowcase.moduleId  = srcUri.replace(/.*showcase\=(.+)/,"$1");
	  WebcollageShowcase.partnerId = srcUri.replace(/.*\/([^\/]+)\/showcase\?.*/,"$1");
	  WebcollageShowcase.scriptSrc = environmentPrefx + WebcollageShowcase.moduleId + "/sg2/build/static/js/bundle.js?site="+ WebcollageShowcase.partnerId +"&context=context&Xws-entry=cdw-profile2";
	  WebcollageShowcase.srcBase   = environmentPrefx + WebcollageShowcase.moduleId + "/sg2/build/";	  
	  WebcollageShowcase.cssLink   = environmentPrefx + WebcollageShowcase.moduleId + "/sg2/build/static/css/main.css";
  } 
  
 function getParentElement(){
    // myScript.parentElement
    var script = getScriptElement();
	var parent = document.getElementById('wc-showcase-root');
	
	initWebcollageVar(script.src);
	
    console.log("script url XX " + script.src);
    if(parent == null && typeof script !== 'undefined'){
      //console.log("getParentElementtt  parent NULL: " + script.parentNode  );
      return script.parentNode;    
    } 
    
  return parent;
 }
	  
  function injectContent(){ 
      
	  var parent = getParentElement();
	  console.log("XXXXXXXXXXXXXXXX getParentElement " ,parent);

	  
	  var showcaseElement = '<div id="wc-showcase-root"></div>';
      parent.insertAdjacentHTML( 'beforeend', showcaseElement );
	  /* ************************************************************
	  position is the position relative to the element you are inserting adjacent to:
		'beforebegin' Before the element itself
		'afterbegin' Just inside the element, before its first child
		'beforeend' Just inside the element, after its last child
		'afterend' After the element itself
        ************************************************************ */
      //parent.appnndChild(parent_div);
	    console.log("XXXXXXXXXXXXXXXX getParentElement 2 " ,document.getElementById('wc-showcase-root'));
	
	  //document.head.appendChild(my_link1);	 
	  //parent.appendChild(my_script1);
      //parent.appendChild(my_script2);	 
	 document.head.appendChild(buildDynamicLink(WebcollageShowcase.cssLink) ); 
	 parent.appendChild( buildDynamicScript('https://scontent.webcollage.net/api/v2/product-content') );
	 parent.appendChild( buildDynamicScript(WebcollageShowcase.scriptSrc) ); 
	  
	  
  }

  
  console.log("XXXX Start");
  //setTimeout(function(){ console.log('injct '); injectContent();} , 5000);
  injectContent();
  console.log("XXXX END");	
   
 