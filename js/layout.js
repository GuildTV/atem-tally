import React from 'react';

import {
  MenuItem
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export class Layout extends React.Component {
  render(){
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Atem Tally</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <LinkContainer to="/status">
                  <MenuItem eventKey={3.2}>Status</MenuItem>
                </LinkContainer>
                <LinkContainer to="/setup">
                  <MenuItem eventKey={3.2}>Setup</MenuItem>
                </LinkContainer>
              </ul>
            </div>
          </div>
        </nav>

        { this.props.children }
      </div>
    );
  }
}