// *** NOT WORKING - approach would be to use Sinon to mock responses, but haven't
// figured out details. Making direct calls to the API does not work from here in
// the testing section. This seems slightly out of scope since we did not cover API
// testing with Backbone in class. Instructions to get Sinon working at:
// https://tinnedfruit.com/2011/03/03/testing-backbone-apps-with-jasmine-sinon.html

// import Game from 'app/models/game';
// import GamesList from 'app/collections/games';
// import $ from 'jquery';
//
// describe("GamesList", function() {
//
//   var gamesList = new GamesList();
//   gamesList.fetch();
//
// 	describe('initialize/defaults', function(){
//
//     it('the gamesList contains Game objects', function(){
//       gamesList.each(function(model){
//         expect(typeOf(model)).toEqual("Game");
//       });
//     });
//
//     it('the gamesList does not contain incomplete games', function(){
//       gamesList.each(function(model){
//         expect(model.outcome == "in progress").toBeFalsy();
//       });
//     });
//
//     // it('...', function(){
//     //
//     // });
//
//   });


});
