




/*var assets = document.getElementsByTagName( 'img' );
var len = assets.length
var absoluteAddr;
for(var i =0; i < len; i++) {
  //if(assets[i].src.search("<your JS file name") > 0 && scripts[i].src.lastIndexOf("/") >= 0) {
     absoluteAddr = assets[i].src.substring(0, assets[i].src.lastIndexOf("/") + 1);
    
  //   }
  }
alert(len + ' xx ' + absoluteAddr);
*/

/*
function ScriptPath() {
  alert('xxss');  
  var scriptPath = '';
  try {
    //Throw an error to generate a stack trace
    throw new Error();
  }
  catch(e) {
    //Split the stack trace into each line
    var stackLines = e.stack.split('\n');
    var callerIndex = 0;
    //Now walk though each line until we find a path reference
    for(var i in stackLines){
      if(!stackLines[i].match(/http[s]?:\/\//)) continue;
      //We skipped all the lines with out an http so we now have a script reference
      //This one is the class constructor, the next is the getScriptPath() call
      //The one after that is the user code requesting the path info (so offset by 2)
      callerIndex = Number(i) + 2;
      break;
    }
    //Now parse the string for each section we want to return
    pathParts = stackLines[callerIndex].match(/((http[s]?:\/\/.+\/)([^\/]+\.js)):/);
  }

  this.fullPath = function() {
    return pathParts[1];
  };

  this.path = function() {
    return pathParts[2];
  };

  this.file = function() {
    return pathParts[3];
  };

  this.fileNoExt = function() {
    var parts = this.file().split('.');
    parts.length = parts.length != 1 ? parts.length - 1 : 1;
    return parts.join('.');
  };
}
*/