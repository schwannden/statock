class Exchange < ApplicationRecord
  has_many :stocks

  def as_json(option={})
    super(except: [:updated_at, :created_at])
  end

end
