class Price < ApplicationRecord
  belongs_to :stock

  def as_json(option={})
    super(methods: [:dateAdj], except: [:updated_at, :created_at])
  end

  def dateAdj
    date.to_date
  end


end
