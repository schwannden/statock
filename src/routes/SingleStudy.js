import React, {PropTypes} from 'react';
import * as stockActions from '../actions/stockActions';

import Stocks from '../components/stocks';
import Prices from '../components/prices';
import SingleStatistics from '../components/singleStatistics';

import {
  Row,
  Col,
  Grid,
  Panel,
  PanelBody,
  PanelContainer,
} from '@sketchpixy/rubix';

class SingleStudy extends React.Component {

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
                    <Stocks onStockSelect={stockActions.prices}/>
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
                    <h3> Price & Return</h3>
                    <Prices />
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
                    <SingleStatistics />
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

export default SingleStudy;
