window.TweetApp = {
  Models: {},
  Collections: {},
  Views: {},

  initialize: function () {
    var view = new TweetApp.Views.Root();
    $("body").append(view.render().$el);
  }
};


Backbone.CompositeView = Backbone.View.extend({
  addSubview: function(selector, subview) {
    this.subviews(selector).push(subview);
    this.attachSubview(selector, subview.render());
  },

  attachSubview: function(selector, subview) {
    $subviewEl = this.$(selector);
    this.$(selector).append(subview.$el);
    subview.delegateEvents();
  },

  subviews: function(selector) {
    this._subviews = this._subview || {}

    if(!selector) {
      return this._subviews;
    } else {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    }
  },
});
