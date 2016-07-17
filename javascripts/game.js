var Game = function(players) {
  var self = this;

  self.players = players;
  self.gameOver = false;
  self.playerTurn = 0;

  ga("send", "event", "Game", "Started");

  var determineCurrentPlayer = function() {
    for(var i=0, player=null; i<self.players.length; i++) {
      if (self.players[i].getId() == self.playerTurn) {
        player = self.players[i];
        break;
      }
    }

    return player;
  }

  var updatePlayerInfo = function() {
    $("#playerDisplay .player-name").text(self.currentPlayer.getName());
    $("#playerDisplay .score-numeric").text(self.currentPlayer.getScore());
  }

  return {
    playTurn: function() {
      self.currentPlayer = determineCurrentPlayer();
      updatePlayerInfo();
    },

    record: function(crystal, tiger, dice) {
      // Dead tiger
      if (tiger == -1) {
        self.currentPlayer.killTiger();
        tiger = 0;
      }

      ga("send", "event", "Game", "Score", "Crystal", crystal);
      ga("send", "event", "Game", "Score", "Tiger", tiger);
      ga("send", "event", "Game", "Score", "Dice", dice);

      var calcScore = parseInt(crystal) + parseInt(tiger) + parseInt(dice);

      self.currentPlayer.addScore(calcScore);

      console.log("Gave",calcScore,"points to",self.currentPlayer.getName(),"for a total score of",self.currentPlayer.getScore())

    },

    incrementTurn: function() {
      ga("send", "event", "Game", "New Turn");
      self.playerTurn = (self.playerTurn + 1) % (self.players.length)
    },

    getPlayers: function() {
      return self.players;
    },

    getCurrentPlayer: function() {
      return self.currentPlayer;
    },

    winnerFound: function() {
      ga("send", "event", "Game", "Complete", "Type", "Winner");
      for(var i=0, player=null; i<self.players.length; i++) {
        if (self.players[i].getScore() == 100) {
          player = self.players[i];
          break;
        }
      }

      return player;
    },

    allDeadTigers: function() {
      ga("send", "event", "Game", "Complete", "Type", "All Dead Tigers");
      for(var i=0, allDead=true; i<self.players.length; i++) {
        if (!self.players[i].isDeadTiger()) {
          allDead = false;
          break;
        }
      }

      return allDead;
    }
  };
}
