class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  mount_uploader :image, ImageUploader

  #imageとcontentが両方カラの時はモデルを更新しない。
  validates :content, presence: true, unless: :image?
end
