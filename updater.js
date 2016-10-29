import Atem from 'atem';

import OutputState from './state';

const testModeTickTime = 0.4 * 1000;

export class Updater {
  constructor(state, outputWriter){
    this.state = state;
    this.outputWriter = outputWriter;

    this.conn = new Atem();
    this.conn.on('connectionStateChange', this.atemStateChange);
    this.conn.on('inputTally', (a, b) => this.atemInputUpdate(a, b));

    this.inputState = new Array(20).fill(0);

    this.testInterval = null;
    this.testPosition = -1;
    this.testState = [];

    for (let i=0; i<this.state.outputs.length; i++){
      this.testState.push(OutputState.CLEAR);
    }

    if (this.state.atem.ip)
      this.reconnect();
  }

  getAtemState(){
    return this.conn.state;
  }

  atemStateChange(state){
    console.log("Atem: State", state);
  }

  atemInputUpdate(input, state){
    console.log("Atem: Got update input " + input + " " + (state.program ? "Program" : (state.preview ? "Preview" : "Clear")));

    this.inputState[input-1] = (state.program ? OutputState.PROGRAM : (state.preview ? OutputState.PREVIEW  : OutputState.CLEAR ));

    this.inputState = new Array(20).fill(0);
    this.outputValues();
  }

  reconnect(){
    console.log("Attempting to connect to atem: " + this.state.atem.ip);
    this.conn.ip = this.state.atem.ip;
    this.conn.connect();

    this.outputValues();
  }

  isTestMode(){
    return this.state.testMode;
  }

  getValues(){
    if (this.isTestMode())
      return this.testState;

    const st = [];
    for (let i=0; i<this.state.outputs.length; i++){
      const id = this.state.outputs[i];
      st[i] = this.inputState[id];
    }

    return st;
  }

  outputValues(){
    console.log("Output: Writing");
    this.outputWriter.write(this.getValues());
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
      this.testState[i] = out == i ? (state == 0 ? OutputState.PREVIEW : OutputState.PROGRAM) : OutputState.CLEAR;
    }

    this.outputValues();
  }

}