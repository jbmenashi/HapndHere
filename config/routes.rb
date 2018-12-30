Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :locations, only: [:index, :update]
      resources :whens, only: [:index, :update]
      resources :events, only: [:index, :update]
    end
  end
end
