window.TweetApp.Views.TweetView = Backbone.View.extend({
  template: JST['tweets/tweetView'],
  tagName: "div",

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.parseCreatedAt();
  },

  parseCreatedAt: function() {
    var regex = /^\w+ \d+/;
    var tweet_created_at = this.model.attributes.tweet_created_at.slice(4);
    this.model.attributes.tweet_created_at = tweet_created_at.match(regex)[0];
  },

  render: function() {
    var content = this.template({ tweet: this.model });
    this.$el.html(content);
    
    return this;
  }
})
