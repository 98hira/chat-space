Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  get 'messages_controller' => 'messages_controller#index'
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update]
end
