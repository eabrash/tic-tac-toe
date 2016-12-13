
// //Board

var Board = function() {

	this.board = [[null, null, null], 
								[null, null, null], 
								[null, null, null]];
};

Board.prototype.setMarkAtPosition = function(row, column, mark) {
	if (row > 2 || row < 0 || column > 2 || column < 0 || this.board[row][column] != null ) {
		throw "Try Again!";
	} else {
		this.board[row][column] = mark;
	};
};

Board.prototype.getMarkAtPosition = function(row, column) {
	return this.board[0][0]
};

export default Board;
