import React, {PropTypes} from 'react';
import * as stockActions from '../actions/stockActions';

import Stocks from '../components/stocks';
import Prices from '../components/prices';
import PairedStatistics from '../components/pairedStatistics';

import {
  Row,
  Col,
  Grid,
  Panel,
  PanelBody,
  PanelContainer,
} from '@sketchpixy/rubix';

class PairedStudy extends React.Component {

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
                    <Stocks onStockSelect={stockActions.paired_prices(0)}/>
                    <Stocks onStockSelect={stockActions.paired_prices(1)}/>
                  </Col>
                </Row>
              </Grid>
            </PanelBody>
          </Panel>
        </PanelContainer>
        <PanelContainer>
          <Panel>
            <PanelBody style={{padding: 0}}>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <PairedStatistics />
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

export default PairedStudy;
