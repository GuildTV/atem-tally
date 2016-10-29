import React from 'react';
import axios from 'axios';

import {
  Col,
  Form, Button,
  FormGroup, FormControl, ControlLabel,
} from 'react-bootstrap';

import { LoadingBar } from '../loading';
import { ErrorCol } from '../error';

class InputSelect extends React.Component {
  render(){
    const opts = [];
    for(let i=1; i<=20; i++)
      opts.push(<option key={i} value={i}>Input { i }</option>);
    return (
      <FormControl componentClass="select" placeholder="select" {...this.props}>
        <option value="0"> - Disabled - </option>
        { opts }
      </FormControl>
    );
  }
}

export class SetupInputMap extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: null,
      error: null
    };
  }

  componentWillMount(){
    axios.get('/api/setup/map')
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

  changeInput(i, v){
    const { data } = this.state;
    data.outputs[i] = parseInt(v);
    this.setState({ data })
  }

  save(){
    axios.post('/api/setup/map', this.state.data)
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

  renderChannels(){
    const { data } = this.state;

    return data.outputs.map((v,i) => (
      <FormGroup key={i}>
        <Col componentClass={ControlLabel} sm={2}>
          Output { String.fromCharCode(65 + i) }
        </Col>
        <Col sm={8}>
          <InputSelect value={v} onChange={e => this.changeInput(i, e.target.value)} />
        </Col>
      </FormGroup>
    ));
  }

  render(){
    const { data, error } = this.state;

    if (error)
      return <ErrorCol title="Input Map" message={error} />;

    if (!data)
      return <LoadingBar />;

    return (
      <Col xs={12}>
        <h2>Input Map</h2>

        <Form horizontal onSubmit={() => this.save()}>

          { this.renderChannels() }

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