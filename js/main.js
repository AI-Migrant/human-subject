'use strict'


const METOFFICE_API = process.env.METOFFICE_API
const now = new Date()
const mfd = new Date(2022, 4, 1)
const robbedLife = (now - mfd) / 715095216000
const robbedLifeDisplay = document.querySelector("#robbed-life")


function showRobbedLife() {
  robbedLifeDisplay.textContent = (robbedLife * 100).toFixed(1) + "%"
}




function getWeatherFromOpenMeteo() {
  const latitude = document.querySelector('#latitude').value
  const longitude = document.querySelector('#longitude').value
  const api = `https://api.open-meteo.com/v1/meteofrance?latitude=${latitude}&longitude=${longitude}&timezone=EET&daily=apparent_temperature_min,apparent_temperature_max` 
  
  fetch(api)
    .then(response => response.json())
    .then(data => {
      const output = document.querySelector('#weatherDisplay')
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
  getWeather()
  showRobbedLife()
}