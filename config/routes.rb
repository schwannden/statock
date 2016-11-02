Rails.application.routes.draw do
  get 'exchanges/index'

  get 'stocks/index'

  get 'stocks/show'

  root 'welcome#index'
  get '/paired', to: 'welcome#index'
  get '/portfolio-theory', to: 'welcome#index'

  resources :stocks, only: [:index, :show] do
    resources :prices, only: [:index]
  end

  resources :exchanges, only: [:index]
end
