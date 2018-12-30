class When < ApplicationRecord
  has_many :events
  has_many :locations, through: :events
end
