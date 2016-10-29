import React from 'react';
import axios from 'axios';

import {
  Col,
  Form, Button,
  FormGroup, FormControl, ControlLabel,
} from 'react-bootstrap';

import { LoadingBar } from '../loading';
import { ButtonState } from './outputs';

export class StatusInputs extends React.Component {
  rende(){
    const { data } = this.props;

    return data.outputs.map((v,i) => (
      <FormGroup key={i}>
        <Col componentClass={ControlLabel} sm={2}>
          Output { String.fromCharCode(65 + i) }
          { v.input > 0 ? " (Input " + v.input + ")" : " (Disabled)" }
          :
        </Col>
        <Col sm={8}>
          <ButtonState state={v.value} />
        </Col>
      </FormGroup>
    ));
  }

  render(){
    const { data } = this.props;

    if (!data)
      return <LoadingBar />;

    const buttons = [];
    for(let i=0; i<data.inputs.length; i++){
      buttons.push(<ButtonState key={i} state={data.inputs[i]} label={(i+1)} />);
      buttons.push(" ");

      if (i == 9)
        buttons.push(<br key={"b"+i} />);
    }

    return (
      <Col xs={12}>
        <h2>Inputs</h2>

        <p>
          { buttons }
        </p>
      </Col>
    );
  }
}