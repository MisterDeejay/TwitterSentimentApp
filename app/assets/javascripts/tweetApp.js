window.TweetApp = {
  Models: {},
  Collections: {},
  Views: {},

  initialize: function () {
    var view = new TweetApp.Views.Root();
    $("body").append(view.render().$el);
  }
};
