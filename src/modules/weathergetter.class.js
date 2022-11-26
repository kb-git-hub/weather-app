import { generateQueryConstructor } from './utils'

export default class WeatherGetter {
    constructor() {
        generateQueryConstructor.call(this, ...arguments)
    }

    updateCoordinates(lat, lon) {
        this.coordinates.lat = lat
        this.coordinates.lon = lon
    }

    async buildWeatherProfile(city = '', state = '', country = '', units = 'imperial') {
        await this.#getCoordinates(city, state, country)

        const currentWeatherData = await this.#getWeatherData(this.URL.weatherURL, units)
        this.#populateCurrentWeather(currentWeatherData, 'currentWeather')

        const hourlyWeatherData = await this.#getWeatherData(this.URL.hourlyURL, units, 4)
        this.#populateCurrentWeather(hourlyWeatherData, 'hourlyWeather')
    }

    async #getCoordinates(city, state, country) {
        try {
            const completeURL = `${this.URL.baseURL}${city},${state},${country}&appid=${this.key}`
            const response = await fetch(completeURL)
            const coordinates = await response.json()
            this.updateCoordinates(coordinates[0].lat, coordinates[0].lon)
            const errorBox = document.querySelector('#errorBox')
            if (errorBox.classList.contains('active')) errorBox.classList.remove('active')
        } catch (err) {
            const errorBox = document.querySelector('#errorBox')
            errorBox.classList.add('active')
        }
    }

    async #getWeatherData(URLType, units, count = '') {
        try {
            const completeURL = `${URLType}lat=${this.coordinates.lat}&lon=${this.coordinates.lon}&appid=${this.key}&units=${units}&cnt=${count}`
            const response = await fetch(completeURL)
            const weatherData = await response.json()
            return weatherData
        } catch (err) {
            console.error(err)
        }
    }

    async #populateCurrentWeather(weatherData, weatherObject) {
        generateQueryConstructor.call(this.weatherStats[weatherObject], weatherData)
    }
}
