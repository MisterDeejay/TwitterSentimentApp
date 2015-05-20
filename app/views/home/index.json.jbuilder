json.array! @tweets do |t|
  json.merge! t.attributes
end
