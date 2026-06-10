const now = new Date()
const mfd = new Date(2022, 4, 1)
const robbedLife = (now - mfd) / 715095216000
const robbedLifeDisplay = document.querySelector("#robbed-life")

function showRobbedLife() {
  robbedLifeDisplay.textContent = (robbedLife).toFixed(2)
}