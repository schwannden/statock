class ExchangesController < ApplicationController
  def index
    render json: Exchange.all
  end
end
