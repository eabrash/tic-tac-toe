import Backbone from 'backbone';
import Game from 'app/models/game';

const GameView = Backbone.View.extend({

  initialize: function(options) {

  },

  events: {
    'click td': 'clickTile'
  },

  clickTile: function(e){
    // console.log("Tile clicked");
    if (this.model.hasBeenWon() == false && this.model.isADraw() == false){
      var square = e.currentTarget.id;
      // console.log(e.currentTarget.id + ", row: " + Math.floor(square/3) + ", column: " + square%3);
      this.model.setSquare(Math.floor(square/3),square%3);
      if (this.model.get("outcome") == "in progress"){
        this.model.isADraw();
        this.model.hasBeenWon();
        if (this.model.get("outcome") != "in progress"){
          this.trigger('game-over', this.model);
        }
      }
      this.render();
    }
  },
  render: function(){
    if (this.model.get("outcome") == "in progress") {
      if (this.model.currentPlayer() == this.model.get("players")[0]) {
        var symbol = "X";
      } else {
        var symbol = "O";
      }
      this.$("#player-prompt").html(this.model.currentPlayer() + ", make your move! (" +  symbol + ")");
    } else if (this.model.get("outcome") == "X" || this.model.get("outcome") == "O" ) {
      if (this.model.get("outcome") == 'X') {
        this.$("#player-prompt").html(this.model.get("players")[0] + " has won! Great game!");
      } else {
        this.$("#player-prompt").html(this.model.get("players")[1] + " has won! Great game!");
      }
    } else if (this.model.get("outcome")) {
      this.$("#player-prompt").html("It's a draw! Great game, both of you!");
    }

    for(var square = 0; square < 9; square++){
      // console.log(this.$("#" + square.toString()));
      this.$("#" + square.toString() + " > h3").html(this.model.get("board")[square]);
    }
  }

});

export default GameView;
