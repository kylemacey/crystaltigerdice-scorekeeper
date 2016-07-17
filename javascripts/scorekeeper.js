$(function() {
  var game;

  $("form[name=playerEntryForm]").on("submit", function(e) {
    e.preventDefault();

    var formData = $(this).serializeArray();
    var players = [];

    $.each(formData, function(i, item) {
      if(item.value) {
        players.push(new Player(i, item.value));
      }
    });

    game = new Game(players);
    game.playTurn();
    updateScoreboard();
    showScreen("scoreEntry");
  });

  $("form[name=scoreEntryForm]").on("submit", function(e) {
    e.preventDefault();

    game.record(
      $("form[name=scoreEntryForm] select[name=crystal]").val(),
      tigerScore(),
      $("form[name=scoreEntryForm] select[name=dice]").val()
    );

    checkGameOver();

    game.incrementTurn();
    game.playTurn();
    updateScoreboard();
  });

  var updateScoreboard = function() {
    var players = game.getPlayers();
    for(var i=0;i<6;i++) {
      if(players[i]) {
        $("#scorePlayer" + i + " .player-nick").text(players[i].getNickname());
        $("#scorePlayer" + i + " .score-numeric").text(players[i].getScore());
        if(players[i].isDeadTiger()) {
          $("#scorePlayer" + i).addClass("dead-tiger");
        } else {
          $("#scorePlayer" + i).removeClass("dead-tiger");
        }
      } else {
        $("#scorePlayer" + i + " .player-nick").text("");
        $("#scorePlayer" + i + " .score-numeric").text("");
      }
    }

    $("form[name=scoreEntryForm] select[name=crystal]").val(1)
    $("form[name=scoreEntryForm] select[name=tiger]").val(2)
    $("form[name=scoreEntryForm] select[name=dice]").val(1)

    if(game.getCurrentPlayer().isDeadTiger()) {
      $("form[name=scoreEntryForm] select[name=tiger]").val(-1)
      $("form[name=scoreEntryForm] select[name=tiger]").attr("disabled", "disabled");
      $("#deadTiger").show();
    } else {
      $("form[name=scoreEntryForm] select[name=tiger]").removeAttr("disabled");
      $("#deadTiger").hide();
    }
  }

  var tigerScore = function() {
    if(game.getCurrentPlayer().isDeadTiger()) {
      return "0"
    } else {
      return $("form[name=scoreEntryForm] select[name=tiger]").val()
    }
  }

  var showScreen = function(screen_id) {
    $(".screen.visible").removeClass("visible");
    $("#" + screen_id).addClass("visible");
  }

  var checkGameOver = function() {
    var winner;

    if (game.allDeadTigers()) {
      showScreen("allDeadTigers");
    }

    if (winner = game.winnerFound()) {
      $("#winnerName").text(winner.getName());
      showScreen("winner");
    }
  }

  showScreen("playerEntry");
})
