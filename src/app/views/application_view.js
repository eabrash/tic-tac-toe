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
    'click .start-game-button': 'startGame',
    'click .tiny': 'deleteGame'
  },

  // Effects of deleting via collection: http://stackoverflow.com/questions/6280553/destroying-a-backbone-model-in-a-collection-in-one-step

  deleteGame: function(e){
    this.listOfGames.get(e.target.id).destroy();
  },

  startGame: function(e){
    var player1 = this.$('.new-game-form input[name="player1"]').val();
    var player2 = this.$('.new-game-form input[name="player2"]').val();

    if (player1 == "" || player2 == ""){
      this.$('#error').html("Please enter a name for both players!")
    } else {
      this.game = new Game({"players": [player1, player2]});
      this.game.pickStartingPlayer();
      this.$('#error').empty();
    }
    this.render();
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
    // Fill the top scorers scoreboard
    this.$("#top-scorers").empty();
    var topScorers = this.getTopScorers();
    for (var i = 0; i < topScorers.length; i++){
      this.$("#top-scorers").append("<li>" + topScorers[i]["name"] + "</li>");
    }
    // Fill the past games board
    this.$("#past-games").empty();
    this.listOfGames.each(function(model){
      this.$("#past-games").prepend("<li>" + (model.get("outcome") == "X" ? "<strong>":"") + model.get('players')[0] + (model.get("outcome") == "X" ? "</strong>":"") + " vs. " + (model.get("outcome") == "O" ? "<strong>":"") + model.get('players')[1] + (model.get("outcome") == "O" ? "</strong>":"") + "<div class='button tiny' id='" + model.get("id") + "'>Delete</button></li>");
    }, this);
  },

  // This is hitting the failure condition when the response is actually 201. I have no idea why!
  // Because of that, it was not displaying the game as being in the list even after it had been
  // added to the collection. (Well...it initially did display the game as being in the list beforeEach
  // I had the wait: true as an option in the create call. But then the game was added to the list
  // before it was added to the remote collection, with the result that it didn't have an id yet. Since
  // the id is what I use to identify the model for deletion, this resulted in an un-deletable model.
  // The solution was to add the wait: true, but then the item was not added to the displayed list.)
  // The workaround I've found is below - I have a failure callback that triggers a .fetch() that pulls
  // all the data for listOfGames freshly from the server. Since the create is working fine
  // on the server end, this results in the newly added item being shown.
  // Documentation (save is basically the same as create): http://backbonejs.org/#Model-save
  // Helpful StackOverflow: http://stackoverflow.com/questions/11890517/backbone-handle-server-response-on-create

  addGameToList: function(game) {
    var that = this;
    var addedGame =  this.listOfGames.create(game, { wait: true,
      success: function(model, response, options){
        // console.log("SUCCESS");
      },
      error: function(model, response, options){
        // console.log("FAILURE");
        // console.log(response);
        that.listOfGames.fetch();
        that.render();
      }
    });
  }

});

export default ApplicationView;
