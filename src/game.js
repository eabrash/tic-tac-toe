module.exports = Game, Player, Board, ScoreBoard;


var Game = function() {
	this.winStatus = "";
	this.board = new Board;
};

Game.prototype.checkWinStatus = function() {

};

Game.prototype.trackTurns = function() {

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

Board

ScoreBoard


