import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import StockActions from '../actions/stockActions';

import { FormGroup, FormControl, ControlLabel, Col, Row } from '@sketchpixy/rubix';
import Stock from './stock';
import Exchange from './exchange';

class Stocks extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onExchangeSelect = this.onExchangeSelect.bind(this);
    this.onStockSelect = this.onStockSelect.bind(this);
    this.onSearchInput = this.onSearchInput.bind(this);
  }

  componentWillReceiveProps(props) {
    this.initialize(props);
  }

  componentDidMount() {
    this.initialize(this.props);
  }

  initialize({selector, multiple, onStockSelect, dispatch}) {
    const {selected_stocks, filtered_stocks} = selector;
    if (!multiple && filtered_stocks.length > 0)
      if (selected_stocks.length == 0) {
        this.props.actions.prices(filtered_stocks[0]);
      } else {
        const {exchange_id, search_str} = selector;
        const old = this.props.selector;
        if (exchange_id != old.exchange_id || search_str != old.search_str) {
          if (selected_stocks[0].id != filtered_stocks[0].id)
            this.props.actions.prices(filtered_stocks[0]);
        }
      }
  }

  onExchangeSelect(e) {
    this.props.actions.filter({
      search_str: this.props.selector.search_str,
      exchange_id: e.target.value,
    });
  }

  onSearchInput(e) {
    this.props.actions.filter({
      search_str: e.target.value,
      exchange_id: this.props.selector.exchange_id,
    });
  }

  onStockSelect(e) {
    const stock_id = e.target.value, actions = this.props.actions;
    const selected_stock = this.props.stocks.find(stock => stock.id == stock_id);
    if (this.props.multiple) {
      const {selected_stocks} = this.props.selector;
      const remove_index = selected_stocks.findIndex(stock => stock.id == stock_id);
      if (remove_index == -1)
        actions.prices(selected_stock)
      else
        actions.remove(remove_index)
    } else {
      actions.prices(selected_stock)
    }
  }

  render() {
    const {exchanges, multiple, selector} = this.props;
    const {exchange_id, search_str, filtered_stocks, selected_stocks} = selector;
    const selected_id = selected_stocks.length?
      (multiple? selected_stocks.map((stock => stock.id)) : selected_stocks[0].id) :
      (multiple? [] : "");
    return (
      <Row>
        <Col md={2}>
          <FormGroup controlId="select-exchange">
            <ControlLabel>Exchange</ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={this.onExchangeSelect} value={exchange_id}>
              {
                exchanges.map(exchange =>
                  <Exchange key={exchange.id} exchange={exchange}/>
                )
              }
            </FormControl>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup controlId="text-search">
            <ControlLabel>Symbol / Keyword</ControlLabel>
            <FormControl type="text" placeholder="Search" onChange={this.onSearchInput} value={search_str}/>
          </FormGroup>
        </Col>
        <Col md={7}>
          <FormGroup controlId="select-stock">
            <ControlLabel>Stock</ControlLabel>
            <FormControl componentClass="select" placeholder="select" multiple={multiple}
              value={selected_id} onChange={this.onStockSelect}>
              {
                filtered_stocks.map(stock =>
                  <Stock key={stock.id} stock={stock} />
                )
              }
            </FormControl>
          </FormGroup>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    stocks: state.finance.stocks,
    exchanges: state.finance.exchanges,
    selector: state.finance.selector[ownProps.store_id],
  };
}

function mapDispatchToProps(dispatch, {store_id, multiple}) {
  let stockActions = new StockActions(store_id, multiple);
  return {
    actions: {
      prices: stock => dispatch(stockActions.prices(stock)),
      remove: remove_index => dispatch(stockActions.remove(remove_index)),
      filter: filter_options => dispatch(stockActions.filter(filter_options)),
    }
  };
}

Stocks.propTypes = {
  store_id: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  stocks: PropTypes.array.isRequired,
  exchanges: PropTypes.array.isRequired,
  selector: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stocks);
