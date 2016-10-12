require 'csv'

if (Exchange.all.size == 0) then
  NYSE   = Exchange.create name: "NYSE"
  NASDAQ = Exchange.create name: "NASDAQ"
else
  NYSE   = Exchange.find_by name: "NYSE"
  NASDAQ = Exchange.find_by name: "NASDAQ"
end

symbolFile = "./src/api/stock.data/symbols.csv"
symbols = CSV.parse(File.read(symbolFile), headers: true)
NYSE_ID = NYSE.id
NASDAQ_ID = NASDAQ.id
batch = []
symbols.each do |symbol|
  symbol = symbol.to_hash
  exchange = symbol["exchange"]
  symbol.delete "exchange"
  symbol.delete ""
  if (exchange == "NYSE")
    symbol["exchange_id"] = NYSE_ID
  elsif (exchange == "NASDAQ")
    symbol["exchange_id"] = NASDAQ_ID
  end

  if symbol.key? "exchange_id"
    batch << Stock.new(symbol)
  end
end
Stock.import batch

def importPrices(exchange)
  batch_size = 4000
  batch = []
  stocks = exchange.stocks
  dirName = "./src/api/stock.data/" + exchange.name + "/*"
  Dir[dirName].each do |file|
    symbol = file.split("/")[5].chomp(".csv")
    stock = stocks.find_by symbol: symbol 
    if stock != nil && stock.prices.length == 0 then
      stock_id = stock.id
      prices = CSV.parse(File.read(file), headers: true)
      prices.each do |price|
        price = price.to_hash
        price["stock_id"] = stock_id
        batch << Price.new(price)
        if batch.size >= batch_size
          Price.import batch
          batch = []
        end
      end
    end
  end
  Price.import batch
end

importPrices NYSE
importPrices NASDAQ
