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

	it('querying a new Player name should return an empty string', function() {
		var mockPlayer = new Player();
		expect (mockPlayer.getName()).toEqual("");
	});

});
