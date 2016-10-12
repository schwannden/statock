import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {jStat} from 'jStat';
import * as myStat from './utils/statistics';

import { Table } from '@sketchpixy/rubix';

class SingleStatistics extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      distribution_data: [],
      returns: [],
      positive_returns: [],
      s_mean: 0,
      s_var: 0,
    };
  }

  componentWillReceiveProps(props) {
    const prices = props.prices;
    const initial = (prices.length == 0)? 0 : prices[0].adjusted;
    const returns = prices.map((price) => ((price.close - initial)*100/initial));
    const positive_returns = returns.filter((val) => {return (val > 0);})
    const s_mean = jStat.mean(returns), s_var = jStat.variance(returns);
    const distribution_data = myStat.binCount(returns, 40);
    this.setState({distribution_data, returns, positive_returns, s_mean, s_var});
  }

  componentDidUpdate() {
    var chart = AmCharts.makeChart("stock-distribution", {
      "type": "serial",
      "theme": "light",
      "marginTop":0,
      "marginRight": 80,
      "dataProvider": this.state.distribution_data,
      "valueAxes": [{
          "axisAlpha": 0,
          "position": "left",
      }],
      "graphs": [{
          "id":"g1",
          "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
          "bullet": "round",
          "bulletSize": 8,
          "lineColor": "#d1655d",
          "lineThickness": 2,
          "negativeLineColor": "#637bb6",
          "type": "smoothedLine",
          "valueField": "y"
      }],
      "chartScrollbar": {
        "graph":"g1",
        "gridAlpha":0,
        "color":"#888888",
        "scrollbarHeight":55,
        "backgroundAlpha":0,
        "selectedBackgroundAlpha":0.1,
        "selectedBackgroundColor":"#888888",
        "graphFillAlpha":0,
        "autoGridCount":true,
        "selectedGraphFillAlpha":0,
        "graphLineAlpha":0.2,
        "graphLineColor":"#c2c2c2",
        "selectedGraphLineColor":"#888888",
        "selectedGraphLineAlpha":1
      },
      "categoryField": "x",
    });
  }

  render() {
    const s_mean = this.state.s_mean, s_var = this.state.s_var,
      returns = this.state.returns, positive_returns = this.state.positive_returns;
    return (
      <div>
        <h3> Statistics </h3>
        <Table bordered striped condensed responsive>
          <thead>
            <tr>
              <th>Source</th>
              <th>Mean</th>
              <th>Variance</th>
              <th>Kurtosis</th>
              <th>Skewness</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>All Returns</td>
              <td>{this.state.s_mean}</td>
              <td>{this.state.s_var}</td>
              <td>{jStat.kurtosis(returns)}</td>
              <td>{jStat.skewness(returns)}</td>
            </tr>
            <tr>
              <td>Positive Returns</td>
              <td>{jStat.mean(positive_returns)}</td>
              <td>{jStat.variance(positive_returns)}</td>
              <td>{jStat.kurtosis(positive_returns)}</td>
              <td>{jStat.skewness(positive_returns)}</td>
            </tr>
          </tbody>
        </Table>
        <h3> Hypothesis Testing for return = 0 </h3>
        <Table bordered striped condensed responsive>
          <thead>
            <tr>
              <th>Assumption</th>
              <th>p-value</th>
              <th>95% Confidence Interval</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Variance Known (use sample variance)</td>
              <td>{jStat.ztest(s_mean * Math.sqrt(returns.length / s_var), 2)}</td>
              <td>{JSON.stringify(myStat.meanCI(returns, 0.95, this.state.s_var))}</td>
            </tr>
            <tr>
              <td>Variance Unknown</td>
              <td>{myStat.ttest(s_mean, s_var, returns.length - 1)}</td>
              <td>{JSON.stringify(myStat.meanCI(returns, 0.95))}</td>
            </tr>
          </tbody>
        </Table>
        <h3> Distribution (Bin Counting) </h3>
        <div id={"stock-distribution"}> </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    prices: state.prices,
  };
}

SingleStatistics.propTypes = {
  prices: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(SingleStatistics);
