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
