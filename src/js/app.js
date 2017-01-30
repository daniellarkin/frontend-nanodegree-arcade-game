//---------------------------------------------------------------
/**
 *
 * @author Daniel Larkin
 * @version 1.0
 * Much of the class structure has been provided by Udacity as a starting point for this project
 * 1. Accessors (getters & setters)
 *    Prime reason for accessors is encapsulation and making future changes
 *    for example additional functionality to be added later (e.g. validation)
 * 2. Private Member variables : Whilst studing I came across private member variables 
 *     I decided to use the  _ convention to indicate private member variable
 *     I appreciate this is a crude approximation  and is cerftainly not recommended by Douglas Crockford, Javascript thought-leader 
 *     [ref-url: http://javascript.crockford.com/code.html#names]
 */
//---------------------------------------------------------------
/**
 * @class Enemy 
 * @constructor
 * @param {number} x horizontal location of enemy object
 * @param {number} y vertical location of enemy object
 */
var Enemy = function(x,y) {
    this.sprite  = 'img/enemy-bug.png'; // enemy sprite which is drawn on the canvas

    this._x       = x || 0; 
    this._y       = y || 0;  
    this._speed   = Math.floor(Math.random() * 80) + 20; // Each enemy is initialised with a randomised speed
};

//---------------------------------------------------------------
/**
 * @description Set the enemy object speed
 * @param {number} speed - desired speed of the enemy object
 * @return void
 */
Enemy.prototype.setSpeed = function(speed) {
    this._speed  = speed;
}

//---------------------------------------------------------------
/**
 * Get the enemy object speed
 * @param {number} speed - desired speed of the enemy object
 * @return void
 */
Enemy.prototype.getSpeed = function() {
    return this._speed;
}

//---------------------------------------------------------------
/**
 * @description Set the enemy object sprite
 * @param {string} sprite - set the image sprite associated with this enemy object
 * @return void
 */
Enemy.prototype.setSprite = function(sprite) {
    this.sprite  = sprite;
}

//---------------------------------------------------------------
/**
 * @description Get the enemy object speed
 * @param {number} speed - desired speed of the enemy object
 * @return void
 */
Enemy.prototype.getSprite = function() {
    return this.sprite;
}

//---------------------------------------------------------------
/**
 * @description Update the enemy object's position. The enemy object should wrap around to the left hand side. When wraping from the right hand side to the left hand side, rather than set the x coord to 0, setting it to a negative value looks more visual pleasing. This has the visual effect of the enemy gradually moving onto the screen gradual from the left hand side rather than abructly reappearing.
 * @param {number} dt - a game engine time delta between ticks. The dt parameter
 * which will ensure the game runs at the same speed for all computers.
 * @return void
 */
Enemy.prototype.update = function(dt) {
    
    (this._x > 590) ? this._x = -100 : this._x += dt* this.getSpeed(); // ternary operator
    
};

//---------------------------------------------------------------
/**
 * @description Draw the enemy on the screen
 * @param resources.get(this.sprite)
 * @param {number} x : horizontal location
 * @param {number} y : vertical location
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this._x, this._y);
};

//---------------------------------------------------------------
/**
 * @class Player
 * @constructor
 * @param x {number} horizontal coordinate of Player object; if not supplied defaults to 0
 * @param x {number} vertical coordinate of Player object; if not supplied defaults to 400
 */
//---------------------------------------------------------------
Player = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'img/char-boy.png';
    this._x = x || 0;
    this._y = y || 400;
};

//---------------------------------------------------------------
/**
 * @description set the x,y coordinates of the player
 * @param {number} x - horizontal location
 * @param {number} y - vertical location
 * @returns void : no return value
 */
Player.prototype.setLocation = function(x,y) {
    this._x = x;
    this._y = y;
};

//---------------------------------------------------------------
/**
 * @description set the x,y coordinates of the player
 * @param {number} x - horizontal location
 * @param {number} y - vertical location
 * @returns {number} - Players current horizontal and vertical position
 */
Player.prototype.getLocation = function() {
    return [this._x, this._y];
};


//---------------------------------------------------------------
/**
 * @description Set the enemy object speed
 * @param {number} speed - desired speed of the enemy object
 * @return void
 */
Player.prototype.setSpeed = function(speed) {
    this._speed  = speed;
}


//---------------------------------------------------------------
/**
 * @description set the x,y coordinates of the player
 * @returns void : no return value
 */
Player.prototype.update = function() {
};


//---------------------------------------------------------------
/**
 * @description Draw the player on the screen
 * @returns void 
 */
//---------------------------------------------------------------
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this._x, this._y);
};

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


//-----------------------------------------------------------------------------------
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

// Create a player object
var player = new Player(200,420);
var allEnemies = [];
for (var i = 0; i < 10 ; i++) {
    en = new Enemy(0,0);
    en._x += Math.floor(Math.random() * 500); // randomize the initial X coordinate 
    en._y += (i%3)*83 + 60 // Place the bug on one of the three "brick lanes"
    allEnemies.push(en);
}

//---------------------------------------------------------------
/**
 * Key press event listner
 * @return void
 */
//---------------------------------------------------------------
//document.addEventListener('keydown', function(e) {
//    var allowedKeys = {
//        37: 'left',
//        38: 'up',
//        39: 'right',
//        40: 'down'
//    };
//    player.handleInput(allowedKeys[e.keyCode]); // interesting that there is an expectation that there is object
//                                                // called player - very tight coupling?
//});
//
