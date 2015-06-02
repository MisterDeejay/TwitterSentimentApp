class HomeController < ApplicationController
  def root; end

  def get_tweets
    tweets = $twitter.search(query_params, count: 5).attrs[:statuses]
    @tweets = []
    # datumbox = Datumbox.create('2ef48d67598553804617c9862dfcaf8f')
    hydra = Typhoeus::Hydra.new(max_concurrency: 5)
    requests = tweets.map do |t|
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

      request = Typhoeus::Request.new(
        "http://api.datumbox.com:80/1.0/TwitterSentimentAnalysis.json",
        method: :post,
        params: { api_key: "2ef48d67598553804617c9862dfcaf8f",
                  text: sentiment_text },
        headers: { tweet: tweet }
      )
      hydra.queue(request)
      request
    end
    hydra.run

    @tweets = requests.map do |r|
      tweet = r.options[:headers][:tweet]
      parsed_datumbox_response = JSON.parse(r.response.options[:response_body])
      tweet.sentiment = parsed_datumbox_response["output"]["result"]
      tweet
    end

    render :index
  end

  private
  def query_params
    params.require("query")
  end
end
