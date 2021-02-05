//MAIN IMPORTS
const express = require('express'),
    listEndpoints = require('express-list-endpoints'),
    cors = require('cors'),
    mongoose = require('mongoose')

//ROUTES IMPORTS
const mainRouter = require('./services')

//ERRORS ROUTES IMPORTS
const {notFound, unAuthorized, forbidden, badRequest, generic} = require('./utils/errorsHandling/index')

//MAIN
const server = express(),
    PORT = process.env.PORT,
    accessURL = process.env.NODE_ENV !== 'production'
        ? [process.env.FE_URL_DEV, process.env.FE_URL_PROD]
        : [process.env.FE_URL_DEV],
    corsOptions = {
        origin: function (origin, callback) {
            accessURL.indexOf(origin) !== -1
                ? callback(null, true)
                : callback(new Error('NOT ALLOWED - CORS ISSUES'))
        }
    }

//MIDDLEWEARES
server.use(express.json())
server.use(cors())

//ROUTES
server.use('/api', mainRouter)

//ERRORS
server.use(notFound)
server.use(unAuthorized)
server.use(forbidden)
server.use(badRequest)
server.use(generic)

//CONSOLE LOGS
console.log(listEndpoints(server))

//LISTEN
mongoose.
    connect(process.env.MONGODB_ONLINE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(
        server.listen(PORT, () => {
        console.log(`Server running on PORT : ${PORT}`)
    })
    )
    .catch(err => console.log(err))
