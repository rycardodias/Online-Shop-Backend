
const db = require('./config/database')
const dotenv = require('dotenv')
const express = require('express')
const cors = require("cors")
var cookieSession = require('cookie-session')
const ApiErrorHandler = require('./errors/ApiErrorHandler')
const i18next = require('i18next')
var middleware = require('i18next-http-middleware')
const Backend = require('i18next-fs-backend')
const compression = require('compression')
const helmet = require("helmet");
const fileUpload = require('express-fileupload')

db.authenticate()
    .then(() => console.info('Connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error))

// db.sync({ force: true })

i18next.use(Backend).use(middleware.LanguageDetector).init({
    fallbackLng: 'en',
    backend: {
        loadPath: './locales/{{lng}}/translation.json'
    }
})


const app = express()
app.use(helmet())
app.use(compression())

app.use(
    cors(
        {
            origin: '*',
            credentials: true
        }
    )
);

app.use(middleware.handle(i18next))
app.use(express.json())

app.use(cookieSession({
    signed: false
}))

app.use(fileUpload({
    limits: { fileSize: 1024 * 1024 * 5 },
    abortOnLimit: true,
  }))


app.get(`${process.env.BASEPATH}`, (req, res) => res.send('INDEX - SHOP WEBSERVICES'));

app.use(`${process.env.BASEPATH}/users`, require('./routes/users'))
app.use(`${process.env.BASEPATH}/products`, require('./routes/products'))
app.use(`${process.env.BASEPATH}/orders`, require('./routes/orders'))
app.use(`${process.env.BASEPATH}/orderLines`, require('./routes/orderLines'))
app.use(`${process.env.BASEPATH}/orderStatus`, require('./routes/orderStatus'))
app.use(`${process.env.BASEPATH}/stocks`, require('./routes/stocks'))
app.use(`${process.env.BASEPATH}/manufacturers`, require('./routes/manufacturers'))
app.use(`${process.env.BASEPATH}/uploadFiles`, require('./routes/uploadFiles'))


app.get(`*`, (req, res) => res.send('ERROR! BAD URL - SHOP WEBSERVICES'));

app.use(ApiErrorHandler)


module.exports = app