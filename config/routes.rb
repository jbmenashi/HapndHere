Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :events
      resources :whens
      resources :locations
      get "/whens/:id/locations", to: "whens#locations"
      get "/whens/:id/locations/:location_id/events", to: "whens#events"
      post "/locations/:id/events", to: "locations#events"
    end
  end
end
