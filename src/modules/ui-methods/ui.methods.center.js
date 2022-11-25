import { convertTimeFormat } from './ui.methods.left'

export default function populatePageCenter() {
    popTemperature.call(this)
    popDescription.call(this)
    getIcon.call(this)
    popLatLng.call(this)
    popSunriseSunset.call(this)
}

function popTemperature() {
    const temperature = this.activeWeatherLocation.weatherStats.currentWeather.main.temp

    if (this.activeDisplayUnit === 'imperial') {
        this.siteComponents.centerStats.temperature.textContent = `${temperature} °F`
    } else this.siteComponents.centerStats.temperature.textContent = `${temperature} °C`
}

function popDescription() {
    const description = this.activeWeatherLocation.weatherStats.currentWeather.weather[0].main
    this.siteComponents.centerStats.description.textContent = description
}

function getIcon() {
    const iconName = this.activeWeatherLocation.weatherStats.currentWeather.weather[0].icon
    const url = `http://openweathermap.org/img/wn/${iconName}@2x.png`
    this.siteComponents.centerStats.weatherIcon.src = url
}

function popLatLng() {
    const { lat } = this.activeWeatherLocation.weatherStats.currentWeather.coord
    const { lon } = this.activeWeatherLocation.weatherStats.currentWeather.coord

    this.siteComponents.centerStats.latitude.textContent = `Latitude: ${lat}`
    this.siteComponents.centerStats.longitude.textContent = `Longitude: ${lon}`
}

function popSunriseSunset() {
    const { timezone } = this.activeWeatherLocation.weatherStats.currentWeather
    const { sunrise } = this.activeWeatherLocation.weatherStats.currentWeather.sys
    const { sunset } = this.activeWeatherLocation.weatherStats.currentWeather.sys

    this.siteComponents.centerStats.sunrise.textContent = `Sunrise: ${convertTimeFormat(
        getRiseSetTimes(sunrise, timezone)
    )}`
    this.siteComponents.centerStats.sunset.textContent = `Sunset: ${convertTimeFormat(
        getRiseSetTimes(sunset, timezone)
    )}`
}

function getRiseSetTimes(sunriseSunset, localTimeZone) {
    const RiseSetTime = new Date(sunriseSunset * 1000).getTime()
    const RiseSetOffset = new Date().getTimezoneOffset() * 60000
    const currentTimeUTC = RiseSetTime + RiseSetOffset
    const targetoffset = currentTimeUTC + 1000 * localTimeZone
    const timeReturn = new Date(targetoffset).toTimeString().split(' ')
    const time = timeReturn[0]
    return time
}
