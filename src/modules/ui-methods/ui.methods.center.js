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
    const { sunrise } = this.activeWeatherLocation.weatherStats.currentWeather.sys
    const { sunset } = this.activeWeatherLocation.weatherStats.currentWeather.sys

    this.siteComponents.centerStats.sunrise.textContent = `Sunrise: ${sunrise}`
    this.siteComponents.centerStats.sunset.textContent = `Sunset: ${sunset}`
}

// function popDate() {
//     const date = new Date().toDateString()
//     this.siteComponents.leftStats.date.textContent = date
// }

// function popTime() {
//     const timeZone = returnCurrentWeather.call(this, 'timezone')
//     const localTime = getLocalTime(timeZone)
//     const convertedTime = convertTimeFormat(localTime)

//     this.siteComponents.leftStats.time.textContent = convertedTime
// }

/// /////////

// return Data from Current Weather Object

// Local Time Conversion
// function getLocalTime(localTimeZone) {
//     const localTime = new Date().getTime()
//     const localOffset = new Date().getTimezoneOffset() * 60000
//     const currentTimeUTC = localTime + localOffset
//     const targetCityOffset = currentTimeUTC + 1000 * localTimeZone
//     const cityTime = new Date(targetCityOffset).toTimeString().split(' ')
//     const time = cityTime[0]
//     return time
// }

// // Time format Conversion
// function convertTimeFormat(time) {
//     const array = time.split(':').map((digit) => Number.parseInt(digit, 10))
//     return array[0] > 12 ? `${array[0] - 12}:${array[1]} PM` : `${array[0]}:${array[1]} AM`
// }