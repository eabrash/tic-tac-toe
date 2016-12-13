import Game from 'game';
import Player from 'game';
import Board from 'game';
import ScoreBoard from 'game';

describe("Game", function() {

  var testGame = new Game();
  var testPlayerOne = "Sassa";
  var testPlayerTwo = "Emily";

	describe('checkWinStatus', function(){

    it('should see if someone has won the game', function(){
      expect(testGame.checkWinStatus()).toEqual("in progress");
    });

  });

  describe('getCurrentPlayer', function(){

    xit('should return the current player', function(){
      expect(testGame.getCurrentPlayer()).toEqual("in progress");
    });

  });

  describe('setPlayers', function(){

    it('should accept arguments (currently strings, should later be Players)', function(){
      expect(testGame.setPlayers(testPlayerOne, testPlayerTwo)).toEqual(["Sassa", "Emily"]);
    });

  });

});

describe("Player", function() {

});
