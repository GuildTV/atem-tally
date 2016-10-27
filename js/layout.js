import React from 'react';

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
                <li className="active"><a href="#">Status</a></li>
                <li><a href="#about">Setup</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">

          <div className="starter-template">
            <h1>Bootstrap starter template</h1>
            <p className="lead">Use this document as a way to quickly start any new project.<br /> All you get is this text and a mostly barebones HTML document.</p>
          </div>

        </div>
      </div>
    );
  }
}