class Address < ApplicationRecord
  belongs_to :person
  enum kind: [ :new, :permanent, :temporary ]
end
