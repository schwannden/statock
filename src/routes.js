import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route } from 'react-router';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

import Footer from './common/footer';
import Header from './common/header';
import Sidebar from './common/sidebar';

import SingleStudy from './routes/SingleStudy';
import PairedStudy from './routes/PairedStudy';
import PortfolioTheory from './routes/PortfolioTheory';

class App extends React.Component {
  render() {
    return (
      <MainContainer {...this.props}>
        <Sidebar />
        <Header />
        <div id='body'>
          <Grid>
            <Row>
              <Col xs={12}>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
      </MainContainer>
    );
  }
}

export default (
  <Route path='/' component={App}>
    <IndexRoute component={SingleStudy} />
    <Route path='/paired' component={PairedStudy} />
    <Route path='/portfolio-theory' component={PortfolioTheory} />
  </Route>
);
