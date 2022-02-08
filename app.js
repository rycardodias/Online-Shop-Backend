
const db = require('./config/database')
const dotenv = require('dotenv')
const express = require('express')
var cookieSession = require('cookie-session')
const ApiErrorHandler = require('./errors/ApiErrorHandler')
const i18next = require('i18next')
var middleware = require('i18next-http-middleware')
const Backend = require('i18next-fs-backend')

const compression = require('compression')

// db.authenticate()
//     .then(() => console.log('Connection has been established successfully.'))
//     .catch((error) => console.error('Unable to connect to the database:', error))

// db.sync({ force: true })

i18next.use(Backend).use(middleware.LanguageDetector).init({
    fallbackLng: 'en',
    backend: {
        loadPath: './locales/{{lng}}/translation.json'
    }
})


const app = express()
app.use(middleware.handle(i18next))
app.use(express.json())

app.use(cookieSession({
    signed: false
}))


app.get(`${process.env.BASEPATH}`, (req, res) => res.send('INDEX - SHOP WEBSERVICES'));

app.use(`${process.env.BASEPATH}/users`, require('./routes/users'))
app.use(`${process.env.BASEPATH}/products`, require('./routes/products'))
app.use(`${process.env.BASEPATH}/orders`, require('./routes/orders'))
app.use(`${process.env.BASEPATH}/orderLines`, require('./routes/orderLines'))
app.use(`${process.env.BASEPATH}/orderStatus`, require('./routes/orderStatus'))
app.use(`${process.env.BASEPATH}/stocks`, require('./routes/stocks'))

app.get(`*`, (req, res) => res.send('ERROR! BAD URL - SHOP WEBSERVICES'));

app.use(ApiErrorHandler)

app.use(compression())

module.exports = app