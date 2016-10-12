import client from '@sketchpixy/rubix/lib/utils/HttpClient';

class StockApi {
  static index() {
    return client.get("/stocks");
  }

  static prices(stock_id) {
    return client.get(`/stocks/${stock_id}/prices`);
  }
}

export default StockApi;
