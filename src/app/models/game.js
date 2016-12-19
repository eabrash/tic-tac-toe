import Backbone from 'backbone';

const Game = Backbone.Model.extend({

  initialize: function(options) {
    // Randomly choose which player will go first (X player) and which will go second (O player)
    var randomNumber = Math.floor(Math.random()*2);

    if (randomNumber == 0){
      this.set("player1", options.players[0]);  // X player
      this.set("player2", options.players[1]);  // O player
    } else {
      this.set("player1", options.players[1]);  // X player
      this.set("player2", options.players[0]); // O player
    }

    this.set("board", [[null, null, null],
                       [null, null, null],
                       [null, null, null]]);

    this.set("status", "in progress");
    this.set("currentPlayer", this.get("player1"));
  },
  toggleCurrentPlayer: function() {
    if (this.get("currentPlayer") == this.get("player1")){
      this.set("currentPlayer", this.get("player2"));
    } else {
      this.set("currentPlayer", this.get("player1"));
    }
  },
  setSquare: function(row, col){
    if (this.get("board")[row][col] != null){
      return false;   // Something is already in the selected spot
    } else {
      if (this.get("currentPlayer") == this.get("player1")){
        var myBoard = this.get("board");
        myBoard[row][col] = "X";
        this.set("board", myBoard);
      } else {
        var myBoard = this.get("board");
        myBoard[row][col] = "O";
        this.set("board", myBoard);
      }
      // console.log("Just set a board square");
      this.toggleCurrentPlayer();
      return true;
    }
  },
  hasBeenWon: function(){

    var myBoard = this.get("board");

    for (var row = 0; row < 3; row++){
      for (var col = 0; col < 3; col++){
        // Check for column wins
        if (row == 1){
          if (myBoard[row][col] != null && myBoard[row][col] == myBoard[row-1][col] && myBoard[row][col] == myBoard[row+1][col]){
            return myBoard[row][col];
          }
        }
        // Check for row wins
        if (col == 1){
          if(myBoard[row][col] != null && myBoard[row][col] == myBoard[row][col-1] && myBoard[row][col] == myBoard[row][col+1]){
            return myBoard[row][col];
          }
        }
        // Check for diagonal wins
        if (row == 1 && col == 1){
          if((myBoard[row][col] != null && myBoard[row][col] == myBoard[row-1][col-1] && myBoard[row][col] == myBoard[row+1][col+1]) ||
             (myBoard[row][col] != null && myBoard[row][col] == myBoard[row+1][col-1] && myBoard[row][col] == myBoard[row-1][col+1])){
               return myBoard[row][col];
          }
        }
      }
    }

    //If we did not return, no wins were found
    return false;
  },
  isADraw: function(){
    var numPlaysRemaining = 9;
    var myBoard = this.get("board");

    for (var row = 0; row < 3; row++){
      for (var col = 0; col < 3; col++){
        if (myBoard[row][col] != null){
          numPlaysRemaining--;
        }
      }
    }

    // if (numPlaysRemaining % 2 == 0){
    //   var remainingX = Math.floor(numPlaysRemaining/2);
    //   var remainingO = Math.floor(numPlaysRemaining/2);
    // } else {
    //   var remainingX = Math.floor(numPlaysRemaining/2) + 1;
    //   var remainingO = Math.floor(numPlaysRemaining/2);
    // }

    return numPlaysRemaining == 0;  // For now, consider it a draw only when all spaces are full
  }

});

export default Game;
