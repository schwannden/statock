class Stock < ApplicationRecord
  belongs_to :exchange
  has_many :prices

  def as_json(option={})
    super(except: [:updated_at, :created_at])
  end

end
