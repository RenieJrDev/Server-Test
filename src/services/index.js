const express = require('express')

//ROUTES
const testRoute = require('./test/testRoute'),
    userRoute = require('./user')

const mainRouter = express.Router()

mainRouter.use('/test', testRoute)
mainRouter.use('/user', userRoute)

module.exports = mainRouter