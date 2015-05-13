class HomeController < ApplicationController
  def root; end

  def get_tweets
    @tweets = $twitter.search(query_params, count: 1)
    binding.pry
    render json: @tweets
  end

  private
  def query_params
    params.require("query")
  end
end
