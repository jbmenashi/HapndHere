class WhenSerializer < ActiveModel::Serializer
  attributes :id, :date
  has_many :locations
end
