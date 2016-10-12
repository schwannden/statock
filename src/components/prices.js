import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class Prices extends React.Component {
  componentDidUpdate() {
    var chart = AmCharts.makeChart( "stock-price", {
      "type": "stock",
      "theme": "light",
 
      "dataSets": [ {
        "title": "return (close value of indicated day - open value of the first day in range)",
        "fieldMappings": [ { "fromField": "open", "toField": "open" }, 
                           { "fromField": "high", "toField": "high" }, 
                           { "fromField": "low", "toField": "low" }, 
                           { "fromField": "adjusted", "toField": "adjusted" }, 
                           { "fromField": "close", "toField": "close" }, 
                           { "fromField": "volume", "toField": "volume" } 
        ],
        "compared": false,
        "categoryField": "dateAdj",
        "dataProvider": this.props.prices
      }, {
        "title": "return calculated with adjusted close price",
        "fieldMappings": [ { "fromField": "adjusted", "toField": "adjusted" } ],
        "compared": true,
        "categoryField": "dateAdj",
        "dataProvider": this.props.prices
      }],
      "dataDateFormat": "YYYY-MM-DD",
      "panels": [
        {
          "title": "Value",
          "percentHeight": 70,
     
          "stockGraphs": [ {
            "type": "candlestick",
            "id": "g1",
            "openField": "open",
            "closeField": "close",
            "highField": "high",
            "lowField": "low",
            "valueField": "adjusted",
            "lineColor": "#fff",
            "fillColors": "#fff",
            "negativeLineColor": "#db4c3c",
            "negativeFillColors": "#db4c3c",
            "fillAlphas": 1,
            "comparedGraphLineThickness": 2,
            "columnWidth": 0.7,
            "comparable": true,
            "compareField": "adjusted",
            "balloonText": "open:<b>[[open]]</b><br>close:<b>[[close]]</b><br>low:<b>[[low]]</b><br>high:<b>[[high]]</b>"
          } ],
          "stockLegend": {
            "valueTextRegular": undefined,
            "periodValueTextComparing": "[[value.adjusted]]%"
          }
        },
        {
          "title": "Volume",
          "percentHeight": 30,
          "marginTop": 1,
          "columnWidth": 0.6,
          "showCategoryAxis": false,
     
          "stockGraphs": [ {
            "valueField": "volume",
            "openField": "open",
            "type": "column",
            "showBalloon": false,
            "fillAlphas": 1,
            "lineColor": "#fff",
            "fillColors": "#fff",
            "negativeLineColor": "#db4c3c",
            "negativeFillColors": "#db4c3c",
            "useDataSetColors": false
          } ],
          "stockLegend": {
            "markerType": "none",
            "markerSize": 0,
            "labelText": "",
            "periodValueTextRegular": "[[value.close]]"
          },
          "valueAxes": [ {
            "usePrefixes": true
          } ]
        }
      ],
      "panelsSettings": {
        "plotAreaFillColors": "#333",
        "plotAreaFillAlphas": 1,
        "marginLeft": 60,
        "marginTop": 5,
        "marginBottom": 5
      },
      "chartScrollbarSettings": {
        "graph": "g1",
        "graphType": "line",
        "usePeriod": "WW",
        "backgroundColor": "#333",
        "graphFillColor": "#666",
        "graphFillAlpha": 0.5,
        "gridColor": "#555",
        "gridAlpha": 1,
        "selectedBackgroundColor": "#444",
        "selectedGraphFillAlpha": 1
      },
      "categoryAxesSettings": {
        "equalSpacing": true,
        "gridColor": "#555",
        "gridAlpha": 1
      },
      "valueAxesSettings": {
        "gridColor": "#555",
        "gridAlpha": 1,
        "inside": false,
        "showLastLabel": true
      },
      "chartCursorSettings": {
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true
      },
      "legendSettings": {
        //"color": "#fff"
      },
      "balloon": {
        "textAlign": "left",
        "offsetY": 10
      },
      "periodSelector": {
        "position": "bottom",
        "periods": [ {
          "period": "DD",
          "count": 10,
          "label": "10D"
          }, {
            "period": "MM",
            "count": 1,
            "label": "1M"
          }, {
            "period": "MM",
            "count": 6,
            "label": "6M"
          }, {
            "period": "YYYY",
            "count": 1,
            "label": "1Y"
          }, {
            "period": "YYYY",
            "count": 2,
            "selected": true,
            "label": "2Y"
          },
          {
            "period": "MAX",
            "label": "MAX"
          }
        ]
      }
    });
  }

  render() {
    return (
      <div id={"stock-price"}> </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    prices: state.prices,
  };
}

Prices.propTypes = {
  prices: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Prices);
