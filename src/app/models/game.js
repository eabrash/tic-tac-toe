import Backbone from 'backbone';

const Game = Backbone.Model.extend({
  // Why this needs to be a function (defaults is shared among all instances in a not-useful way and attributes such as board will
  // not be reset otherwise): http://stackoverflow.com/questions/19441176/backbone-new-view-reflects-old-model-data
  defaults: function() {
    return {players: ["Player1", "Player2"],
    board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    outcome: "in progress"};
  },
  initialize: function(options) {

  },
  pickStartingPlayer: function() {
    // Randomly choose which player will go first (X player) and which will go second (O player)
    var randomNumber = Math.floor(Math.random()*2);
    var myPlayers = this.get("players");

    if (randomNumber == 0){
      this.set("players", [myPlayers[1], myPlayers[0]]); // Reverse order of players
    }
  },
  currentPlayer: function() {
    var numMarks = 0;
    var myBoard = this.get("board");

    for (var row = 0; row < 3; row++){
      for (var col = 0; col < 3; col++){
        if (myBoard[row * 3 + col] != " "){
          numMarks++;
        }
      }
    }

    if (numMarks % 2 == 0){
      return this.get("players")[0];
    } else {
      return this.get("players")[1];
    }
  },
  setSquare: function(row, col){
    if (this.get("board")[row * 3 + col] != " " || row > 2 || col > 2 || row < 0 || col < 0){
      return false;   // Something is already in the selected spot, or the spot is not on the board
    } else {
      if (this.currentPlayer() == this.get("players")[0]){
        var myBoard = this.get("board");
        myBoard[row * 3 + col] = "X";
        this.set("board", myBoard);
      } else {
        var myBoard = this.get("board");
        myBoard[row * 3 + col] = "O";
        this.set("board", myBoard);
      }

      return true;
    }
  },
  hasBeenWon: function(){

    var myBoard = this.get("board");

    for (var row = 0; row < 3; row++){
      for (var col = 0; col < 3; col++){
        // Check for column wins
        if (row == 1){
          if (myBoard[row * 3 + col] != " " && myBoard[row * 3 + col] == myBoard[(row-1) * 3 + col] && myBoard[row * 3 + col] == myBoard[(row+1) * 3 + col]){
            this.set("outcome", myBoard[row * 3 + col]);
            return myBoard[row * 3 + col];
          }
        }
        // Check for row wins
        if (col == 1){
          if(myBoard[row * 3 + col] != " " && myBoard[row * 3 + col] == myBoard[row * 3 + col-1] && myBoard[row * 3 + col] == myBoard[row * 3 + col+1]){
            this.set("outcome", myBoard[row * 3 + col]);
            return myBoard[row * 3 + col];
          }
        }
        // Check for diagonal wins
        if (row == 1 && col == 1){
          if((myBoard[row * 3 + col] != " " && myBoard[row * 3 + col] == myBoard[(row-1) * 3 + col-1] && myBoard[row * 3 + col] == myBoard[(row+1) * 3 + col+1]) ||
             (myBoard[row * 3 + col] != " " && myBoard[row * 3 + col] == myBoard[(row+1) * 3 + col-1] && myBoard[row * 3 + col] == myBoard[(row-1) + col+1])){
               this.set("outcome", myBoard[row * 3 + col]);
               return myBoard[row * 3 + col];
          }
        }
      }
    }

    //If we did not return, no wins were found
    return false;
  },
  isADraw: function(){

    if (this.get("outcome") == "X" || this.get("outcome") == "O"){
      return false;
    }

    var numPlaysRemaining = 9;
    var myBoard = this.get("board");

    for (var row = 0; row < 3; row++){
      for (var col = 0; col < 3; col++){
        if (myBoard[row * 3 + col] != " "){
          numPlaysRemaining--;
        }
      }
    }

    if (numPlaysRemaining == 0){
      this.set("outcome", "draw");
    }

    return numPlaysRemaining == 0;  // For now, consider it a draw only when all spaces are full
  }

});

export default Game;
