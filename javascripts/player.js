var Player = function(id, name) {
  var self = this;

  self.id = id;
  self.name = name;
  self.score = 0;
  self.deadTiger = false;

  ga("send", "event", "Player", "New Player", "Name", self.name);


  return {
    getId: function() {
      return self.id;
    },

    getName: function() {
      return self.name;
    },

    getNickname: function() {
      return self.name.substring(0, 6);
    },

    getScore: function() {
      return self.score;
    },

    addScore: function(amount) {
      self.score += amount;
      if(self.score > 100) {
        self.score = 50;
      }
    },

    killTiger: function() {
      ga("send", "event", "Game", "Dead Tiger");
      self.deadTiger = true;
    },

    isDeadTiger: function() {
      return self.deadTiger;
    }
  }


}
