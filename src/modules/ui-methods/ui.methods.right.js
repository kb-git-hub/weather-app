export default function populatePageRight() {
    popFeelsLike.call(this)
    popHumidity.call(this)
    popWindSpeed.call(this)
}

function popFeelsLike() {
    const feelsLike = this.activeWeatherLocation.weatherStats.currentWeather.main.feels_like

    if (this.activeDisplayUnit === 'imperial') {
        this.siteComponents.rightStats.feelsLike.textContent = `${feelsLike} °F`
    } else this.siteComponents.rightStats.feelsLike.textContent = `${feelsLike} °C`
}

function popHumidity() {
    const { humidity } = this.activeWeatherLocation.weatherStats.currentWeather.main

    this.siteComponents.rightStats.humidity.textContent = `${humidity} %`
}

function popWindSpeed() {
    const { speed } = this.activeWeatherLocation.weatherStats.currentWeather.wind

    if (this.activeDisplayUnit === 'imperial')
        this.siteComponents.rightStats.windSpeed.textContent = `${speed} mph`
    else this.siteComponents.rightStats.windSpeed.textContent = `${speed} kmh`
}
