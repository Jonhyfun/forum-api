const express = require('express');
const expressIp = require('express-ip');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');

const Example = require('./src/routes/Example');
const ForumPost = require('./src/routes/ForumPost');

const app = express();

const logRequestStart = (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl}`);
  next();
}

app.use(logRequestStart);
app.use(expressIp().getIpInfoMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true }));

app.use((error, req, res, next) => {
  if (res.headersSent) { return next(error) }
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  })
});

app.use('/example', Example);
app.use('/ForumPost', ForumPost);


app.use((req, res, next) => {
  return res.status(404).json({
    status: true,
    error: true,
    reason: 'route/not-found',
    message: `Mensagem voltada em ${moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')}`
  })
});


module.exports.app = app;