const router = require('express').Router()
const controller = require('./controller')

router.get('/get', controller.example)

module.exports = router

