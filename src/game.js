
var Game = function() {
	this.winStatus = "in progress";
	// this.board = new Board;
};

Game.prototype.checkWinStatus = function() {
	//will involve logic and Board and choosing Squares etc etc
	return this.winStatus;
};

Game.prototype.getCurrentPlayer = function() {
	return this.currentPlayer;
};

Game.prototype.setCurrentPlayer = function( player ) {
	if (player == "") {
		throw 42
	} else {
		this.currentPlayer = player;
	};

};

Game.prototype.setPlayers = function(player1, player2) {
	this.player1 = player1;
	this.player2 = player2;
	//player1 starts the game
	this.setCurrentPlayer(player1);
	return [this.player1, this.player2];
};


var Player = function() {
};

Player.prototype.namePlayer = function(name) {
	this.name = name;
};

Player.prototype.setMark = function( mark ) {
	this.mark = mark;
};

Player.prototype.getMark = function() {
	return this.mark;
};

Player.prototype.chooseSquare = function() {

};

Player.prototype.setStatus = function(status) {
	this.status = status;
};

Player.prototype.getStatus = function() {
	return this.status;
};

//Board

var Board = function() {

};

//ScoreBoard

var ScoreBoard = function() {

};

module.exports = Game, Player, Board, ScoreBoard;
