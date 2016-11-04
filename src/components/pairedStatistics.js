import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as myStat from './utils/statistics';

import { Table } from '@sketchpixy/rubix';

class PairedStatistics extends React.Component {
  render() {
    const r1 = this.props.returns1, r2 = this.props.returns2;
    return (
      <div>
        <h3> Statistics </h3>
        <Table bordered striped condensed responsive>
          <thead>
            <tr>
              <th>covariance</th>
              <th>Correlation (Pearson)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{jStat.covariance(r1, r2)}</td>
              <td>{jStat.corrcoeff(r1, r2)}</td>
            </tr>
          </tbody>
        </Table>
        <h3> Hypothesis Testing for Equality of Mean </h3>
        <Table bordered striped condensed responsive>
          <thead>
            <tr>
              <th>Assumption</th>
              <th>p-value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Variance Known (use sample variance)</td>
              <td> {myStat.diffOfMean(r1, r2, jStat.variance(r1), jStat.variance(r2))} </td>
            </tr>
            <tr>
              <td> Variance Unknown</td>
              <td> {myStat.diffOfMean(r1, r2)} </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state, {store_id}) {
  const stock1 = state.finance.selector[store_id[0]].selected_stocks[0],
    stock2 = state.finance.selector[store_id[1]].selected_stocks[0];
  return {
    returns1: stock1 == undefined? [] : stock1.returns,
    returns2: stock2 == undefined? [] : stock2.returns,
  };
}

PairedStatistics.propTypes = {
  store_id: PropTypes.array.isRequired,
  returns1: PropTypes.array.isRequired,
  returns2: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(PairedStatistics);
