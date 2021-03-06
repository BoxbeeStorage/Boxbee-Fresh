class CreateCities < ActiveRecord::Migration
  def change
    create_table :cities do |t|
      t.string :name
      t.string :state
      t.string :country
      t.references :company, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
