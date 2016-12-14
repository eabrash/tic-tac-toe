

// PLAYER METHODS

var Player = function() {
	this.name = '';
	this.mark = '';
	this.status = 'inactive';
	this.row1 = 0;
	this.row2 = 0;
	this.row3 = 0;
	this.col1 = 0;
	this.col2 = 0;
	this.col3 = 0;
	this.diagonalL2R = 0;
	this.diagonalR2L = 0;
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
Player.prototype.chooseSquare = function(row, col) {
	this.currentGame.board.setMarkAtPosition(row, col, this.mark);
	var points = this.getPoints( row, col );

	if (row == 0) {
		this.row0 += points;
	} else if (row == 1) {
		this.row1 += points;
	} else if (row == 2) {
		this.row2 += points;
	};

	if (col == 0 ) {
		this.col0 += points;
	} else if (col == 1 ) {
		this.col1 += points;
	} else if (col == 2) {
		this.col2 += points;
	};

	if ((row == 0 && col == 0 ) || (row == 1 && col == 1 ) || (row == 2 && col == 2 )) {
		this.diagonalL2R += points;
	};

	if ((row == 0 && col == 2 ) || (row == 1 && col == 2 ) || (row == 2 && col == 0 )) {
		this.diagonalR2L += points;
	};
}; //chooseSquare

Player.prototype.checkPoints = function() {
	if (this.row0 == 15 || this.row1 == 15 || this.row2 == 15 || this.col0 == 15 || this.col1 == 15 || this.col2 == 15 || this.diagonalR2L == 15 || this.diagonalL2R == 15) {
		return true;
	};
	return false;
}

Player.prototype.getPoints = function( row, col ) {
	var points = 0

	if (row == 0 && col == 0) {
		points = 8;
	} else if (row == 0 && col == 1 ) {
		points = 1;
	} else if (row == 0 && col == 2 ) {
		points = 6;
	} else if (row == 1 && col == 0 ) {
		points = 3;
	} else if (row == 1 && col == 1 ) {
		points = 5;
	} else if (row == 1 && col == 2 ) {
		points = 7;
	} else if (row == 2 && col == 0 ) {
		points = 4;
	} else if (row == 2 && col == 1 ) {
		points = 9;
	} else if (row == 2 && col == 2 ) {
		points = 2;
	};
	return points;
}



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
