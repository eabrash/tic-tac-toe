import Board from 'board';
import Player from 'player';

var Game = function() {
	this.winStatus = "in progress";
	this.board = new Board();
};

Game.prototype.checkWinStatus = function() {
	//will involve logic and Board and choosing Squares etc etc
	if (this.board.getStatus() == "X" || this.board.getStatus() =="O") {
		this.winStatus = this.board.getStatus(); 
		return this.winStatus + " " + "won!";
	} else if (this.board.playCounter == 9) {
		this.winStatus = "draw";
	};
	
	return this.winStatus;
}; // END checkWinStatus

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
	player1.setMark("X");
	player2.setMark("O");

	player1.setCurrentGame(this);
	player2.setCurrentGame(this);

	return [this.player1, this.player2];
};

Game.prototype.takeTurns = function(row, col) {
	this.currentPlayer.chooseSquare(row, col);

	if (this.currentPlayer == this.player1) {
		this.currentPlayer = this.player2; 
	} else if (this.currentPlayer == this.player2 ) {
		this.currentPlayer = this.player1;
	};
	
	if (this.board.playCounter >= 6) {
		console.log(this.checkWinStatus());

	};
	this.board.drawBoard();
}; //END togglePlayer


export default Game;

