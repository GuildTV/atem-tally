import React from 'react';

import {
  Col,
  Form, Button,
  FormGroup, ControlLabel,
} from 'react-bootstrap';

import OutputState from '../../state';

import { LoadingBar } from '../loading';

export class ButtonState extends React.Component {
  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  render() {
    const { state, label } = this.props;

    let style = "default"
    switch(state){
      case OutputState.PROGRAM:
        style = "danger";
        break;
      case OutputState.PREVIEW:
        style = "success";
        break;
    }

    return <Button disabled bsStyle={style}>{ label > 0 ? "In " + this.pad(label, 2) : "-" }</Button>;
  }
}

export class StatusOutputs extends React.Component {
  renderChannels(){
    const { data } = this.props;

    return data.outputs.map((v,i) => (
      <FormGroup key={i}>
        <Col componentClass={ControlLabel} sm={2}>
          Output { String.fromCharCode(65 + i) }:
        </Col>
        <Col sm={8}>
          <ButtonState state={v.value} label={v.input} />
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