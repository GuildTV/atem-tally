import Atem from 'atem';

import OutputState from './state';

const testModeTickTime = 0.5 * 1000;

export class Updater {
  constructor(state){
    this.state = state;
    this.conn = new Atem();

    this.outputState = [];

    this.testInterval = null;
    this.testPosition = -1;
    this.testState = [];

    for (let i=0; i<this.state.outputs.length; i++){
      this.outputState.push(OutputState.CLEAR);
      this.testState.push(OutputState.CLEAR);
    }

    if (this.state.atem.ip)
      this.reconnect();
  }

  reconnect(){
    console.log("Attempting to connect to atem: " + this.state.atem.ip);
    this.conn.ip = this.state.atem.ip;
    this.conn.connect();
  }

  isTestMode(){
    return this.state.testMode;
  }

  outputValues(){
    //TODO
  }

  startStopTestMode(){
    if (!this.isTestMode()){
      if (this.testInterval)
        clearInterval(this.testInterval);

      this.testInterval = null;
      this.outputValues();
      return;
    }

    // Only start if one doesnt already exist
    if (!this.testInterval)
      this.testInterval = setInterval(() => this.testModeTick(), testModeTickTime);

    this.testPosition = -1;
  }

  testModeTick(){
    this.testPosition++;

    if (this.testPosition > this.testState.length*2)
      this.testPosition = -1;

    const out = Math.floor(this.testPosition / 2);
    if (out >= this.testState.length) {
      return this.testModeSet(-1, 0);
    }

    this.testModeSet(out, this.testPosition % 2)
  }

  testModeSet(out, state){
    if (out == -1)
      console.log("TestMode: All off");
    else
      console.log("TestMode: " + String.fromCharCode(65 + out) + " to " + (state ? "Preview" : "Program"));

    for (let i=0; i<this.testState.length; i++){
      this.outputState[i] = out == i ? (state == 0 ? OutputState.PREVIEW : OutputState.PROGRAM) : OutputState.CLEAR;
    }
  }

}