const request = require('request')

const geocode = (address, callback) => {
  const openCageURL = 'https://api.opencagedata.com/geocode/v1/json?key=96cae9f395b94b76ad6a77e3ad833fdf&q=' + encodeURIComponent(address) + '&limit=1'
  request({url: openCageURL, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to geo location service!')
    } else if (body.results.length === 0) {
      callback('Unable to find location. Try another search.')
    } else {
      const result = body.results[0]
      callback(undefined, {...result.geometry, location: result.formatted})
    }
  })
}

module.exports = geocode