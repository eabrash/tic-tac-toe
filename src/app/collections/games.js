import Backbone from 'backbone';
import Game from 'app/models/game'

const GamesList = Backbone.Collection.extend({
  model: Game,
  url: 'http://localhost:3000/api/v1/games'
});

export default GamesList;
