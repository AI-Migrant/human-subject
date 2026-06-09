const D = 86400000
const life = 22.7
const now = new Date()
const mfd = new Date(2022, 4, 1)
const robbedLife = (now - mfd) / D / 365.25
const robbedLifeDisplay = document.querySelector("#robbed-life");

function showRobbedLife() {
  robbedLifeDisplay.textContent = (robbedLife / life).toFixed(2)
}