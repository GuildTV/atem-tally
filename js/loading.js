import React from 'react';

import {
  Grid, Row, Col, ProgressBar
} from 'react-bootstrap';

export class LoadingBar extends React.Component {
  render(){
    return (
      <Col xs={12}>
        <ProgressBar active now={100} style={{maxWidth: '400px', width: '100%'}} />
      </Col>
    );
  }
}

export class LoadingPage extends React.Component {
  render(){
    return (
      <Grid>
        <Row>
          <LoadingBar />
        </Row>
      </Grid>
    );
  }
}