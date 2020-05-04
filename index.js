const express = require('express')
const expressIp = require('express-ip')
const cors = require('cors')
const bodyParser = require('body-parser')

const Example = require('./src/routes/Example')

const app = express()

const logRequestStart = (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl}`)
  next()
}

app.use(logRequestStart)
app.use(expressIp().getIpInfoMiddleware)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: true }))

app.use((error, req, res, next) => {
  if(res.headersSent) { return next(error) }
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  })
})

app.use('/example', Example)

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

module.exports.app = app