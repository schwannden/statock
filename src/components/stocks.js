import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as stockActions from '../actions/stockActions';

import { FormGroup, FormControl, ControlLabel, Col, Row } from '@sketchpixy/rubix';
import Stock from './stock';
import Exchange from './exchange';

class Stocks extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onExchangeSelect = this.onExchangeSelect.bind(this);
    this.onStockSelect = this.onStockSelect.bind(this);
    this.onSearchInput = this.onSearchInput.bind(this);
    this.filterAndSelect = this.filterAndSelect.bind(this);
    
    this.state = {
      exchange_id: -1,
      search: "",
      stock_id: -1,
      filteredStocks: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.filterAndSelect(nextProps)();
  }

  componentDidMount() {
    this.filterAndSelect(this.props)();
  }

  onExchangeSelect(e) {
    const new_state = Object.assign({}, this.state, {exchange_id: e.target.value});
    this.setState(new_state, this.filterAndSelect(this.props));
  }

  onStockSelect(e) {
    const stock_id = e.target.value;
    this.setState(Object.assign({}, this.state, {stock_id}));
    this.props.dispatch(this.props.onStockSelect(stock_id));
  }

  onSearchInput(e) {
    const new_state = Object.assign({}, this.state, {search: e.target.value.toUpperCase()});
    this.setState(new_state, this.filterAndSelect(this.props));
  }

  filterAndSelect(props) {
    return () => {
      const exchanges = props.exchanges,
        stocks = props.stocks,
        dispatch = props.dispatch,
        onStockSelect = props.onStockSelect,
        search = this.state.search;
      if (stocks.length > 0 && exchanges.length > 0) {
        let exchange_id = this.state.exchange_id,
          stock_id = this.state.stock_id;
        if (exchange_id == -1) exchange_id = exchanges[0].id;
        const filteredStocks = stocks.filter(stock => 
          ((stock.exchange_id == exchange_id) &&
          (stock.name.toUpperCase().match(search) || stock.symbol.toUpperCase().match(search)))
        );
        if (stock_id != filteredStocks[0].id) {
          stock_id = filteredStocks[0].id;
          dispatch(onStockSelect(stock_id));
        }
        const new_state = Object.assign({}, this.state, {stock_id, exchange_id, filteredStocks});
        this.setState(new_state);
      }
    }
  }

  render() {
    return (
      <Row>
        <Col xs={2}>
          <FormGroup controlId="select-exchange">
            <ControlLabel>Exchange</ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={this.onExchangeSelect}>
              {
                this.props.exchanges.map(exchange =>
                  <Exchange key={exchange.id} exchange={exchange}/>
                )
              }
            </FormControl>
          </FormGroup>
        </Col>
        <Col xs={3}>
          <FormGroup controlId="text-search">
            <ControlLabel>Symbol / Keyword</ControlLabel>
            <FormControl type="text" placeholder="Search" onChange={this.onSearchInput} />
          </FormGroup>
        </Col>
        <Col xs={7}>
          <FormGroup controlId="select-stock">
            <ControlLabel>Stock</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.stock_id} onChange={this.onStockSelect}>
              {
                this.state.filteredStocks.map(stock =>
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
    stocks: state.stocks,
    exchanges: state.exchanges,
  };
}

Stocks.propTypes = {
  stocks: PropTypes.array.isRequired,
  exchanges: PropTypes.array.isRequired,
  onStockSelect: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Stocks);
