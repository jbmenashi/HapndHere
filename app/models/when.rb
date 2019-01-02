class When < ApplicationRecord
  has_many :events
  has_many :locations, -> { distinct }, through: :events

end
