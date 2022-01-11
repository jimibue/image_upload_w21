# frozen_string_literal: true

class User < ActiveRecord::Base
  # we want to treat the liked_cats attr as an array, but our DB
  # can't store it as array, `serialize :liked_cats` is this store
  # liked_cats as text in our db, but we can treat it like an array here
  serialize :liked_cats, Array

  has_many :images

  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  # class method
  def self.unliked_cats(ids)
    ids = ids.empty? ? [0] : ids
    Cat.where("id NOT IN (?)", ids).order("RANDOM()")
  end

  def self.liked(ids)
    ids = ids.empty? ? [0] : ids
    Cat.where("id IN (?)", ids)
  end
end
