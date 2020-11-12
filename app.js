const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')

const router = require('./routes/index')

// load environment variables from a .env file into process.env
dotenv.config({path: './config/config.env'})

const app = express()

// HTTP request logger (development mode only)
process.env.NODE_ENV === 'development' && app.use(morgan('dev'))

// register handlebars view engine (.hbs extension)
app.engine('.hbs', exphbs({
    defaultLayout: null,    // remove default layout
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

// body parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// load router
app.use('/', router)

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} ...`))
