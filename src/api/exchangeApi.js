import client from '@sketchpixy/rubix/lib/utils/HttpClient';

class ExchangeApi {
  static index() {
    return client.get("/exchanges");
  }
}

export default ExchangeApi;
