class HomeController < ApplicationController
  def root; end

  def get_tweets
    tweets = $twitter.search(query_params, count: 1).attrs[:statuses]
    @tweets = []
    binding.pry
    datumbox = Datumbox.create('2ef48d67598553804617c9862dfcaf8f')
    tweets.each do |t|
      tweet = Tweet.new
      tweet.twitter_id = t[:id_str]
      tweet.text = t[:text]
      tweet.user_id = t[:user][:id_str]
      tweet.name = t[:user][:name]
      tweet.screen_name = t[:user][:screen_name]
      tweet.location = t[:user][:location]
      tweet.profile_image_url = t[:user][:profile_image_url_https]
      tweet.tweet_created_at = t[:created_at]

      # Need to remove @ symbols to use datumbox API analysis
      sentiment_text = tweet.text.gsub(/@/,'')
      tweet.sentiment = datumbox.twitter_sentiment_analysis(text: sentiment_text)
      @tweets << tweet
    end
    render :index
  end

  private
  def query_params
    params.require("query")
  end
end
