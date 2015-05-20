# == Schema Information
#
# Table name: tweets
#
#  id                :integer          not null, primary key
#  twitter_id        :string           not null
#  text              :text             not null
#  user_id           :string           not null
#  name              :string           not null
#  screen_name       :string           not null
#  location          :string
#  tweet_created_at  :string           not null
#  profile_image_url :string           not null
#  sentiment         :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

require 'spec_helper'

describe Tweet do
  pending "add some examples to (or delete) #{__FILE__}"
end
