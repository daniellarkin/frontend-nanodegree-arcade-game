/* jslint node: true */
/* global describe, it, expect */

"use strict";

var app = require('../app.js');

describe("The arcade game", function() {
    // Player
    describe("player", function() {
	it ("has a player object", function() {
	    var player = new app.Player();	   
	    expect(player).undefined()
	});
	it ("loads the appriopriate player sprite", function(){
	    var player1 = new Player();	   
	    expect((player1.sprite).toEqual('images/player.png'));
	});
	it ("sets the Players initial location", function(){
	    var player1 = new player();	   
	    expect((player1.position).toEqual(0));
	    player1.position = -1;
	    expect((player1.position).toEqual(-1));	    
	});
	it ("sets the Player's speed", function () {
	    var player1 = new player();
	    player1.speed = 10;
	    expect((player1.speed).toEqual(10));	    
	});
	it ("allows the player to move left, right, up and down", function() {
	    var player1 = new player();
	    player1.update(1,0); // up
	    expect((player1.position).toEqual(1,0));
	    player1.update(-1,0); // down
	    expect((player1.position).toEqual(0,0));	    
	    player1.update(0,1); // move right
	    expect((player1.position).toEqual(0,1));	    
	    player1.update(0,0); // move left
	    expect((player1.position).toEqual(0,0));	    
	});
	it ("can reach the water", function(){
	    var player1 = new player();
	    player1.update(400,0); // up
	    expect((player1.position).toEqual(400,0));
	});
	it ("cannot move off the screen", function(){
	    var player1 = new player();
	    player1.update(4000,0); // up
	    expect((player1.position).toEqual(500,0));
	});
	    it ("updates the player location", function (){
		var player1 = new player();
		player1.update(1,0); // up
		expect((player1.position).toEqual(1,0));
	    });
	it ("game is won when the player reaches the water", function() {expect(0).toBeTruthy()});
	// Additional white box tests required with abnormal conditions, function inputs, etc  
    });
    
    // Enemies
    describe("has enemies", function() {
	it ("has multiple enemy objects", function() {expect(enemy).toExist()});
	it ("loads appriopriate enemy sprite", function () {expect(0).toBeTruthy()});
	it ("sets the Enemy's initial location", function () {expect(0).toBeTruthy()});
	it ("sets the Enemy's initial speed", function () {expect(0).toBeTruthy()});
	it ("Updates the Enemy location", function () {expect(0).toBeTruthy()});
	it ("The enemies move in varying speeds", function() {expect(0).toBeTruthy()});    
	it ("the enemies can only move along the paved block portion of the scene", function() {expect(0).toBeTruthy()});
	// Additional white box tests required with abnormal conditions, function inputs, etc  
    });

    // collisions
    describe("has collisions", function() {	
	it("Once a the player collides with an enemy, the game is reset", function () {expect(0).toBeTruthy()});
	it("Handles collision between Player and enemy", function () {expect(0).toBeTruthy()});
	it ("and the player moves back to the start square.", function() {expect(0).toBeTruthy()});
	it("and it can be reset to 0 when collision occurs", function () {expect(0).toBeTruthy()});
	// Additional white box tests required with abnormal conditions, function inputs, etc  
    });

    // Scoring
    describe("has scoring", function() {
	it ("the score can increase each time the player reaches the water", function () {expect(0).toBeTruthy()});
	// Additional white box tests required with abnormal conditions, function inputs, etc  
    });
});

