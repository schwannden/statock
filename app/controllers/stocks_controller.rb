class StocksController < ApplicationController
  before_action :set_stock, only: [:show]

  def index
    render json: Stock.all
  end

  def show
    render json: @stock
  end

  private

  def set_stock
    @stock = Stock.find params["id"]
  end

end
