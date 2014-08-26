// if the $ object does not exist make it                                     
if ( !window.$ ) {
    window.$ = {};
};
//
(function(){
    'use strict';
    //
    // create a module class if its not already present
    // needs an odd name to not clash with $ libraries
    if( !$.logoMods ){
        //
        $.logoMods = new Object();
        //
    };

    $.logoMods.IdentityAnimation = function( options ){
	//
	// Dependencies:

	//       Framework : Processing ( inside p variable )
	//       vars : canvas WIDTH and HEIGHT
	//       functions : mergeObject()
	//
	// define the object
	var boid = {
	    settings : {
		boidAmount : 1,
		strokeW : 0.5,
		color :  p.color( 0,0,0,255),
		directionLimit : 10,
		radiusLimit : 1,
		startPos : new p.PVector( p.random( 0,WIDTH),
					  p.random( 0,HEIGHT))
	    }
	},
	//
	// merge the options into the settings
	s = $.logoMods.mergeObjects( boid.settings , options );
	//
	var radius = 8;
	//
	s.pastLocation = new p.PVector( s.startPos.x ,
					s.startPos.y );
	//
	s.location =new p.PVector();
	//
	s.angle = new p.PVector ( p.random( p.TWO_PI ),
				  p.random( p.TWO_PI ) );
	//
	s.direction = new p.PVector( p.random( - s.directionLimit ,
					       s.directionLimit ) ,
				     p.random( - s.directionLimit ,
					       s.directionLimit  ) );
	//
	//
	//
	s.velocity = new p.PVector( p.random( -.02 , -.02 ) ,
				    p.random( -.02 , -.02 ));



	boid.render = function(){
	    //
	    if( p.frameCount%5 === 0 && radius > s.radiusLimit ){
		//
		radius = radius / 2;
	    };
	    //
	    if( p.frameCount%40 === 0 ){
		//
		radius = 8;
		//
	    };
	    //
	    // set the color
	    p.stroke( s.color );
	    p.strokeWeight( s.strokeW );
	    //
	    // set the new velocity
	    s.velocity.set( p.cos( s.angle.x ) * radius ,
			    p.sin( s.angle.y ) * radius );
	    //
	    // set the location by changing the past location
	    s.location.set( s.pastLocation.x + s.velocity.x,
			    s.pastLocation.y + s.velocity.y );
	    //
	    // draw the line
	    p.beginShape();
	    p.vertex( s.pastLocation.x, s.pastLocation.y );
	    p.vertex( s.location.x, s.location.y );
	    p.endShape();
	    //
	    //
	    // randomize the direction increment
	    s.direction.set( p.random( 0.01 , 0.1 ),
			     p.random( 0.01 , 0.1 ) );
	    //
	    // update the angles direction
	    s.angle.set ( s.angle.x + s.direction.x ,
			  s.angle.y + s.direction.y );
	    //
	    // save this old location
	    s.pastLocation.set( s.location.x ,
				s.location.y );
	    //

	    return boid;
	    //
	}; // render


	return boid;
	//
    };// boid object



})($);

/*
programSettings = {
    strokeW : .7,
    boidAmount : 8000, // current performance limit 5,000
    clusters :  [{ // dark left top
	    color : p.color(  33, 65, 112, 255 ),
	    startPos : new p.PVector( 0,
				      HEIGHT/4)
	},{ // dark left bot
	    color : p.color(  33, 65, 112, 255 ),
	    startPos : new p.PVector( 0,
				      HEIGHT - HEIGHT/4)
	},{ // dark right top
	    color : p.color(  33, 65, 112, 255 ),
	    startPos : new p.PVector( WIDTH,
				      HEIGHT/4)
	},{ // dark right bot
	    color : p.color(  33, 65, 112, 255 ),
	    startPos : new p.PVector( WIDTH,
				      HEIGHT - HEIGHT/4)
	},{ //light center left
	    color : p.color( 91, 161, 227, 200  ),
	    startPos : new p.PVector(  WIDTH/4 + WIDTH/8,
				       HEIGHT/4)
	}, { //light center right
	    color : p.color( 91, 161, 227, 200  ),
	    startPos : new p.PVector( WIDTH - WIDTH/4,
				      HEIGHT/4)
	},{ //light center right top
	    color : p.color( 91, 161, 227, 200  ),
	    startPos : new p.PVector(  WIDTH/4,
				       HEIGHT-HEIGHT/4)
	}, { //light center right bot
	    color : p.color( 91, 161, 227, 200  ),
	    startPos : new p.PVector( WIDTH - WIDTH/4,
				      HEIGHT - HEIGHT/4)
	}],
};
*/