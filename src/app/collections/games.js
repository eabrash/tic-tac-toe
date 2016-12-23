import Backbone from 'backbone';
import Game from 'app/models/game'

const GamesList = Backbone.Collection.extend({
  model: Game,
  url: 'http://localhost:3000/api/v1/games',
  upToTopN: function(n){
    var playersAndTheirWins = {}

    // If one player wins, they get +1 point, and the losing player gets -1 point.
    // If two players tie, they both get 0 points (nothing happens).
    // This section of code creates a big hashtable where each player's name is a key and
    // their score (computed from all their games) is the corresponding value.

    this.each(function(model){
      if (model.get("outcome") == "X"){
        if (playersAndTheirWins[model.get("players")[0]] == undefined){
          playersAndTheirWins[model.get("players")[0]] = 1;
        } else {
          playersAndTheirWins[model.get("players")[0]] += 1;
        }
        if (playersAndTheirWins[model.get("players")[1]] == undefined){
          playersAndTheirWins[model.get("players")[1]] = -1;
        } else {
          playersAndTheirWins[model.get("players")[1]] -= 1;
        }
      } else if (model.get("outcome") == "O") {
        if (playersAndTheirWins[model.get("players")[1]] == undefined){
          playersAndTheirWins[model.get("players")[1]] = 1;
        } else {
          playersAndTheirWins[model.get("players")[1]] += 1;
        }
        if (playersAndTheirWins[model.get("players")[0]] == undefined){
          playersAndTheirWins[model.get("players")[0]] = -1;
        } else {
          playersAndTheirWins[model.get("players")[0]] -= 1;
        }
      } else if (model.get("outcome") == "draw") {
        if (playersAndTheirWins[model.get("players")[1]] == undefined){
          playersAndTheirWins[model.get("players")[1]] = 0;
        }
        if (playersAndTheirWins[model.get("players")[0]] == undefined){
          playersAndTheirWins[model.get("players")[0]] = 0;
        }
      }
    });

    // Next, we take the hashtable and convert it into an array of small objects, each of which
    // stores a name and a score. This conversion facilitates sorting of the players by score.

    var arrayOfScoreObjects = [];

    // Documentation of getOwnPropertyNames:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames

    for (var i = 0; i < Object.getOwnPropertyNames(playersAndTheirWins).length; i++){
      var miniObject = {};
      console.log(Object.getOwnPropertyNames(playersAndTheirWins)[i]);
      miniObject["name"] = Object.getOwnPropertyNames(playersAndTheirWins)[i];
      miniObject["score"] = playersAndTheirWins[Object.getOwnPropertyNames(playersAndTheirWins)[i]];
      arrayOfScoreObjects.push(miniObject);
    }

    // Sort the players by score in descending order
    // Sort based on: http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects

    var sorted = arrayOfScoreObjects.sort(function(a, b) {
      return parseFloat(b.score) - parseFloat(a.score);
    })

    var max = Math.min(n, sorted.length);

    console.log("Sorted, sliced array of objects:");
    console.log(sorted.slice(0, max));

    return sorted.slice(0, max);

  }
});

export default GamesList;
