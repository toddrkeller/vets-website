class Item < ApplicationRecord
  belongs_to :order
  enum type: [ :sock, :sheath, :tShirt ]
  enum sockSize: [ 6..14 ]
  enum sheathSize: [ 6..14 ]
  enum tSize: [ :xs, :sm, :med, :lg, :xl, :xxl ]
  enum legArm: [ :leg, :arm, :top ]
  enum leftRightTop: [ :left, :right, :top ]
end
