import Backbone from 'backbone';
import Game from 'app/models/game'

const GamesList = Backbone.Collection.extend({
  model: Game
});

export default GamesList;
