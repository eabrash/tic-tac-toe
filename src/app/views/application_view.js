import Backbone from 'backbone';
import Game from 'app/models/game';
import GameView from 'app/views/game_view';
import GamesList from 'app/collections/games'

const ApplicationView = Backbone.View.extend({
  initialize: function(options) {
    this.listOfGames = new GamesList();
    this.listOfGames.fetch();
    this.listenTo(this.listOfGames, 'update', this.render);
    this.render();
  },

  events: {
    'click .start-game-button': 'startGame'
  },

  startGame: function(e){
    console.log("New game requested");
    var player1 = this.$('.new-game-form input[name="player1"]').val();
    var player2 = this.$('.new-game-form input[name="player2"]').val();
    console.log("Players: " + player1 + ", " + player2);

    console.log("Making a new game...");
    if (player1 == "" || player2 == ""){
      this.$('#error').html("Please enter a name for both players!")
    } else {
      this.game = new Game({"players": [player1, player2]});
      this.game.pickStartingPlayer();
      this.$('#error').empty();
    }
    this.render();
    // this.$('.board').show();
  },

  // Hashtable info: http://www.mojavelinux.com/articles/javascript_hashes.html
  getTopScorers: function(){
    return this.listOfGames.upToTopN(10);
  },

  render: function() {
    if (this.game != undefined){
      this.gameView = new GameView({model: this.game, el: this.$("#board")});
      this.listenTo(this.gameView, 'game-over', this.addGameToList);
      this.$("#board").show();
      this.gameView.render();
    }
    this.$("#top-scorers").empty();
    var topScorers = this.getTopScorers();
    for (var i = 0; i < topScorers.length; i++){
      this.$("#top-scorers").append("<li>" + topScorers[i]["name"] + "</li>");
    }
  },

  addGameToList: function(game) {
    console.log("I WAS CALLED");
    // console.log("GAME IS: ");
    // console.log(game);
    this.listOfGames.create(game);
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
