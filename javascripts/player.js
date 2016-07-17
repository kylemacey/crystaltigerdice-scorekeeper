var Player = function(id, name) {
  var self = this;

  self.id = id;
  self.name = name;
  self.score = 0;
  self.deadTiger = false;


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
      self.deadTiger = true;
    },

    isDeadTiger: function() {
      return self.deadTiger;
    }
  }


}
