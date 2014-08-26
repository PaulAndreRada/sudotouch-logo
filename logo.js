/*
 * Sudotouch logo v1
 *
 * Use the at sign to referance locations during searches
 * example : @top || @index
 *
 * procSketch 
 *
 * logocontroller || LC
 *
 * 
 */
// @IMPORTS 
// @codekit-prepend "/modules/_mergeObjects.js"
// @codekit-prepend "/modules/_boids.js"




if ( !window.$ ) {
    //
    // if no plugin is using $, make it
    window.$ = {};
    //
}
//
// pass the $ object into the scope
(function($){
    
    // Main processing function
    var procSketch = function( processing ) {
	//
	// Save the processing object
	var p = processing,
	// Sudotouch image size 
	imgW = 1600, //3000,
	imgH = 1200, //1106.24,
	// Use the image size to base the canvas ratio
	// do these variables to make sure the image 
	// coevers the canvas
	WIDTH = imgW,
	HEIGHT = imgH;




	// @logoController || @LC
	var LogoController = function( options ){
	    //
	    // Create the Object and it's default settings
	    var LC = {
		settings : {
		    boids :[],
		    boidAmount : 500,
		    strokeW : 0.01,
		    clusters : [{
			    color : p.color(  33, 65, 112, 255 ),
			    startPos : new p.PVector( 0,0 )
			}, {
			    color : p.color( 83, 95, 132, 255 ),
			    startPos : new p.PVector( 0,0 )
			}, {
			    color : p.color( 91, 131, 197, 200  ),
			    startPos : new p.PVector( 0,0 )
			}],
		    // state's position
		    position : 1,
		    positionMax : 4,
		    positionMin : 1
		} // settings
	    },
	    //
	    // shorten settings and merge the new options into it
	    s = $.logoMods.mergeObjects( LC.settings , options );

	    
	    LC.init = function(){ 
		//
		// note: do not use inside the draw function*
		//
		// activate all the boids
		LC.activateBoids( s.clusters );
		//
		return LC;
	    } 
	    
	    
	    LC.activateBoids = function( clusters ){
		//
		var clusterAmount = clusters.length,
		boidPerCluster =  parseInt(  s.boidAmount / clusterAmount),
		boidRemainder = s.boidAmount % clusterAmount,
		boidIndex = 0;
		//
		//
		// Activate the boids in clusters( change the amount in the programSettings )
		for ( var clusterIndex=0; clusterIndex < clusterAmount; clusterIndex++ ){
		    //
		    // Activate the boids inside the clusters
		    for ( var index = 0; index < boidPerCluster; index++ ){
			//
			// @boid 
			s.boids[ boidIndex ] = 
			    $.logoMods.Boids( p , { 
				    strokeW : s.strokeW,
				    color : clusters[clusterIndex].color,
				    startPos : clusters[clusterIndex].startPos,
				    canvasW : WIDTH,
				    canvasH : HEIGHT,
				});
			//
			// keep count of the total iterations for the 
			// boids array index
			boidIndex = boidIndex + 1;
			//
		    };
		};
		//
		// define the true boid amount after the cluster seperation
		// rounds down when the boid amount number is not even
		s.boidAmount = s.boids.length
		//
		//
		return LC;
	    };// activateBoids
	    	    
	    
	    
	    LC.render = function(){ 
		//
		// use inside the draw to render the boids
		//
		// changes the state on key pressed
		LC.changePositionOnKey();
		//
		// updates the background depending on the logo state
		LC.updateBG();
		//
		 // render all boids
		for ( var i=0; i< s.boidAmount; i++){ 
		    //
		    // chooses the render style depending on the state
		    s.boids[ i ].handleRender();
		    //
		};
		//
	    };
	    
	    
	    LC.updateBG = function(){ 
		//
		// updates the background depending on the logo state
		//
		// grab any of the boids state
		var state = s.boids[0].settings.state,
		//
		// use the state to find the color and opacity of the 
		// background that relates to that state
		color = s.boids[0].settings.background[ state ].color;
		//
		p.fill( color );
		p.rect( 0,0, WIDTH , HEIGHT );
		//
		return LC;
	    };
	    
	    
	    LC.changePositionOnKey = function(){ 
		//
		// listens for keys pressed
		// and changes the state position based on it 
		//
		var up = 'n', //38 for arrows,
		down = 'b', //40 for arrows,
		newState;
		//
		//
		p.keyPressed = function(){ 
		    //
		    var key = p.key.toString();
		    //
		    if(  key === up ){
			//
			// avoid going past the position maximum
			if( s.position < s.positionMax ){
			    //
			    // move a step up in position
			    s.position = s.position + 1;
			    //			
			    // Assing new state to all boids
			    LC.changeState();
			    //
			}
			//
		    } else if ( key === down ){ 
			//
			// avoid going under the position minimum
			if ( s.position > s.positionMin ){ 
			    //
			    // move a step down in position
			    s.position = s.position - 1;
			    //
			    // Assing new state to all boids
			    LC.changeState();
			}
		    };
		};
		//
	    };// changePositionOnKey
	    

	    LC.changeState = function(){ 
		//
		var newState;
		//
		// translate the position into a state
		newState = LC.translateToState( s.position );
		//
		// change the state for all the voids
		LC.assingNewState( newState );
		//
		return LC;
	    };

	      
	    LC.translateToState = function( position ){ 
		//
		// Take the current possition and change
		// it into the state assosiated with that position
		//
		var state;
		//
		switch( position ){ 
			
		case 1 :
		    //
		    state = 'idea';
		    //
		    break;
			
		case 2 :
		    //
		    state = 'identity';
		    //
		    break;
			
		case 3 : 
		    //
		    state = 'network';
		    //
		    break;

		case 4 : 
		    //
		    state = 'fastWire';
		    //
		    break;
		};
		//
		return state;
	    };



	    LC.assingNewState = function( newState ){ 
		//
		for ( var i=0; i<s.boidAmount; i++ ){ 
		    //
		    s.boids[i].settings.state = newState ;
		    //
		};
		//
		return LC;
	    };

	  
	  
	    return LC;
	    //
	}; // logoControl



	// Main Processing Code
	// @main 
	// --------------------------------------------------------------//
	
	//IMPORT IMAGE ( SUDOTOUCH MASK )
	var imgURL = "sudotouch_white_full1.png",
	sudotouch  = p.loadImage( imgURL, "png");
	
	// @colors
	//
	var light = p.color( 235, 220, 157 ),
	bright = p.color( 254, 205, 74 ),
	med = p.color( 236, 180, 71 ),
	dark = p.color( 190, 132, 24 ),
	sdark = p.color( 170,112, 4 );
	

	// cluster settings
	// @clusterSet || CS
	var clusterSettings = {
	    strokeW : .7,
	    boidAmount : 7000, // current performance limit 8,000
	    clusters :  [{ 
		    // 
		    // reads from left to write
		    // orange
		    color : sdark,
		    startPos : new p.PVector( WIDTH - WIDTH/1.2,
					      HEIGHT/2 )
		},{ // 
		    color : sdark,
		    startPos : new p.PVector( WIDTH - WIDTH/1.2,
					      HEIGHT/2 )
		},{ // 
		    color : dark,
		    startPos : new p.PVector( WIDTH - WIDTH/1.3,
					      HEIGHT/2 )
		},{ // 
		    color : med,
		    startPos : new p.PVector( WIDTH - WIDTH/1.3,
					      HEIGHT/2.5 )
		},{ // 
		    color : med,
		    startPos : new p.PVector( WIDTH - WIDTH/1.3,
					      HEIGHT/2 )
		},{ // 
		    color : bright,
		    startPos : new p.PVector( WIDTH - WIDTH/1.4,
					      HEIGHT - HEIGHT/2.5 )
		},{ // 
		    color : light,
		    startPos : new p.PVector( WIDTH - WIDTH/1.6, 
					      HEIGHT - HEIGHT/1.8)
		},{ // 
		    color : light,
		    startPos : new p.PVector( WIDTH - WIDTH/1.7,
					      HEIGHT - HEIGHT/2.1)
		},{ // 
		    color : light,
		    startPos : new p.PVector( WIDTH - WIDTH/2.2,
					      HEIGHT/2)
		},{ // 
		    color : bright,
		    startPos : new p.PVector( WIDTH - WIDTH/2.3,
					      HEIGHT/2)
		},{ // 
		    color : bright,
		    startPos : new p.PVector( WIDTH - WIDTH/2.8,
					      HEIGHT/2.5)
		},{ // 
		    color : med,
		    startPos : new p.PVector( WIDTH - WIDTH/3,
					      HEIGHT/2)
		},{ // 
		    color : med,
		    startPos : new p.PVector(  WIDTH - WIDTH/6,
					       HEIGHT/2)
		},{ // 
		    color : dark,
		    startPos : new p.PVector( WIDTH - WIDTH/7,
					      HEIGHT/3)
		},{ // 
		    color : dark,
		    startPos : new p.PVector( WIDTH - WIDTH/8,
					      HEIGHT/2)
		}],
	};
	//
	// Initiate the logo Controller
	var logoController = LogoController( clusterSettings );
	logoController.init();
	

	// CANVAS SETUP @setup
	p.setup = function() {
	    //
	    p.size( WIDTH, HEIGHT );
	    p.smooth();
	    p.background( 255 );
	    p.frameRate(30);
	    //
	};

	
	// CANVAS DRAW  @draw
	p.draw = function() {
	    //
	    // render the Logo
	    logoController.render(); 
	    //	    
	    // render the sudotouch image @img
	    p.image( sudotouch, 0, 0 , WIDTH, HEIGHT );
	};
	
    }//procSketch



    // ACTIVATE SKETCH
    var canvas = document.getElementById("canvas");
    //
    // attaching the sketchProc function to the canvas
    var p = new Processing( canvas, procSketch );
    // p.exit(); to detach it


})($);
