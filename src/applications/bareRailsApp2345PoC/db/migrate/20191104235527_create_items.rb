class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.integer :type
      t.integer :legArm
      t.integer :leftRightTop
      t.float :widthTop
      t.float :widthToe
      t.float :length
      t.integer :sockSize
      t.integer :sheathSize
      t.integer :tSize
      t.references :order, foreign_key: true

      t.timestamps
    end
  end
end
