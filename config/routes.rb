Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :locations, only: [:index, :show, :update] do
        resources :events, only: [:index, :show, :update]
      end
      resources :whens, only: [:index, :show, :update] do
        resources :events, only: [:index, :show, :update]
      end
      resources :events, only: [:index, :show, :update]
    end
  end
end
