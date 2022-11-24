export default function populatePage() {
    popCityName.call(this)
}

function popCityName() {
    const city = returnCurrentWeather.call(this, 'base')
    // this.siteComponents.leftStats.city.textContent = city
}

function returnCurrentWeather(input) {
    // const result = this.activeWeatherLocation.weatherStats.currentWeather.input
    console.log('result', this.activeWeatherLocation.weatherStats.currentWeather.base)
    // console.log('base:', result)
    // return result
}
/// /////////

function getIcon(weather) {
    const iconName = weather.weatherStats.currentWeather.weather[0].icon
    const url = `http://openweathermap.org/img/wn/${iconName}@2x.png`

    this.siteComponents.centerStats.weatherIcon.src = url
}

/// /
