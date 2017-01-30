/* jslint node: true */
/* global describe, it, expect */

"use strict";

var app = require('../app.js');


describe("The arcade game", function() {
    // Player
    describe("player", function() {

	var startHorz = 420;
	var startVert = 200;
	var waterVert = 100;

	var player1 = new Player(startVert,startHorz);	
	
	it ("has a player object", function() {
	    expect(player1).toBeDefined();
	    var player2 = new Player();	   
	    expect(player2).toBeDefined();
	});
	
	it ("loads the appriopriate player sprite", function(){
	    expect(player1.sprite).toEqual("img/char-boy.png");
	});
	
	it ("sets the Players initial location", function(){
	    expect(player1._x).toEqual(startVert);
	    expect(player1._y).toEqual(startHorz);	    
	});
	
	it ("sets the Player's speed", function () {
	    player1.setSpeed(10);
	    expect(player1._speed).toEqual(10);	    
	});	
	it ("allows the player to move left, right, up and down", function() {
	    player1.setLocation(0,-1); // move left
	    expect(player1.getLocation()).toEqual([0,-1]);
	    player1.setLocation(0,1); // move right
	    expect(player1.getLocation()).toEqual([0,1]);	    
	    player1.setLocation(1,0); // move down
	    expect(player1.getLocation()).toEqual([1,0]);	    
	    player1.setLocation(-1,0); // move up
	    expect(player1.getLocation()).toEqual([-1,0]);
	    // Could I use a for/loop to loop over a range of values? Any benefit?
	});	
	it ("can reach the water", function(){
	    player1.setLocation(waterVert,0);
	    expect(player1.getLocation()).toEqual([waterVert,0]);
	});	
	it ("cannot move off the screen", function(){
	    player1.setLocation(4000,4000); //
	    expect(player1.getLocation()).toEqual([410,420]);
	});	
	it ("updates the player location", function (){
	    expect(player1.update()).toBeDefined;
	});
	
	// Additional white box tests required with abnormal conditions, function inputs, etc?
	
    });
    
    // Enemies
    describe("has enemies", function() {
	xit ("has multiple enemy objects", function() {expect(enemy).toExist()});
	xit ("loads appriopriate enemy sprite", function () {expect(0).toBeTruthy()});
	xit ("sets the Enemy's initial location", function () {expect(0).toBeTruthy()});
	xit ("sets the Enemy's initial speed", function () {expect(0).toBeTruthy()});
	xit ("Updates the Enemy location", function () {expect(0).toBeTruthy()});
	xit ("The enemies move in varying speeds", function() {expect(0).toBeTruthy()});    
	xit ("the enemies can only move along the paved block portion of the scene", function() {expect(0).toBeTruthy()});
	// Additional white box tests required with abnormal conditions, function inputs, etc  
    });

    // collisions
    describe("has collisions", function() {	
	xit("Once a the player collides with an enemy, the game is reset", function () {expect(0).toBeTruthy()});
	xit("Handles collision between Player and enemy", function () {expect(0).toBeTruthy()});
	xit ("and the player moves back to the start square.", function() {expect(0).toBeTruthy()});
	xit("and it can be reset to 0 when collision occurs", function () {expect(0).toBeTruthy()});
	// Additional white box tests required with abnormal conditions, function inputs, etc  
    });

    // Scoring
    describe("has scoring", function() {
	xit ("the score can increase each time the player reaches the water", function () {expect(0).toBeTruthy()});
	xit ("game is won when the player reaches the water", function() {expect(0).toBeTruthy()});// Additional white box tests required with abnormal conditions, function inputs, etc  
    });
});

