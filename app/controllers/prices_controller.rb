class PricesController < ApplicationController
  before_action :set_stock, only: [:index]

  def index
    render json: @stock.prices.all
  end

  private

  def set_stock
    @stock = Stock.find params["stock_id"]
  end

end
