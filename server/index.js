const express = require('express');
const proxy = require('http-proxy-middleware');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../client')));

app.use('/', proxy({
  target: 'localhost:3000',
  router: {
    '/navbar': 'http://localhost:3001',
    '/productDescription': 'http://localhost:3002',
    '/morelooks': 'http://localhost:3003',
    '/reviews': 'http://localhost:3004'
  }
}))

app.listen(port, () => console.log(`Listening on proxy port ${port}!`));