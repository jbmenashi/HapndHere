class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :info, :img_url
  belongs_to :location
  belongs_to :when
end
