
const db = require('./config/database')
const dotenv = require('dotenv')
const express = require('express')

db.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error))

// db.sync({ force: true })

const app = express()

app.use(express.json())

app.get(`${process.env.BASEPATH}`, (req, res) => res.send('INDEX - SHOP WEBSERVICES'));

app.use(`${process.env.BASEPATH}/users`, require('./routes/users'))

app.get(`*`, (req, res) => res.send('ERROR! BAD URL - SHOP WEBSERVICES'));



module.exports = app