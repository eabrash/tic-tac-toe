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
      this.render();
    }
  },
  render: function(){
    if (this.model.hasBeenWon() == false && this.model.isADraw() == false) {
      if (this.model.get("currentPlayer") == this.model.get("player1")) {
        var symbol = "X";
      } else {
        var symbol = "O";
      }
      this.$("#player-prompt").html(this.model.get("currentPlayer") + ", make your move! (" +  symbol + ")");
    } else if (this.model.hasBeenWon() != false) {
      if (this.model.hasBeenWon() == 'X') {
        this.$("#player-prompt").html(this.model.get("player1") + " has won! Great game!");
      } else {
        this.$("#player-prompt").html(this.model.get("player2") + " has won! Great game!");
      }
      console.log("HERE1");
      this.trigger('game-over', this.model);
    } else if (this.model.isADraw()) {
      console.log("HERE2");
      this.$("#player-prompt").html("It's a draw! Great game, both of you!");
      this.trigger('game-over', this.model);
    }

    for(var square = 0; square < 9; square++){
      // console.log(this.$("#" + square.toString()));
      this.$("#" + square.toString() + " > h3").html(this.model.get("board")[Math.floor(square/3)][square%3]);
    }
    //
    // <tr>
    //   <td><h3></h3></td>
    //   <td><h3></h3></td>
    //   <td><h3></h3></td>
    // </tr>
    // <tr>
    //   <td><h3></h3></td>
    //   <td><h3></h3></td>
    //   <td><h3></h3></td>
    // </tr>
    // <tr>
    //   <td><h3></h3></td>
    //   <td><h3></h3></td>
    //   <td><h3></h3></td>
    // </tr>
    // this.$el.removeClass("hidden");
  }

});

export default GameView;
