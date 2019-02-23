Rails.application.routes.draw do
  root 'messages_controller#index'  #ルートパスの指定
  get 'messages_controller' => 'messages_controller#index'
end
