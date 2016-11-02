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

const store_id = ["paired1", "paired2"];

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
                    <Stocks store_id={store_id[0]} multiple={false}/>
                    <Stocks store_id={store_id[1]} multiple={false}/>
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
                    <PairedStatistics store_id={store_id}/>
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
