
// if the $ object does not exist make it
if ( !window.$ ) {
    window.$ = {};
};
//
(function($){
    'use strict';
    //
    // create a module class if its not already present
    // needs an odd name to not clash with $ libraries
    if( !$.logoMods ){
	//
	$.logoMods = new Object();
	//
    };



    // MergeObjects
    // recursive merge of objects
    // from object one into object two
    $.logoMods.mergeObjects = function(obj1, obj2) {
	//
	for (var prop in obj2) {
	    try {
		// if property in destination is an object
		if ( obj2[prop].constructor === Object ) {
		    //
		    // merge recursive
		    obj1[prop] = this.mergeObjects( obj1[prop] ,
					       obj2[prop] );
		    //
		} else {
		    // directly make or overwrite the
		    // first objects property
		    obj1[prop] = obj2[prop];
		    //
		}
		//
	    } catch(e) {
		// Property in destination object not set;
		//create it and set its value.
		obj1[prop] = obj2[prop];
		//
		// return an error msg
		console.log( 'error' );
		console.log( e );
	    }
	}
	//
	return obj1;
    };

})($);// Anon Function



