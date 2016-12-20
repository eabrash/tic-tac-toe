import Backbone from 'backbone';
import Game from 'app/models/game';
import GameView from 'app/views/game_view';
import GamesList from 'app/collections/games'

const ApplicationView = Backbone.View.extend({
  initialize: function(options) {
    this.render();
    this.listOfGames = new GamesList();
    this.listenTo(this.listOfGames, 'update', this.render);
  },

  events: {
    'click .start-game-button': 'startGame'
  },

  startGame: function(e){
    console.log("New game requested");
    this.player1 = this.$('.new-game-form input[name="player1"]').val();
    this.player2 = this.$('.new-game-form input[name="player2"]').val();
    console.log("Players: " + this.player1 + ", " + this.player2);

    this.game = new Game({"players": [this.player1, this.player2]});
    this.render();
    // this.$('.board').show();
  },

  render: function() {
    if (this.game != undefined){
      this.gameView = new GameView({model: this.game, el: this.$("#board")});
      this.listenTo(this.gameView, 'game-over', this.addGameToList);
      this.$("#board").show();
      this.gameView.render();
      var that = this;
      that.$("#top-scorers").empty();
      this.listOfGames.each(function(model){
        that.$("#top-scorers").prepend("<li>" + model.attributes.player1 + " vs. " + model.attributes.player2 + "</li>");
      });
    }
  },

  addGameToList: function(game) {
    console.log("I WAS CALLED");
    // console.log("GAME IS: ");
    // console.log(game);
    this.listOfGames.add(game);
    console.log("listOfGames length: " + this.listOfGames.length);
    // console.log(this.listOfGames);
    // var counter = 0;
    // this.listOfGames.each(function(model){
    //   console.log(counter);
    //   console.log(model.attributes.player1);
    //   counter++;
    // });
  }

});

export default ApplicationView;
