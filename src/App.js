import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <div className="wcApp">
        <div wcAppHeader">
          <img src={logo} className="wcAppLogo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="wcAppIntro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
