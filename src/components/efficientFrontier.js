import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as myStat from './utils/statistics';

class EfficienrFrontier extends React.Component {
  componentDidUpdate() {
    this.plot();
  }

  componentDidMount() {
    this.plot();
  }

  plot() {
    const {portfolio} = this.props, n = portfolio.length;
    if (n < 2) return;
    const {mean, covariance, sum} = jStat,
      {multiply21, innerProduct} = myStat,
      R = portfolio.map((stock) => stock.returns),
      r = R.map((returns) => mean(returns));
    let covMatrix = Array(n);
    for (let i = 0 ; i < n ; i++) {
      covMatrix[i] = Array(n);
      for (let j = 0 ; j < n ; j++)
        covMatrix[i][j] = covariance(R[i], R[j]);
    }
    const covInv = math.inv(covMatrix), temp = multiply21(covInv, r), A = sum(temp), B = innerProduct(r, temp),
      C = sum(covInv.map(row => sum(row))), D = B*C-A**2;
    const g = covInv.map((row) => ((B * sum(row) - A * innerProduct(row, r)) / D)),
      h = covInv.map((row) => ((- A * sum(row) + C * innerProduct(row, r)) / D)),
      temp2 = multiply21(covMatrix, h), a = innerProduct(g, multiply21(covMatrix, g)),
      b = 2 * innerProduct(g, temp2), c = innerProduct(h, temp2),
      minMean = - b / 2 / c, minRisk = Math.sqrt(a - b*b / 4 / c);
    const rf = 0.08, temp3 = r.map((r) => (r-rf)), cpDenom = innerProduct(temp3, multiply21(covInv, temp3));
    functionPlot({
      target: '#efficient-plot',
      width: 1200,
      height: 600,
      xAxis: { label: "risk", domain: [minRisk - 10, minRisk + 20], },
      yAxis: { label: "return", domain: [minMean - 30, minMean + 30], },
      data: [{
        scope: {a, b, c,},
        y: 't',
        x : 'sqrt(a + b * t + c * t * t)',
        fnType: 'parametric',
        range: [minMean-100, minMean+100],
        graphType: 'polyline',
      }, {
        scope: {rf, cpDenom,},
        y: 't',
        x : 'sqrt((rf * rf - 2 * rf * t + t * t) / cpDenom)',
        fnType: 'parametric',
        range: [0, 100],
        graphType: 'polyline',
      }, {
        points: [
              [0, rf],
            ],
        fnType: 'points',
        graphType: 'scatter'
      }],
    })
  }

  render() {
    return (
      <div id={this.props.plot_id}></div>
    );
  }
}

function mapStateToProps(state, {store_id}) {
  const selector = state.finance.selector[store_id];
  const portfolio = selector.selected_stocks;
  return { portfolio, };
}

EfficienrFrontier.propTypes = {
  store_id: PropTypes.string.isRequired,
  plot_id: PropTypes.string.isRequired,
  portfolio: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(EfficienrFrontier);
