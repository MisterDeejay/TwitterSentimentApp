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
  addSubview: function(selecter, subview) {
    this.subviews(selector).push(subview);
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
