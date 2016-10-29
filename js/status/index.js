import React from 'react';
import axios from 'axios';

import {
  Grid, Row, Col,
} from 'react-bootstrap';

import { StatusAtem } from './atem';
import { StatusOutputs } from './outputs';
import { StatusInputs } from './inputs';

const refreshInterval = 5000;

export class StatusPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: null,
      error: null
    };
  }

  componentWillMount(){
    this.refresh();
  }
  // componentWillReceiveProps(newProps){
  //   this.refresh();
  // }

  componentDidMount(){
    this.refreshInterval = setInterval(() => this.refresh(), refreshInterval);
  }
  componentWillUnmount(){
    clearInterval(this.refreshInterval);
  }

  refresh(){
    axios.get('/api/status')
    .then(res => {
      this.setState({
        data: res.data,
        error: null
      });
    })
    .catch(error => {
      this.setState({
        data: null,
        error: "Failed to fetch status"
      });
    });
  }

  render(){
    const { data } = this.state;

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>Status</h1>
          </Col>

          <StatusAtem data={data} />

          <StatusOutputs data={data} />

          <StatusInputs data={data} />

        </Row>
      </Grid>
    );
  }
}