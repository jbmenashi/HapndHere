class LocationSerializer < ActiveModel::Serializer
  attributes :id, :city, :state, :latitude, :longitude
  has_many :events
end
