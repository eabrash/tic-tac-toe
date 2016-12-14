

// PLAYER METHODS

var Player = function() {
	this.name = '';
	this.mark = '';
	this.status = 'inactive';
};

Player.prototype.getName = function() {
	return this.name;
};

Player.prototype.setName = function(name) {
	if (name == "") {
		throw 42
	} else {
		this.name = name;
	};
};

Player.prototype.setMark = function( mark ) {
	if (mark != "X" && mark != "O" && mark != "x" && mark != "o") {
		throw 42
	} else {
		this.mark = mark.toUpperCase();
	};
};

Player.prototype.getMark = function() {
	return this.mark;
};

Player.prototype.setCurrentGame = function(game) {
	this.currentGame = game;
};


//can't do until board is made
Player.prototype.chooseSquare = function(row, column) {
	this.currentGame.board.setMarkAtPosition(row, column, this.mark);
	// console.log(this.game.board.board);
};

// shows whether a player is active and can choose a square or not

Player.prototype.setStatus = function(status) {
	if (status.toLowerCase() != "active" && status.toLowerCase() != "inactive") {
		throw 42
	} else {
	this.status = status.toLowerCase();
	}
};

Player.prototype.getStatus = function() {
	return this.status;
};


export default Player;
