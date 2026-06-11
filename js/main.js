'use strict'


const METOFFICE_MY_API = "eyJ4NXQjUzI1NiI6Ik5XVTVZakUxTkRjeVl6a3hZbUl4TkdSaFpqSmpOV1l6T1dGaE9XWXpNMk0yTWpRek5USm1OVEE0TXpOaU9EaG1NVFJqWVdNellXUm1ZalUyTTJJeVpBPT0iLCJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ==.eyJzdWIiOiJhcnRpZmljaWFsaWxsZWdhbG1pZ3JhbnRAZ21haWwuY29tQGNhcmJvbi5zdXBlciIsImFwcGxpY2F0aW9uIjp7Im93bmVyIjoiYXJ0aWZpY2lhbGlsbGVnYWxtaWdyYW50QGdtYWlsLmNvbSIsInRpZXJRdW90YVR5cGUiOm51bGwsInRpZXIiOiJVbmxpbWl0ZWQiLCJuYW1lIjoic2l0ZV9zcGVjaWZpYy04NWUxM2E2ZC04YTYyLTQ4N2UtYjIyMi02OWY5MGRlYjQ4ZjMiLCJpZCI6NTE0MzMsInV1aWQiOiJlZDZiZjQwOS04MDlkLTRjOTQtOWE5Ny04MzNhY2Y3NWJiODcifSwiaXNzIjoiaHR0cHM6XC9cL2FwaS1tYW5hZ2VyLmFwaS1tYW5hZ2VtZW50Lm1ldG9mZmljZS5jbG91ZDo0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIjp7InRpZXJRdW90YVR5cGUiOiJyZXF1ZXN0Q291bnQiLCJncmFwaFFMTWF4Q29tcGxleGl0eSI6MCwiZ3JhcGhRTE1heERlcHRoIjowLCJzdG9wT25RdW90YVJlYWNoIjp0cnVlLCJzcGlrZUFycmVzdExpbWl0IjowLCJzcGlrZUFycmVzdFVuaXQiOiJzZWMifX0sImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU2l0ZVNwZWNpZmljRm9yZWNhc3QiLCJjb250ZXh0IjoiXC9zaXRlc3BlY2lmaWNcL3YwIiwicHVibGlzaGVyIjoiSmFndWFyX0NJIiwidmVyc2lvbiI6InYwIiwic3Vic2NyaXB0aW9uVGllciI6IndkaF9zaXRlX3NwZWNpZmljX2ZyZWUifV0sInRva2VuX3R5cGUiOiJhcGlLZXkiLCJpYXQiOjE3ODExMTE1NzEsImp0aSI6IjI3MzIwMGU2LTcwOGQtNDMwYS05NDcwLTczZGIyNDdmYThhNCJ9.ZAbtcGi0zXDKFzpQeceadIAKDQYsshLDFmVH7Dd5GmF_aNAEGCKArpBlaw0IisRURo6bmw2d22luAfK3Ohh2yce2rLNYNApyyWzAKydJw_RRAIdHDIgUp8jdVy9kBnLXAa34rA4AVGjkYYb7JCWl_heDHd0Jy7lZHxlZYe5Knzw8ruL-9onG9eQJC6H2sD_5_VOW-vp-uPMQtIiPwpJRnSROt89u_WKlPr-dUMnX6B0ouu0qCNxupBBLNfOg1Dc0kN4hFYF88_NUvhgbIlIdSbuk17En2pdp93CIUJIV6AWeb4suXmtZZ9EnUB-Wrwv-z8kqiIUW_5Echn9o7JW-6A=="
const METOFFICE_SITSPECIFIC_API = "https://data.hub.api.metoffice.gov.uk/sitespecific/v0"
const mfd = new Date(2022, 4, 1)


function showRobbedLife() {
  const now = new Date()
  document.querySelector("#robbed-life").textContent = ((new Date() - mfd) / 7150952160).toFixed(7) + "%"
}


function getWeatherFromOpenMeteo() {
  const latitude = document.querySelector('#latitude').value
  const longitude = document.querySelector('#longitude').value
  const api = `https://api.open-meteo.com/v1/meteofrance?latitude=${latitude}&longitude=${longitude}&timezone=EET&daily=apparent_temperature_min,apparent_temperature_max` 
  
  fetch(api)
    .then(response => response.json())
    .then(data => {
      const output = document.querySelector('#open-meteo')
      let s = ''
      const daily = data.daily
      const time = daily.time
      const min = daily.apparent_temperature_min
      const max = daily.apparent_temperature_max
        
      for (let i = 0; i < 4; i++)
      {
        s += `<tr><td>${time[i]}</td><td>${min[i]}</td><td>${max[i]}</td><tr>`
      }
        
      output.innerHTML = s
    })
    .catch(error => {
      output.innerHTML = error
  })
}


window.onload = () => {
  setInterval(showRobbedLife, 1000)
  getWeatherFromOpenMeteo()
  showRobbedLife()
}
