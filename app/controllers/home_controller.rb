class HomeController < ApplicationController
  def root; end

  def get_tweets
    byebug
    query_params = query_params.nil? ? "sendgrid" : query_params
    @tweets = $twitter.search(query_params, count: 100)
    render :index
  end

  private
  def query_params
    params.require("query")
  end
end
