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
    $.ajax({
      context: this,
      url: '/get_tweets',
      type: 'POST',
      data: queryStr,
      success: function(resp) {
        this.collection = new TweetApp.Collections.Tweets(resp);

        // Might not need this...
        // this.removePageLoad();

        this.render();
      },
      error: function(resp) {
        alert("Dafuq!?!!?");
      }
    });
  },

  // removePageLoad: function(){
  //   debugger
  // },

  addPageLoad: function() {
    var $p = $("<p>");
    $p.css("text-align", "center");
    $p.html("Loading...");
    $(".tweet-index").html($p);
  },

  addTweetSubview: function(tweet) {
    var tweetView = new TweetApp.Views.TweetView({
      model: tweet
    });
    this.addSubview("div.tweet-index", tweetView);
    // Stuff TO-DO:
    // 1) add a ul to the template
    // 2) make a new TweetApp.Views.TweetView class
  },

  render: function() {
    var view = this;
    var content = this.template();
    this.$el.html(content);
    if (typeof this.collection != 'undefined') {
      this.collection.each(function(tweet) {
        view.addTweetSubview(tweet);
      });
    }
    $("div.tweet-index").append('<div class="clearfix"></div>');

    return this;
  }
});
