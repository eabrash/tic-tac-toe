import Backbone from 'backbone';
import Game from 'app/models/game';

const GameView = Backbone.View.extend({

  initialize: function(options) {

  },

  events: {
    'click td': 'clickTile'
  },

  clickTile: function(e){
    console.log("Tile clicked");
    console.log(e.target);
    // this.model.setSquare();
  },
  render: function(){
    this.$("#player-prompt").html(this.model.get("currentPlayer") + ", make your move!");
    for(var square = 0; square < 9; square++){
      this.$("#" + square.toString()).innerHTML(this.model.get("board")[Math.floor(square/3)][square%3]);
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
