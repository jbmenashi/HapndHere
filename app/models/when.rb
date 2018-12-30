class When < ApplicationRecord
  has_many :events
  has_many :locations, through: :events

  def readable_datetime
    "#{self.date.strftime('%B %d, %Y')}"
  end
  
end
