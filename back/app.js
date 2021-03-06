const express = require('express');
const graphqlHTTP = require('express-graphql');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');

let mode = process.env.NODE_ENV;
if (!mode || mode === 'test') {
  process.env.NODE_ENV = 'dev';
  mode = process.env.NODE_ENV;
}

const app = express();

app.disable('etag');
app.set('x-powered-by', false);

const morganFormat = ('dev' === mode) ? 'dev' : ':method :url :status :response-time ms - :res[content-length]';
app.use(morgan(morganFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: {
    write: str => console.error(moment().tz('Europe/Paris').format() + ': ' + str.replace(/[\r\n]+/g, '')),
  },
}));
app.use(morgan(morganFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: {
    write: str => console.info(moment().tz('Europe/Paris').format() + ': ' + str.replace(/[\r\n]+/g, '')),
  },
}));

app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({
  limit: 4 * 1024 * 1024,
}));

const {schema} = require('./schema');
const cors = require('cors');
const corsOpt = {
  origin: true,
  credentials: true
};

app.use('/graphql', cors(corsOpt), graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000);

exports.app = app;
