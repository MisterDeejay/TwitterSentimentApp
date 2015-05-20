class AddTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.string :twitter_id, null: false
      t.text :text, null: false
      t.string :user_id, null: false
      t.string :name, null: false
      t.string :screen_name, null: false
      t.string :location
      t.string :tweet_created_at, null: false
      t.string :profile_image_url, null: false
      t.string :sentiment

      t.timestamps null: false
    end
  end
end
