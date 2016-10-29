import express from 'express';
import http from 'http';
import url from 'url';
import bodyParser from 'body-parser';
import jsonfile from 'jsonfile';

import OutputState from './state';
import { Updater } from './updater';

import config from './config';
import initialSetup from './setup';

const app = express();
const server = http.createServer(app);
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.set('view engine', 'pug');

const state = {
  atem: {
    ip: initialSetup.atemIp,
    conn: null
  },
  testMode: false,
  outputs: initialSetup.outputMap,
  inputs: [],
};

const updater = new Updater(state);

function writeSetupFile(){
  const obj = {
    "atemIp": state.atem.ip,
    "outputCount": state.outputs.length,
    "outputMap": state.outputs
  };

  jsonfile.writeFile('./setup.json', obj, {spaces: 2}, function(err) {
    console.error(err || "Saved setup.json")
  });
}

if (initialSetup.outputCount != initialSetup.outputMap.length)
  throw "Mismatch in state file regarding outputs";

app.get('/', function (req, res) {
  const parsed = url.parse(req.protocol + "://" + req.get('host'));
  const script = "http://" + parsed.hostname + ":" + config.webpack + "/public/js/app.js";

  res.render('main', { script });
});

app.get('/api/setup/device', (req, res) => {
  res.send({
    atemIp: state.atem.ip,
    testMode: state.testMode
  });
});
app.post('/api/setup/device', (req, res) => {
  const { testMode, atemIp } = req.body;
  
  // TODO - validate data
  state.testMode = !!testMode;
  state.atem.ip = atemIp;
  writeSetupFile();

  // TODO - perform reconnect + update mode
  updater.startStopTestMode();

  res.send({
    atemIp: state.atem.ip,
    testMode: state.testMode
  });
});

app.get('/api/setup/map', (req, res) => {
  res.send({
    outputs: state.outputs
  });
});
app.post('/api/setup/map', (req, res) => {
  const { outputs } = req.body;

  // TODO - validate data
  state.outputs = outputs;
  writeSetupFile();

  // TODO - force a refresh

  res.send({
    outputs: state.outputs
  });
});


//listen for http
server.listen(config.port || 3000, "0.0.0.0", function () {
  console.log('Server listening at port %d', config.port || 3000);
});
