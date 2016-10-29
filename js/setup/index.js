import React from 'react';
import axios from 'axios';

import {
  Grid, Row, Col,
} from 'react-bootstrap';

import { SetupDevice } from './device';
import { SetupInputMap } from './input-map';

export class SetupPage extends React.Component {
  render(){
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>Setup</h1>
          </Col>

          <SetupDevice />

          <SetupInputMap />
        </Row>
      </Grid>
    );
  }
}