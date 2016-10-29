import React from 'react';
import axios from 'axios';

import {
  Col,
  Form, Button,
  FormGroup, FormControl, ControlLabel,
} from 'react-bootstrap';
import Switch from 'react-bootstrap-switch';

import OutputState from '../../state';

import { LoadingBar } from '../loading';
import { ErrorCol } from '../error';



export class StatusOutputs extends React.Component {
  renderChannels(){
    const { data } = this.props;

    return data.outputs.map((v,i) => (
      <FormGroup key={i}>
        <Col componentClass={ControlLabel} sm={2}>
          Output { String.fromCharCode(65 + i) }
          { v.input > 0 ? " (Input " + v.input + ")" : " (Disabled)" }
          :
        </Col>
        <Col sm={8}>
          {
            v.value == OutputState.PROGRAM ? "Program" : 
              (v.value == OutputState.PREVIEW ? "Preview" : " - ")
          }
        </Col>
      </FormGroup>
    ));
  }

  render(){
    const { data } = this.props;

    if (!data)
      return <LoadingBar />;

    return (
      <Col xs={12}>
        <h2>Outputs</h2>

        <Form horizontal>
          { this.renderChannels() }
        </Form>
      </Col>
    );
  }
}