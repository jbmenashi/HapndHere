class Location < ApplicationRecord
  has_many :events
  has_many :whens, through: :events
end
