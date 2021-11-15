require('express-async-errors')
const express = require('express')
//config
const { config } = require('./config/config')
//db
const connectDB = require('./db/connect')
//routes
const routeAuth = require('./routes/auth')
const routeJob = require('./routes/jobs')
// error handler
const notFoundMiddleware = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')


const app = express()


app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('jobs api')
})


app.use('/api/v1/auth',routeAuth)
app.use('/api/v1/jobs',routeJob)

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
