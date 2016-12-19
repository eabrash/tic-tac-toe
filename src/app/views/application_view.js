import Backbone from 'backbone';
import Game from 'app/models/game';
import GameView from 'app/views/game_view';

const ApplicationView = Backbone.View.extend({
  initialize: function(options) {
    this.render();
    this.listOfGames = options.previousGames;
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
      var gameView = new GameView({model: this.game, el: this.$("#board")});
      this.$("#board").show();
      gameView.render();
    }
  }
});

export default ApplicationView;
