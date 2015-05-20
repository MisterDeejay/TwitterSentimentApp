window.TweetApp.Views.Root = Backbone.CompositeView.extend({
  template: JST["root"],

  events: {
    "submit form": "getTweets"
  },

  getTweets: function(event) {
    event.preventDefault();
    this.addPageLoad();

    var queryStr = $("form").serializeJSON();
    var tweets = [];
    debugger
    $.ajax({
      context: this,
      url: '/get_tweets',
      type: 'POST',
      data: queryStr,
      success: function(resp) {
        this.collection = TweetApp.Collections.Tweets(resp);
        this.removePageLoad();

        this.render();
      },
      error: function(resp) {
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

  addTweetSubview: function(tweet) {
    var tweetView = new TweetApp.Views.TweetView({
      model: tweet
    });
    this.addSubview("ul.tweet-index", tweetView);
    // Stuff TO-DO:
    // 1) add a ul to the template
    // 2) make a new TweetApp.Views.TweetView class
  },

  render: function() {
    var view = this;
    if (typeof this.collection != 'undefined') {
      this.collection.each(function(tweet) {
        view.addTweetSubview(tweet);
      });
    }
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
