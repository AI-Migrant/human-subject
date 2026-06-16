'use strict'


const METOFFICE_MY_API = "eyJ4NXQjUzI1NiI6Ik5XVTVZakUxTkRjeVl6a3hZbUl4TkdSaFpqSmpOV1l6T1dGaE9XWXpNMk0yTWpRek5USm1OVEE0TXpOaU9EaG1NVFJqWVdNellXUm1ZalUyTTJJeVpBPT0iLCJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ==.eyJzdWIiOiJhcnRpZmljaWFsaWxsZWdhbG1pZ3JhbnRAZ21haWwuY29tQGNhcmJvbi5zdXBlciIsImFwcGxpY2F0aW9uIjp7Im93bmVyIjoiYXJ0aWZpY2lhbGlsbGVnYWxtaWdyYW50QGdtYWlsLmNvbSIsInRpZXJRdW90YVR5cGUiOm51bGwsInRpZXIiOiJVbmxpbWl0ZWQiLCJuYW1lIjoic2l0ZV9zcGVjaWZpYy04NWUxM2E2ZC04YTYyLTQ4N2UtYjIyMi02OWY5MGRlYjQ4ZjMiLCJpZCI6NTE0MzMsInV1aWQiOiJlZDZiZjQwOS04MDlkLTRjOTQtOWE5Ny04MzNhY2Y3NWJiODcifSwiaXNzIjoiaHR0cHM6XC9cL2FwaS1tYW5hZ2VyLmFwaS1tYW5hZ2VtZW50Lm1ldG9mZmljZS5jbG91ZDo0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIjp7InRpZXJRdW90YVR5cGUiOiJyZXF1ZXN0Q291bnQiLCJncmFwaFFMTWF4Q29tcGxleGl0eSI6MCwiZ3JhcGhRTE1heERlcHRoIjowLCJzdG9wT25RdW90YVJlYWNoIjp0cnVlLCJzcGlrZUFycmVzdExpbWl0IjowLCJzcGlrZUFycmVzdFVuaXQiOiJzZWMifX0sImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU2l0ZVNwZWNpZmljRm9yZWNhc3QiLCJjb250ZXh0IjoiXC9zaXRlc3BlY2lmaWNcL3YwIiwicHVibGlzaGVyIjoiSmFndWFyX0NJIiwidmVyc2lvbiI6InYwIiwic3Vic2NyaXB0aW9uVGllciI6IndkaF9zaXRlX3NwZWNpZmljX2ZyZWUifV0sInRva2VuX3R5cGUiOiJhcGlLZXkiLCJpYXQiOjE3ODExMTE1NzEsImp0aSI6IjI3MzIwMGU2LTcwOGQtNDMwYS05NDcwLTczZGIyNDdmYThhNCJ9.ZAbtcGi0zXDKFzpQeceadIAKDQYsshLDFmVH7Dd5GmF_aNAEGCKArpBlaw0IisRURo6bmw2d22luAfK3Ohh2yce2rLNYNApyyWzAKydJw_RRAIdHDIgUp8jdVy9kBnLXAa34rA4AVGjkYYb7JCWl_heDHd0Jy7lZHxlZYe5Knzw8ruL-9onG9eQJC6H2sD_5_VOW-vp-uPMQtIiPwpJRnSROt89u_WKlPr-dUMnX6B0ouu0qCNxupBBLNfOg1Dc0kN4hFYF88_NUvhgbIlIdSbuk17En2pdp93CIUJIV6AWeb4suXmtZZ9EnUB-Wrwv-z8kqiIUW_5Echn9o7JW-6A=="
const METOFFICE_SITESPECIFIC_API = "https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/"
const METOFFICE_FORECASTS_API = "https://api-metoffice.apiconnect.ibmcloud.com/v0/forecasts/point/"
const METEOFRANCE_API = "https://api.open-meteo.com/v1/meteofrance"
let lifeRobbed = (new Date() - new Date(2022, 4, 1))
let latitude, longitude


const showRobbedLife = () => {
  lifeRobbed += 1000
  document.querySelector("#robbed-life").textContent = (lifeRobbed / 7150952160).toFixed(7) + "%"
}


const makeTr = (type, data) => {
  const tr = document.createElement("tr")

  for (const d of data) {
    const c = document.createElement(type)
    c.textContent = d
    tr.appendChild(c)
  }

  return tr
}


const getWeatherFromMeteoFrance = () => {
  const url = `${METEOFRANCE_API}?latitude=${latitude}&longitude=${longitude}&timezone=EET&daily=apparent_temperature_min,apparent_temperature_max` 
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const thead = document.querySelector('#meteofrance-thead')
      const tbody = document.querySelector("#meteofrance-tbody")
      const daily = data.daily
      const time = daily.time
      const min = daily.apparent_temperature_min
      const max = daily.apparent_temperature_max
      thead.replaceChildren()
      
      let arr = time.slice(0, 4).map(e => {
        const a = e.split("-")
        return `${a[2]}/${a[1]}`
      })
      
      thead.appendChild(makeTr("th", arr))
      tbody.replaceChildren()
      tbody.appendChild(makeTr("td", max.slice(0, 4)))
      tbody.appendChild(makeTr("td", min.slice(0, 4)))
    })
    .catch(error => {
      console.log("Error from getWeatherFromMeteoFrance()")
      console.log(error)
    })
}


const getWeatherFromMetOffice = () => {
  const url = `${METOFFICE_SITESPECIFIC_API}hourly?latitude=${latitude}&longitude=${longitude}`

  fetch(url, {
    method: "GET",
    headers: {
      "accept": "application/json",
      "apikey": METOFFICE_MY_API
    }
  })
    .then(response => response.json())
    .then(data => {
      const timeSeries = data.features[0].properties.timeSeries


      const makeTable = (series) => {
        const table = document.createElement("table")
        const thead = document.createElement("thead")
        thead.appendChild(makeTr("th", ["Time", "Temp", "P. Prob", "P. Rate"]))
        table.appendChild(thead)
        const tbody = document.createElement("tbody")
        table.appendChild(tbody)
        
        for (const s of series) {
          tbody.appendChild(makeTr("td", [s.time.substring(8, 13), s.feelsLikeTemperature, s.probOfPrecipitation, s.precipitationRate]))
        }

        return table
      }

      const container = document.querySelector("#metoffice-container")
      container.appendChild(makeTable(timeSeries.slice(0, timeSeries.length / 2)))
      container.appendChild(makeTable(timeSeries.slice(timeSeries.length / 2)))
    })
    .catch(error => {
      console.log("Error from getWeatherFromMetOffice()")
      console.log(error)
  })
}


const getWeather = () => {
  latitude = document.querySelector('#latitude').value
  longitude = document.querySelector('#longitude').value
  getWeatherFromMetOffice()
  getWeatherFromMeteoFrance()
}


window.onload = () => {
  setInterval(showRobbedLife, 1000)
  getWeather()
}