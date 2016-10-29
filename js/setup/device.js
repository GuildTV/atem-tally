import React from 'react';
import axios from 'axios';

import {
  Col,
  Form, Button,
  FormGroup, FormControl, ControlLabel,
} from 'react-bootstrap';
import Switch from 'react-bootstrap-switch';

import { LoadingBar } from '../loading';
import { ErrorCol } from '../error';


export class SetupDevice extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: null,
      error: null
    };
  }

  componentWillMount(){
    axios.get('/api/setup/device')
    .then(res => {
      this.setState({
        data: res.data,
        error: null
      });
    })
    .catch(() => {
      this.setState({
        data: null,
        error: "Failed to fetch current state"
      });
    });
  }

  changeAtemIp(e){
    const { data } = this.state;
    data.atemIp = e.target.value;
    this.setState({ data })
  }
  changeTestMode(e){
    const { data } = this.state;
    data.testMode = e.value();
    this.setState({ data })
  }

  save(){
    axios.post('/api/setup/device', this.state.data)
    .then(res => {
      this.setState({
        data: res.data,
        error: null
      });
      // TODO - notify success
    })
    .catch(() => {
      // TODO - notify failure
    });
  }

  render(){
    const { data, error } = this.state;

    if (error)
      return <ErrorCol message={error} />;

    if (!data)
      return <LoadingBar />;

    return (
      <Col xs={12}>
        <Form horizontal onSubmit={() => this.save()}>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Atem Ip:
            </Col>
            <Col sm={8}>
              <FormControl type="text" placeholder="10.0.0.1" value={data.atemIp} onChange={e => this.changeAtemIp(e)} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Test mode:
            </Col>
            <Col sm={8}>
              <Switch value={data.testMode} onChange={e => this.changeTestMode(e)} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" bsStyle="success">Save</Button>
            </Col>
          </FormGroup>
        </Form>
      </Col>
    );
  }
}