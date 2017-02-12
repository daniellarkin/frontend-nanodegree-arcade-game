"use strict";
//---------------------------------------------------------------
/**
 *
 * @author Daniel Larkin
 * @version 1.0
 *
*/
//---------------------------------------------------------------

/**
 * @class canvasGameUnit
 * @constructor
 * @param {string} sprite string value of icon for canvasGameUnit
 * @param {number} x horizontal location of canvasGameUnit object
 * @param {number} y vertical location of canvasGameUnit object
 * @param {number} speed of the canvasGameUnit object
 *
 * NOTE:
 * 1. This is the object from which we will
 * 2. Accessors (getters & setters)
 *    Prime reason for accessors is encapsulation and making future changes
 *    for example additional functionality to be added later (e.g. validation)
 * 3. Private Member variables : Whilst studing I came across private member variables
 *     I decided to use the  _ convention to indicate private member variable
 *     I appreciate this is a crude approximation  and is cerftainly not recommended by Douglas Crockford, Javascript thought-leader
 *     [ref-url: http://javascript.crockford.com/code.html#names]
 */
//---------------------------------------------------------------

var CanvasGameUnit = function(sprite,x,y,speed,spriteWidth,spriteHeight, offsetX,offsetY, actualWidth, actualHeight, debugBB) {

    this._sprite          = sprite;
    this._x               = x;
    this._y               = y;
    this._speed           = speed;
    this._spriteWidth     = spriteWidth;
    this._spriteHeight    = spriteHeight;

    this.debugBoundingBox = debugBB;
    this.offsetX          = offsetX;
    this.offsetY          = offsetY;
    this.actualWidth      = actualWidth;
    this.actualHeight     = actualHeight;
    
    this.debugColour      = "blue";
    
    // Adding accessors to the base object, note the use of Object.defineproperty
    
    Object.defineProperty(this, 'sprite', {
	    get: function () {return this._sprite;},
	    set: function (value) {this._sprite=value;}
    });
    
    Object.defineProperty(this, 'spriteWidth', {
	    get: function () {return this._spriteWidth;},
	    set: function (value) {this._spriteWidth=value;}
    });

    Object.defineProperty(this, 'spriteHeight', {
	    get: function () {return this._spriteHeight;},
	    set: function (value) {this._spriteHeight=value;}
    });

    Object.defineProperty(this, 'x', {
	    get: function () {return this._x; },
	    set: function (value) {this._x=value; }
    });
    
    Object.defineProperty(this, 'y', {
	    get: function () {return this._y; },
	    set: function (value) {this._y=value; }
    });

    Object.defineProperty(this, 'speed', {
	    get: function () {return this._speed; },
	    set: function (value) {this._speed=value;}
    });

    Object.defineProperty(this, 'loc', {
	    get: function () {return [this._x,this._y]; },
	    set: function (value1,value2) {this._x=value1;this._y=value2 }
    });

};

//---------------------------------------------------------------
/**
 * @description Draw the canvasGameUnit on the screen
 * @param resources.get(this.sprite)
 * @param {number} x : horizontal location
 * @param {number} y : vertical location
 */

CanvasGameUnit.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.spriteWidth, this.spriteHeight);

    if (this.debugBoundingBox){
	    ctx.beginPath();
	    ctx.rect(this.x+this.offsetX*this.scale, this.y+this.offsetY*this.scale, this.actualWidth*this.scale, this.actualHeight*this.scale);
	    ctx.lineWidth = 2;
	    ctx.strokeStyle = this.debugColour;
	    ctx.stroke();
    }
};

//---------------------------------------------------------------
/*
 * @description Update the CanvasGameUnit object's position.
 * This method be inherited and "used" directly in the Player object. Whereas with the Enemy object this have a "local" version of this method. This is an opportuity to explore polymorphism
 * @return void
 */
CanvasGameUnit.prototype.update = function() {
    // Blank
}

//---------------------------------------------------------------
/**
 * @class Enemy
 * @constructor
 * @param {number} x horizontal location of enemy object
 * @param {number} y vertical location of enemy object
 */
function Enemy(sprite,x,y,speed,spriteWidth,spriteHeight,scale, offsetX,offsetY, actualWidth, actualHeight, debugBB) {

    // Call the supertype contructor method from CanvasGameUnit
    CanvasGameUnit.call(this, sprite, x ,y, speed,spriteWidth,spriteHeight, offsetX,offsetY, actualWidth, actualHeight, debugBB)
    this.scale = scale;
}

// Fix the prototype chain to allow correct inheritance operation
Enemy.prototype = Object.create(CanvasGameUnit.prototype);

/**
 * @description Update the enemy object's position. The enemy object should wrap around to the left hand side. When wraping from the right hand side to the left hand side, rather than set the x coord to 0, setting it to a negative value looks more visual pleasing. This has the visual effect of the enemy gradually moving onto the screen gradual from the left hand side rather than abructly reappearing.
 * @param {number} dt - a game engine time delta between ticks. The dt parameter
 * which will ensure the game runs at the same speed for all computers.
 * @return void
 */
Enemy.prototype.update = function(dt) {
    (this.x > 590) ? this.x = -100 : this.x += dt*this.speed; // ternary operator
};

//---------------------------------------------------------------
/**
 * @class Player
 * @constructor
 * @param x {number} horizontal coordinate of Player object; if not supplied defaults to 0
 * @param x {number} vertical coordinate of Player object; if not supplied defaults to 400
 */
//---------------------------------------------------------------
function Player(sprite, x,y,speed,spriteWidth,spriteHeight,offsetX,offsetY, actualWidth, actualHeight, debugBB){
    // Call the supertype contructor method from CanvasGameUnit
    CanvasGameUnit.call(this, sprite, x ,y, speed,spriteWidth,spriteHeight, offsetX,offsetY, actualWidth, actualHeight, debugBB);
    this.score = 0;
    this.zone;
    this.oldZone;
    this.highScore=0;
}

// Fix the prototype and correct the constructor
Player.prototype = Object.create(CanvasGameUnit.prototype);

//---------------------------------------------------------------
/**
 * HandleInput
 * @description This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 * @return void
 */
//---------------------------------------------------------------
Player.prototype.handleInput = function(direction) {

    if (direction == 'up' && this._y >= 0){
    	this._y -= 10;
    }
    else if (direction == 'left' && this._x > 0){
    	this._x -= 10;
    }
    else if (direction == 'right' && this._x <= 410){
    	this._x += 10;
    }
    else if (direction == 'down' && this._y <= 420){
    	this._y += 10;
    }
};


Player.prototype.render = function(direction) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.spriteWidth, this.spriteHeight);

    if (this.y < 10){
	    this.zone ="winZone";
    }
    else if (this.y >= 10 && this.y< 280){
	    this.zone ="battleZone";
    }
    else {
	    this.zone ="safeZone";
    }

    if (this.oldZone == "battleZone" && this.zone=="winZone"){
	    this.score+=10;
	    this.x = 200;
	    this.y =420;
    }

    this.oldZone = this.zone;
}

//---------------------------------------------------------------
/**
 * @class Gem
 * @constructor
 * @param x {number} horizontal coordinate of Player object; if not supplied defaults to 0
 * @param x {number} vertical coordinate of Player object; if not supplied defaults to 400
 */
//---------------------------------------------------------------
function Gem(sprite, x,y,speed,spriteWidth,spriteHeight) {
    // Call the supertype contructor method from CanvasGameUnit
    CanvasGameUnit.call(this, sprite, x, y, speed,spriteWidth,spriteHeight);
}

// Fix the prototype and correct the constructor
Gem.prototype = Object.create(CanvasGameUnit.prototype);



//-----------------------------------------------------------------------------------
// Now all the Game objects are instantiated
// Global variables

var player = new Player('img/char-boy.png',200,420,10,100,171,20,60,60,80,false); // Create a player object
var allEnemies = []; // Place all enemy objects in an array called allEnemies
var allGems = []; // Place all gems objects in an array called allGems
var en,gem = null;
var scale;


for (var i = 0; i < 1; i++) {
    scale      = (Math.random()*0.5)+0.5;
    en         = new Enemy('img/enemy-bug.png',0,0,0, 101*scale, 171*scale, scale,12*scale,80*scale,75*scale, 60*scale,false);;
    en.x       = Math.floor(Math.random() * 500); // randomize the initial X coordinate
    en.y       = (84 + (i%3)*85); // Place the bug on one of the three "brick lanes"
    en.speed   = Math.floor(Math.random() * 80) + 20;
    allEnemies.push(en);
}


// Randomly add Gems
// TBD: increase the number of gems as the game progresses
for (var i = 0; i < 3 ; i++) {
    var gemIcons   = ["img/Gem\ Orange.png",
		      "img/Gem\ Green.png",
		      "img/Gem\ Blue.png"];
    gem        =  new Gem(gemIcons[Math.floor(Math.random() * gemIcons.length)],0,0,0,101,171);
    gem.x      += Math.floor(Math.random() * 400); // randomize the initial X coordinate
    gem.y      += Math.floor(Math.random() * 400);  // randomize the initial Y coordinate
    gem.speed  = 0; // Gems don't move
    allGems.push(gem);
}

//---------------------------------------------------------------
/**
 * Key press event listner
 * @return void
 */
//---------------------------------------------------------------
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

