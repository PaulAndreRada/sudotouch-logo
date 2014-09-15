//
// @codekit-prepend "processing.js";                                       
// @codekit-prepend "_logoSketch.js";                             

$(function(){ 
	
    // ACTIVATE SKETCH
    var canvas = document.getElementById("sudotouchCanvas");
    //
    // attaching the sketchProc function to the canvas
    var p = new Processing( canvas, $.fn.logoSketch );
    // p.exit(); to detach it

});