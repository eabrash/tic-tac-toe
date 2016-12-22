import Game from 'app/models/game';
import GamesList from 'app/collections/games';
import $ from 'jquery';

describe("GamesList", function() {

  var gamesList = new GamesList();
  gamesList.fetch();

	describe('initialize/defaults', function(){

    it('the gamesList contains Game objects', function(){
      gamesList.each(function(model){
        expect(typeOf(model)).toEqual("Game");
      });
    });

    it('the gamesList does not contain incomplete games', function(){
      gamesList.each(function(model){
        expect(model.outcome == "in progress").toBeFalsy();
      });
    });

    // it('...', function(){
    //
    // });

  });


});
