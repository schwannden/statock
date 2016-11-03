import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import StockActions from '../actions/stockActions';
import {jStat} from 'jStat';

import {
  Col, 
  Row,
  Table,
  Button,
  Icon,
} from '@sketchpixy/rubix';

class Portfolio extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onRemoveSelected = this.onRemoveSelected.bind(this);
  }

  onRemoveSelected(e) {
    const stock_id = e.currentTarget.value, 
      remove_index = this.props.portfolio.findIndex(stock => stock.id == stock_id);
    this.props.actions.remove(remove_index);
  }

  render() {
    const {portfolio} = this.props;
    return (
      <Col md={12}>
        <Table bordered striped condensed responsive>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Name</th>
              <th>Mean</th>
              <th>Variance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map(({id, symbol, name, returns}) => 
              <tr key={id}>
                <td> {symbol} </td>
                <td> {name} </td>
                <td> {jStat.mean(returns)} </td>
                <td> {jStat.variance(returns)} </td>
                <td> <Button bsStyle="red" onClick={this.onRemoveSelected} value={id}> 
                       <Icon glyph="glyphicon glyphicon-trash"/> 
                     </Button> 
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
    );
  }
}

function mapStateToProps(state, {store_id}) {
  return {
    portfolio: state.finance.selector[store_id].selected_stocks,
  };
}

function mapDispatchToProps(dispatch, {store_id, multiple}) {
  let stockActions = new StockActions(store_id, multiple);
  return {
    actions: {
      remove: remove_index => dispatch(stockActions.remove(remove_index)),
    }
  };
}
Portfolio.propTypes = {
  store_id: PropTypes.string.isRequired,
  portfolio: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
