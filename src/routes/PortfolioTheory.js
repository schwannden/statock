import React, {PropTypes} from 'react';
import * as stockActions from '../actions/stockActions';

import Stocks from '../components/stocks';
import Portfolio from '../components/portfolio';
import EfficientFrontier from '../components/efficientFrontier';

import {
  Row,
  Col,
  Grid,
  Panel,
  PanelBody,
  PanelContainer,
} from '@sketchpixy/rubix';

const selector_option={store_id: "portfolio", multiple: true,}, plot_id = "efficient-plot";
class PortfolioTheory extends React.Component {
  render () {
    return (
      <div className='home'>
        <PanelContainer>
          <Panel>
            <PanelBody style={{padding: 0}}>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <h3>Select Stock</h3>
                    <Stocks {...selector_option}/>
                    <h3>Current Portfolio</h3>
                    <Portfolio {...selector_option}/>
                  </Col>
                </Row>
              </Grid>
            </PanelBody>
          </Panel>
          <Panel>
            <PanelBody style={{padding: 0}}>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <h3> Efficient Frontier / Tangential Portfolio</h3>
                    <EfficientFrontier plot_id={plot_id} store_id={selector_option.store_id}/>
                  </Col>
                </Row>
              </Grid>
            </PanelBody>
          </Panel>
        </PanelContainer>
      </div>
    );
  }
}

export default PortfolioTheory;
