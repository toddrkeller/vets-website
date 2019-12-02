class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.text :mailing
      t.integer :kind
      t.datetime :changeDate
      t.references :person, foreign_key: true

      t.timestamps
    end
  end
end
