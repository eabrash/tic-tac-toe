
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
  if (row > 2 || row < 0 || column > 2 || column < 0) {
    throw "Spot Does Not Exist!";
  } else {
	   return this.board[row][column];
  }
};

Board.prototype.getStatus = function(){

  //Check each row for three in a row

  for (var row = 0; row < this.board.length; row++){
    var xCount = 0;
    var oCount = 0;
    for (var col = 0; col < this.board[row].length; col++){
      if (this.board[row][col] == "X"){
        xCount++;
      } else if (this.board[row][col] == "O"){
        oCount++;
      }
    };
    if (xCount == 3){
      return 'X';
    } else if (oCount == 3){
      return 'O';
    }
  };

  //Check each column for three in a row

  for (var col = 0; col < this.board[0].length; col++){
    var xCount = 0;
    var oCount = 0;
    for (var row = 0; row < this.board.length; row++){
      if (this.board[row][col] == "X"){
        xCount++;
      } else if (this.board[row][col] == "O"){
        oCount++;
      }
    };
    if (xCount == 3){
      return 'X';
    } else if (oCount == 3){
      return 'O';
    }
  };

  // Check one diagonal for three in a row

  var xCount = 0;
  var oCount = 0;

  for (var i = 0; i < 3; i++){
    if (this.board[i][i] == "X"){
      xCount++;
    } else if (this.board[i][i] == "O"){
      oCount++;
    }
  };

  if (xCount == 3){
    return 'X';
  } else if (oCount == 3){
    return 'O';
  }

  // Check other diagonal for three in a row

  var xCount = 0;
  var oCount = 0;

  for (var i = 2; i >= 0; i--){
    if (this.board[i][i] == "X"){
      xCount++;
    } else if (this.board[i][i] == "O"){
      oCount++;
    }
  };

  if (xCount == 3){
    return 'X';
  } else if (oCount == 3){
    return 'O';
  }

};


export default Board;
