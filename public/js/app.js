console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((request) => {
//   request.json().then((data) => {
//     console.log(data)
//   })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
let locationElement = document.querySelector('p.location')
let foreCastElement = document.querySelector('p.forecast')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  locationElement.textContent = 'Loading...'
  foreCastElement.textContent = ''
  fetch('/weather?address=' + location).then((request) => {
    request.json().then((data) => {
      if (data.error) {
        locationElement.textContent = data.error
      } else {
        locationElement.textContent = data.location
        foreCastElement.textContent = data.forecast
      }
    })
  })
})