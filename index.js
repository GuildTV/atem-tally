import express from 'express';
import http from 'http';
import url from 'url';

import config from './config';

const app = express();
const server = http.createServer(app);
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'pug');


app.get('/', function (req, res) {
  const parsed = url.parse(req.protocol + "://" + req.get('host'));
  const script = "http://" + parsed.hostname + ":" + config.webpack + "/public/js/app.js";

  res.render('main', { script });
});



//listen for http
server.listen(config.port || 3000, "0.0.0.0", function () {
  console.log('Server listening at port %d', config.port || 3000);
});
