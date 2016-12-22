import Game from 'app/models/game';

describe("Game", function() {

  var game;
  beforeEach(function() {
    game = new Game();
  });

	describe('initialize', function(){

    it('a new game not given parameters should have the appropriate default values', function(){
      expect(game.get("players")).toEqual(["Player1", "Player2"]);
      expect(game.get("board")).toEqual([" ", " ", " ", " ", " ", " ", " ", " ", " "]);
      expect(game.get("outcome")).toEqual("in progress");
    });

    it('a new game given player names should contain the correct names', function(){
      game = new Game({"players": ["Satine", "Lottie"]});
      expect(game.get("players")).toEqual(["Satine", "Lottie"]);
    });

  });

  describe('pickStartingPlayer', function(){

    it('pickStartingPlayer sets players to an array of length 2', function(){
      game.pickStartingPlayer();
      expect(game.get("players")).toBeArray();
      expect(game.get("players").length).toEqual(2);
    });

    it('both players are still present after pickStartingPlayer is called', function(){
      game = new Game({"players": ["Satine", "Lottie"]});
      game.pickStartingPlayer();
      expect(game.get("players")).toContain("Satine");
      expect(game.get("players")).toContain("Lottie");
    });

  });

  describe('currentPlayer', function(){

    it('currentPlayer returns player 1 (first in players array) for a brand-new game', function(){
      game.pickStartingPlayer();
      expect(game.currentPlayer()).toEqual(game.get("players")[0]);
    });

    it('currentPlayer alternates as marks are placed on the board', function(){
      game.pickStartingPlayer();
      expect(game.currentPlayer()).toEqual(game.get("players")[0]);
      game.setSquare(0,0);
      expect(game.currentPlayer()).toEqual(game.get("players")[1]);
      game.setSquare(0,1);
      expect(game.currentPlayer()).toEqual(game.get("players")[0]);
      game.setSquare(0,2);
      expect(game.currentPlayer()).toEqual(game.get("players")[1]);
    });

  });

  describe('setSquare', function(){

    it('sets a square and returns true if the square is empty and valid', function(){
      var result = game.setSquare(0,0);
      expect(result).toEqual(true);
      expect(game.get("board")).toEqual(["X", " ", " ", " ", " ", " ", " ", " ", " "]);
      result = game.setSquare(2,2);
      expect(result).toEqual(true);
      expect(game.get("board")).toEqual(["X", " ", " ", " ", " ", " ", " ", " ", "O"]);
    });

    it('returns false if attempting to set a square that is already filled', function(){
      game.setSquare(0,0);
      var result = game.setSquare(0,0);
      expect(result).toEqual(false);
    });

    it('returns false if attempting to set a square that is not on the board', function(){
      var result = game.setSquare(-1,-1);
      expect(result).toEqual(false);
      var result = game.setSquare(0,4);
      expect(result).toEqual(false);
    });

  });

  describe('hasBeenWon', function(){

    // Will not call wins before all marks have been placed, even if a win is inevitable (e.g., only one space is left on the
    // board and X will win by filling that space)

    it('a blank game has not been won yet', function(){
      expect(game.hasBeenWon()).toEqual(false);
      expect(game.get("outcome")).toEqual("in progress");
    });

    it('a game with six plays in a non-winning configuration has not been won yet', function(){
      game.set("board", ["X", "O", " ", "O", "X", " ", "X", "O", " "]);
      expect(game.hasBeenWon()).toEqual(false);
      expect(game.get("outcome")).toEqual("in progress");
    });

    it('a game with three identical marks in a column has been won (by the mark type that is three-in-a-column)', function(){
      game.set("board", ["X", "O", " ", "X", "O", " ", "X", " ", " "]);
      expect(game.hasBeenWon()).toEqual("X");
      expect(game.get("outcome")).toEqual("X");
      game.set("board", ["X", "O", "X", " ", "O", " ", "X", "O", " "]);
      expect(game.hasBeenWon()).toEqual("O");
      expect(game.get("outcome")).toEqual("O");
      game.set("board", [" ", "O", "X", " ", "O", "X", " ", " ", "X"]);
      expect(game.hasBeenWon()).toEqual("X");
      expect(game.get("outcome")).toEqual("X");
    });

    it('a game with three identical marks in a row has been won (by the mark type that is three-in-a-row)', function(){
      game.set("board", ["X", "X", "X", "O", "O", " ", " ", " ", " "]);
      expect(game.hasBeenWon()).toEqual("X");
      expect(game.get("outcome")).toEqual("X");
      game.set("board", [" ", "X", "X", "O", "O", "O", "X", " ", " "]);
      expect(game.hasBeenWon()).toEqual("O");
      expect(game.get("outcome")).toEqual("O");
      game.set("board", [" ", " ", " ", "O", "O", " ", "X", "X", "X"]);
      expect(game.hasBeenWon()).toEqual("X");
      expect(game.get("outcome")).toEqual("X");
    });

    it('a game with three identical marks on the diagonal has been won (by the mark type that occupies the diagonal)', function(){
      game.set("board", ["X", "O", " ", "O", "X", " ", " ", " ", "X"]);
      expect(game.hasBeenWon()).toEqual("X");
      expect(game.get("outcome")).toEqual("X");
      game.set("board", ["X", " ", "O", " ", "O", "X", "O", "X", " "]);
      expect(game.hasBeenWon()).toEqual("O");
      expect(game.get("outcome")).toEqual("O");
    });

    it('a game with a full board in a non-winning configuration has not been won', function(){
      game.set("board", ["O", "O", "X", "X", "X", "O", "O", "X", "X"]);
      expect(game.hasBeenWon()).toEqual(false);
      expect(game.get("outcome")).toEqual("in progress");
    });

    it('a game with a full board in a winning configuration has been won', function(){
      game.set("board", ["X", "X", "X", "O", "X", "O", "X", "O", "O"]);
      expect(game.hasBeenWon()).toEqual("X");
      expect(game.get("outcome")).toEqual("X");
    })

  });

  describe('isADraw', function(){

    // Will not call a draw until the board is completely full, even if there is no way for either
    // player to win give the remaining turns and spaces

    it('a blank game is not a draw', function(){
      expect(game.isADraw()).toEqual(false);
      expect(game.get("outcome")).toEqual("in progress");
    });

    it('a game with eight plays in a non-winning configuration is not a draw', function(){
      game.set("board", ["X", "O", "X ",
                         "O", "X", "X",
                         " ", "O", "O"]);
      expect(game.hasBeenWon()).toEqual(false);
      expect(game.get("outcome")).toEqual("in progress");
    });

    it('a game with nine plays in a non-winning configuration is  a draw', function(){
      game.set("board", ["X", "O", "X", "X", "O", "O", "O", "X", "X"]);
      expect(game.isADraw()).toEqual(true);
      expect(game.get("outcome")).toEqual("draw");
    });

    it('a game that has been won is not a draw, even if the board is full)', function(){
      game.set("board", ["X", "X", "X", "O", "X", "O", "X", "O", "O"]);
      expect(game.hasBeenWon()).toEqual("X");
      expect(game.isADraw()).toEqual(false);
      expect(game.get("outcome")).toEqual("X");
    });

  });

});
