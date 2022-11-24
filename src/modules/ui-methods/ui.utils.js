function returnCurrentWeather(input) {
    const result = this.activeWeatherLocation.weatherStats.currentWeather[input]
    return result
}

function returnHourlyWeather(input) {
    const result = this.activeWeatherLocation.weatherStats.hourlyWeather[input]
    return result
}

export { returnCurrentWeather, returnHourlyWeather }
