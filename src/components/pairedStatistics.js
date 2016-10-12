import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {jStat} from 'jStat';
import * as myStat from './utils/statistics';

import { Table } from '@sketchpixy/rubix';

class SingleStatistics extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      returns: [[], []],
    };
  }

  componentWillReceiveProps(props) {
    const returns = props.pairedPrices.map((prices) => myStat.fromPriceToReturns(prices));
    this.setState({returns});
  }

  render() {
    const r1 = this.state.returns[0], r2 = this.state.returns[1];
    return (
      <div>
        <h3> Statistics </h3>
        <Table bordered striped condensed>
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
        <Table bordered striped condensed>
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

function mapStateToProps(state, ownProps) {
  return {
    pairedPrices: state.pairedPrices,
  };
}

SingleStatistics.propTypes = {
  pairedPrices: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(SingleStatistics);
