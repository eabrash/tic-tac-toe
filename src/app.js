import ApplicationView from 'app/views/application_view';

var gamesArray = [
  {
    "id": 1,
    "players": [
      "Satine",
      "Bob"
    ],
    "outcome": "X",
    "played_at": "2016-11-20T22:59:10Z"
  },
  {
    "id": 2,
    "players": [
      "Satine",
      "Bob"
    ],
    "outcome": "X",
    "played_at": "2016-11-20T22:59:10Z"
  },
  {
    "id": 3,
    "players": [
      "Satine",
      "Bob"
    ],
    "outcome": "O",
    "played_at": "2016-11-20T22:59:10Z"
  },
  {
    "id": 4,
    "players": [
      "Johnny",
      "Bob"
    ],
    "outcome": "X",
    "played_at": "2016-11-20T22:59:10Z"
  },
  {
    "id": 5,
    "players": [
      "Johnny",
      "Satine"
    ],
    "outcome": "X",
    "played_at": "2016-11-20T22:59:10Z"
  }
];

var appView = new ApplicationView({
  el: 'body',
  previousGames: gamesArray
});
