import React, {PropTypes} from 'react';
import * as stockActions from '../actions/stockActions';

import Stocks from '../components/stocks';
import Portfolio from '../components/portfolio';

import {
  Row,
  Col,
  Grid,
  Panel,
  PanelBody,
  PanelContainer,
} from '@sketchpixy/rubix';

const store_id="portfolio";
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
                    <Stocks store_id={store_id} multiple={true}/>
                    <h3>Current Portfolio</h3>
                    <Portfolio store_id={store_id}/>
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
