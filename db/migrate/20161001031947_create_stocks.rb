class CreateStocks < ActiveRecord::Migration[5.0]
  def change
    create_table :stocks do |t|
      t.string :symbol
      t.string :name
      t.string :marketCap
      t.integer :exchange_id

      t.timestamps
    end
  end
end
