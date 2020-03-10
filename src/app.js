const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialViewsPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname, '../public')

// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialViewsPath)

// Setup static directory to serve - html, css, images etc
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {title: 'Weather Page', name: 'Rajat'})
})

app.get('/about', (req, res) => {
  res.render('about', {title: 'About Page', name: 'Rajat'})
})

app.get('/help', (req, res) => {
  res.render('help', {title: 'Help Page', name: 'Rajat'})
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found'
  })
})

app.get('/weather', (req, res) => {
  const {address} = req.query

  if (!address) {
    return res.send({
      error: 'You must provide a address term.'
    })
  }

  geocode(address, (error, {lat, lng, location} = {}) => {
    if (error) {
      return res.send({error})
    }

    forecast(lat, lng, (error, forecast) => {
      if (error) {
        return res.send({error})
      }

      res.send({address, forecast, location})
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.success) {
    return res.send({error: 'You must provide a search term.'})
  }

  console.log(req.query.success)
  res.send({
    products: []
  })
})

app.get('/*', (req, res) => {
  res.render('404',
    {
      title: '404',
      message: 'Page not found'
    })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})