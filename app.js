require('express-async-errors')
const express = require('express')
//config
const { config } = require('./config/config')
//db
const connectDB = require('./db/connect')
//middlewares
const authentificateUser = require('./middlewares/authentication')
//routes
const routeAuth = require('./routes/auth')
const routeJob = require('./routes/jobs')
// error handler
const notFoundMiddleware = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')
//extra security
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const app = express()

//middlewares
app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())


// routes
app.get('/', (req, res) => {
    res.send('jobs api')
})


app.use('/api/v1/auth',routeAuth)
app.use('/api/v1/jobs',authentificateUser,routeJob)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

const PORT = config.port || 5000

const start = async () => {
    try {
        await connectDB(config.mongoUri)
        app.listen(PORT, () =>
            console.log(`Server is listening on port ${PORT}...`)
        );
    } catch (error) {
        console.log(error);
    }
}

start()
