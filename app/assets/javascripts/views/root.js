window.TweetApp.Views.Root = Backbone.View.extend({
  template: JST["root"],

  events: {
    "submit form": "getTweets"
  },

  getTweets: function(event) {
    event.preventDefault();
    this.addPageLoad();

    var queryStr = $("form").serializeJSON();
    $.ajax({
      url: '/get_tweets',
      type: 'POST',
      data: queryStr,
      success: function() {
        alert("Success!");
      },
      error: function() {
        alert("Dafuq!?!!?");
      }
    });
  },

  addPageLoad: function() {
    var $p = $("<p>");
    $p.css("text-align", "center");
    $p.html("Loading...");
    $(".tweets-container").html($p);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
