class Person < ApplicationRecord
  has_many :orders
  has_many :addresses
  validates :name, presence: true
  validates :social, presence: true, length: { minimum: 4 }
end
