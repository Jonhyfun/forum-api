const router = require('express').Router()
const controller = require('./controller')

router.post('/', controller.example)

module.exports = router

