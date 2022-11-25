import { format, parseISO } from 'date-fns'

export default function populatePageHourly() {
    getHourlyWeather.call(this)
}

function popHourlyDivGenerate(time, temp, icon, idNum) {
    const hourlyUnit = document.createElement('div')
    hourlyUnit.classList.add('hourly-module')
    hourlyUnit.setAttribute('id', `hourly-unit-${idNum}`)

    const hourlyTime = createHourlyTimeDiv(time)
    const hourlyTemp = createHourlyTempDiv(temp)
    const hourlyIcon = createHourlyIconDiv(icon)

    hourlyUnit.append(hourlyTime, hourlyTemp, hourlyIcon)
    return hourlyUnit
}

function getHourlyTime(forecast) {
    return forecast.dt_txt
}

function getHourlyTemp(forecast) {
    const { temp } = forecast.main
    if (this.activeDisplayUnit === 'imperial') return `${temp} °F`
    return `${temp} °C`
}

function getHourlyIcon(forecast) {
    const iconName = forecast.weather[0].icon
    return `http://openweathermap.org/img/wn/${iconName}@2x.png`
}

function getHourlyWeather() {
    const { hourlyContainer } = this.siteComponents.centerStats
    hourlyContainer.textContent = ''
    let hourlyContainerIDNum = 0

    const hourlyForecasts = [...this.activeWeatherLocation.weatherStats.hourlyWeather.list]
    hourlyForecasts.forEach((forecast) => {
        const time = getHourlyTime.call(this, forecast)
        const temp = getHourlyTemp.call(this, forecast)
        const icon = getHourlyIcon.call(this, forecast)
        const hourlyUnit = popHourlyDivGenerate(time, temp, icon, hourlyContainerIDNum)
        hourlyContainer.appendChild(hourlyUnit)
        hourlyContainerIDNum += 1
    })
}

function createHourlyTimeDiv(time) {
    const timeDiv = document.createElement('div')
    timeDiv.classList.add('hourly-time')
    const formattedTime = format(parseISO(time), 'eeee, hh:mm b')
    timeDiv.textContent = formattedTime

    return timeDiv
}

function createHourlyTempDiv(temp) {
    const tempDiv = document.createElement('div')
    tempDiv.classList.add('hourly-temp')
    tempDiv.textContent = temp
    return tempDiv
}

function createHourlyIconDiv(iconsrc) {
    const iconDiv = document.createElement('div')
    iconDiv.classList.add('hourly-icon')

    const icon = new Image()
    icon.src = iconsrc

    iconDiv.appendChild(icon)
    return iconDiv
}
