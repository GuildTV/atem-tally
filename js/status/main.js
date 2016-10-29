import React from 'react';

import {
  Col,
  Form, Button,
  FormGroup, FormControl, ControlLabel,
} from 'react-bootstrap';
import Switch from 'react-bootstrap-switch';

import { LoadingBar } from '../loading';

export class StatusMain extends React.Component {
  render(){
    const { data } = this.props;

    if (!data || !data.atem)
      return <LoadingBar />;

    return (
      <Col xs={12}>
        <Form horizontal>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Atem IP:
            </Col>
            <Col sm={8}>
              <FormControl.Static>{ data.atem.ip }</FormControl.Static>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Atem Status:
            </Col>
            <Col sm={8}>
              <FormControl.Static>{ data.atem.status }</FormControl.Static>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Test mode:
            </Col>
            <Col sm={8}>
              <Switch value={data.testMode} readonly />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Device Ip:
            </Col>
            <Col sm={8}>
              <FormControl.Static>{ data.ips.join(", ") }</FormControl.Static>
            </Col>
          </FormGroup>

        </Form>
      </Col>
    );
  }
}