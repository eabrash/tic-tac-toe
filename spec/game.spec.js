import Game from 'game';
import Player from 'player';
import Board from 'board';
import ScoreBoard from 'scoreboard';

describe("Game", function() {

  var testGame = new Game();
  var testPlayerOne = "Sassa";
  var testPlayerTwo = "Emily";

	describe('checkWinStatus', function(){

    it('should see if someone has won the game', function(){
      expect(testGame.checkWinStatus()).toEqual("in progress");
    });

  });

  describe('setCurrentPlayer', function(){

    it('should set current player and return the current player (set to Emily)', function(){
    	testGame.setCurrentPlayer(testPlayerTwo);
      expect(testGame.getCurrentPlayer()).toEqual('Emily');
    });

    it('setting the current player as nil should throw an error', function(){
      expect( function() { testGame.setCurrentPlayer(""); } ).toThrow(42);
    });

  });

  describe('setPlayers', function(){

    it('should accept arguments (currently strings, should later be Players)', function(){
      expect(testGame.setPlayers(testPlayerOne, testPlayerTwo)).toEqual(["Sassa", "Emily"]);
    });

  });

});

describe("Player", function() {

  describe('getName', function() {

    it('querying a new Player name should return an empty string', function() {
      var mockPlayer = new Player();
      expect (mockPlayer.getName()).toEqual("");
    });

  });

  describe('setName', function() {

    it('after naming a player, getName should return their new name', function() {
      var mockPlayer = new Player();
      mockPlayer.setName("Harold");
      expect (mockPlayer.getName()).toEqual("Harold");
    });

    it('setting the player name as nil should throw an error', function(){
      var mockPlayer = new Player();
      expect( function() { mockPlayer.setName(""); } ).toThrow(42);
    });

  });

  describe('getMark', function() {

    it('querying a new Player mark should return an empty string', function() {
      var mockPlayer = new Player();
      expect (mockPlayer.getMark()).toEqual("");
    });

  });

  describe('setMark', function() {

    it('after setting mark for a player, getMark should return their new mark', function() {
      var mockPlayer = new Player();
      mockPlayer.setMark("X");
      expect (mockPlayer.getMark()).toEqual("X");
    });

    it('after setting mark for a player, it should be uppercased', function() {
      var mockPlayer = new Player();
      mockPlayer.setMark("x");
      expect (mockPlayer.getMark()).toEqual("X");
    });

    it('setting the player mark as anything other than X or O should throw an error', function(){
      var mockPlayer = new Player();
      expect( function() { mockPlayer.setMark("Q"); } ).toThrow(42);
    });

  });

  describe('getStatus', function() {

    it('querying a new Player status should return inactive by default', function() {
      var mockPlayer = new Player();
      expect (mockPlayer.getStatus()).toEqual("inactive");
    });

  });

  describe('setStatus', function() {

    it('after setting status for a player, getStatus should return their new mark', function() {
      var mockPlayer = new Player();
      mockPlayer.setStatus("active");
      expect (mockPlayer.getStatus()).toEqual("active");
    });

    it('after setting status for a player, it should be lowercased', function() {
      var mockPlayer = new Player();
      mockPlayer.setStatus("aCTiVe");
      expect (mockPlayer.getStatus()).toEqual("active");
    });

    it('setting the player status as anything other than active or inactive should throw an error', function(){
      var mockPlayer = new Player();
      expect( function() { mockPlayer.setStatus("hAppY!"); } ).toThrow(42);
    });

  });

});

// BOARD TESTS

describe('Board', function() {
	it('the Board should have a board attribute that is an array', function() {
		var mockBoard = new Board();
		expect ( Array.isArray(mockBoard.board) ).toEqual(true);
	});

	it('the Board should have a board attribute that is an array of arrays', function() {
		var mockBoard = new Board();
		expect ( Array.isArray(mockBoard.board[0]) ).toEqual(true);
	});

	it('the Board board outer array should have a length of 3', function() {
		var mockBoard = new Board();
		expect ( mockBoard.board.length ).toEqual(3);
	});

	it('the board attribute array of arrays start out as null', function() {
		var mockBoard = new Board();
		expect ( mockBoard.board[0][0] ).toEqual(null);
	});

	it('the Board board inner arrays each should have a length of 3', function() {
		var mockBoard = new Board();
		expect ( mockBoard.board[0].length ).toEqual(3);
	});

	describe('setMarkAtPosition', function() {
		it('setting a mark at a give spot should make it have the mark', function() {
			var mockBoard = new Board();
			mockBoard.setMarkAtPosition(0,0, 'X');
			expect ( mockBoard.board[0][0] ).toEqual("X");
		});

		it('setting a mark on space that already has a mark should tell you to try again', function(){
      var mockBoard = new Board();
			mockBoard.setMarkAtPosition(0,0, 'X');
			//syntax is setMarkAtPosition(row, column, mark)
      expect( function() { mockBoard.setMarkAtPosition(0,0, "O"); } ).toThrow("Try Again!");
    });

    it('going out of bounds should throw an error (row index too big)', function(){
      var mockBoard = new Board();
      expect( function() { mockBoard.setMarkAtPosition(3,0, 'X'); } ).toThrow("Try Again!");
    });

    it('going out of bounds should throw an error (row index too small)', function(){
      var mockBoard = new Board();
      expect( function() { mockBoard.setMarkAtPosition(-1,0, "O"); } ).toThrow("Try Again!");
    });

    it('going out of bounds should throw an error (column index too big)', function(){
      var mockBoard = new Board();
      expect( function() { mockBoard.setMarkAtPosition(0, 3, "O"); } ).toThrow("Try Again!");
    });

    it('going out of bounds should throw an error (column index too small)', function(){
      var mockBoard = new Board();
      expect( function() { mockBoard.setMarkAtPosition(0,-1, "O"); } ).toThrow("Try Again!");
    });

	}); //END DESCRIBE setMarkAtPosition

  describe('getMarkAtPosition', function() {
		it('get the mark found at a given position (position is valid)', function() {
			var mockBoard = new Board();
			mockBoard.setMarkAtPosition(0,0, 'X');
			expect ( mockBoard.getMarkAtPosition(0,0)).toEqual("X");
		});

    it('get the mark found at a given position (position is NOT valid)', function() {
      var mockBoard = new Board();
      mockBoard.setMarkAtPosition(0,0, 'X');
      expect( function() { mockBoard.getMarkAtPosition(0,-1); } ).toThrow("Spot Does Not Exist!");
    });
  });

  describe('getStatus', function() {
    it('indicates the winner if a player has won (3 marks in a row - diagonal L to R)', function() {
      var mockBoard = new Board();
      mockBoard.setMarkAtPosition(0,0, 'X');
      mockBoard.setMarkAtPosition(1,1, 'X');
      mockBoard.setMarkAtPosition(2,2, 'X');
      expect ( mockBoard.getStatus()).toEqual("X");
    });

    it('returns undefined if a player has not yet won', function() {
      var mockBoard = new Board();
      mockBoard.setMarkAtPosition(0,0, 'X');
      expect ( mockBoard.getStatus()).toEqual(undefined);
    });
  });

}); // END DESCRIBE BOARD
