import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as stockActions from '../actions/stockActions';
import {jStat} from 'jStat';

import {
  Col, 
  Row,
  Table,
  Button,
  Icon,
} from '@sketchpixy/rubix';

class Portfolio extends React.Component {
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
                <td> <Button bsStyle="red" rounded> <Icon glyph="glyphicon glyphicon-trash"/> </Button> </td>
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

Portfolio.propTypes = {
  store_id: PropTypes.string.isRequired,
  portfolio: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Portfolio);
