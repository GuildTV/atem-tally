import React from 'react';

import {
  Grid, Row, Col, Alert
} from 'react-bootstrap';

export class ErrorCol extends React.Component {
  render(){
    const { message, title } = this.props;
    return (
      <Col xs={12}>
        { title ? <h2>{ title }</h2> : ""}
        <Alert bsStyle="danger">
          <h4>An error occured</h4>
          <p>{ message }</p>
        </Alert>
       
      </Col>
    );
  }
}

export class ErrorPage extends React.Component {
  render(){
    return (
      <Grid>
        <Row>
          <ErrorPage {...this.props} />
        </Row>
      </Grid>
    );
  }
}