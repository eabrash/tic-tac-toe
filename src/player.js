

// PLAYER METHODS

var Player = function() {
	this.name = '';
};

Player.prototype.getName = function() {
	return this.name;
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

//can't do until board is made
Player.prototype.chooseSquare = function() {

};

// shows whether a player is active and can choose a square or not

Player.prototype.setStatus = function(status) {
	this.status = status;
};

Player.prototype.getStatus = function() {
	return this.status;
};


export default Player;
