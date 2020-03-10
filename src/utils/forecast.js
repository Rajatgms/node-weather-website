const request = require('request')

const forecast = (lat, lng, callback) => {
  const url = 'https://api.darksky.net/forecast/bcc569cfd7661e43059e22e625b693b2/' + lat + ',' + lng

  request({url: url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location!', undefined)
    } else {
      const {currently, daily} = body;
      const forecast = daily.summary + ' It is currently ' + currently.temperature + 'F degrees out. There is a ' + currently.precipProbability + '% change of rain'
      callback(undefined, forecast)
    }
  })
}

module.exports = forecast