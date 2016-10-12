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
    
    let filteredStocks = this.filterAndSelect(props);
    this.state = {
      filteredStocks,
      exchanges: props.exchanges,
    };
  }

  componentWillReceiveProps(nextProps) {
    let stocks = nextProps.stocks, exchanges = nextProps.exchanges;
    let filteredStocks = this.filterAndSelect(nextProps);
    this.setState({filteredStocks, exchanges});
  }

  filterAndSelect(props) {
    let filteredStocks = [];
    if (props.stocks.length > 0 && props.exchanges.length > 0) {
      const exchange_id = props.exchanges[0].id;
      filteredStocks = props.stocks.filter((stock) => {
        return (stock.exchange_id == exchange_id);
      });
      props.dispatch(props.onStockSelect(filteredStocks[0].id));
    }
    return filteredStocks;
  }

  onExchangeSelect(e) {
    const exchange_id = e.target.value;
    let filteredStocks = this.props.stocks.filter((stock) => {
      return (stock.exchange_id == exchange_id);
    });
    this.setState(Object.assign({}, this.state, {filteredStocks}));
    this.props.dispatch(this.props.onStockSelect(filteredStocks[0].id));
  }

  onStockSelect(e) {
    const stock_id = e.target.value;
    this.props.dispatch(this.props.onStockSelect(stock_id));
  }

  render() {
    return (
      <Row>
        <Col xs={3}>
          <FormGroup controlId="select-exchange">
            <ControlLabel>Exchange</ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={this.onExchangeSelect}>
              {this.state.exchanges.map(exchange =>
                <Exchange key={exchange.id} exchange={exchange}/>
              )}
            </FormControl>
          </FormGroup>
        </Col>
        <Col xs={9}>
          <FormGroup controlId="select-stock">
            <ControlLabel>Stock</ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={this.onStockSelect}>
              {this.state.filteredStocks.map(stock =>
                <Stock key={stock.id} stock={stock} />
              )}
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
