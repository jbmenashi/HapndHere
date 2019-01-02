class Location < ApplicationRecord
  has_many :events
  has_many :whens, -> { distinct }, through: :events
end
