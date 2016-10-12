class CreatePrices < ActiveRecord::Migration[5.0]
  def change
    create_table :prices do |t|
      t.datetime :date
      t.float :open
      t.float :high
      t.float :low
      t.float :close
      t.float :volume
      t.float :adjusted
      t.integer :stock_id

      t.timestamps
    end
  end
end
