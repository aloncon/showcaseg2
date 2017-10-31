$(function() {
	if (window.location.href.match(/.*domain=(.*)\-domain.*/)){
			
			
		// on resize -----------------------------------------------------------------------------------------------
			
			// sending a postMessage ,with new height of the iframe, to the parent
			function sendMessageHeight(){
				console.log("iframe height: " + (document.getElementsByClassName('creative-cloud')[0].clientHeight));
				parent.postMessage(JSON.stringify({"isWebcollage":true,"resizeH":document.getElementsByClassName('creative-cloud')[0].clientHeight + 50}), location.protocol + "//" + window.location.href.replace(/.*domain=(.*)\-domain.*/,"$1"));
			}  

			$( window ).resize(function() {
				sendMessageHeight();
			});   
			document.getElementsByClassName("cc-tabs-block")[0].addEventListener("click", sendMessageHeight);
			var faqEl = document.getElementsByClassName('cc-accordion-title');
			for (var  i=0 ; i < faqEl.length; i++) {
				faqEl[i].addEventListener("click", sendMessageHeight); 
			}

		// end on resize --------------------------------------------------------------------------------------------
		// var CCBhref = window.location.href.replace(/.*CCBlink\-(.*)\-CCBlink.*/,"$1");
		var CCBhref = window.location.href;
			
		if(CCBhref.indexOf("ismail=t") != -1){			
			$(".cc-contact-blocks .cc-contact-block:nth-child(2) p.cc-contact-action a").attr("href", "mailto:"+decodeURIComponent(CCBhref.replace(/.*textmail=(.*)\-endmail.*/,"$1")) )  ;
		}

	}
});

