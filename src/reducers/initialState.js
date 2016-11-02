const selector_default = {exchange_id: -1, search_str: "", filtered_stocks: [], selected_stocks: []};

export default {
  finance: {
    stocks: [],
    exchanges: [],
    selector: {
      single:    selector_default,
      paired1:   selector_default,
      paired2:   selector_default,
      portfolio: selector_default,
    }
  },
};
