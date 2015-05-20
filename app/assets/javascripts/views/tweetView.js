window.TweetApp.Views.TweetView = Backbone.View.extend({
  template: JST["tweets/tweetView"],
  tagName: "li",

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({ tweet: this.model });
    this.$el.html(content);

    return this;
  }
})
