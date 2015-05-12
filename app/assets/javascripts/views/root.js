window.TweetApp.Views.Root = Backbone.View.extend({
  template: JST["root"],

  events: {
    "click button": "getTweets"
  },

  getTweets: function() {
    alert("Getting tweets...");
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
