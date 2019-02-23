Rails.application.routes.draw do
  devise_for :users
  root 'messages_controller#index'  #ルートパスの指定
  get 'messages_controller' => 'messages_controller#index'
end
