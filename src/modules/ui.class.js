import populatePageCenter from './ui-methods/ui.methods.center'
import populatePageLeft from './ui-methods/ui.methods.left'
import { generateQueryConstructor } from './utils'

export default class UI {
    constructor() {
        generateQueryConstructor.call(this, ...arguments)
    }

    async renderWeather(e) {
        e.preventDefault()

        const { weatherSearchInput } = this.userInput
        const locationSearch = weatherSearchInput.value

        if (!locationSearch) return

        await this.#getWeatherForLocation(locationSearch, '', '', this.displayUnit)
        weatherSearchInput.value = ''
        populatePageLeft.call(this)
        populatePageCenter.call(this)
    }

    updateUnits() {
        const { displayUnit } = this.userInput
        const spans = displayUnit.querySelectorAll('span')
        spans.forEach((span) => {
            if (!span.classList.contains('active')) {
                span.classList.add('active')
                if (span.textContent === '°F') this.activeDisplayUnit = 'imperial'
                if (span.textContent === '°C') this.activeDisplayUnit = 'metric'
            } else span.classList.remove('active')
        })
        console.log(this.activeWeatherLocation)
        if (Object.keys(this.activeWeatherLocation.weatherStats.currentWeather).length === 0) return
        this.#getWeatherForLocation(
            this.activeWeatherLocation.weatherStats.hourlyWeather.city.name,
            '',
            this.activeWeatherLocation.weatherStats.hourlyWeather.city.name,
            this.activeDisplayUnit
        )
    }

    buildInteraction() {
        this.#createSelectors()
        this.#createEvents()
    }

    // Stores Active Weather Object in UI Class
    getWeatherAPI(API) {
        this.activeWeatherLocation = API
    }

    async #getWeatherForLocation(city = '', state = '', country = '', units = this.activeDisplayUnit) {
        await this.activeWeatherLocation.buildWeatherProfile(city, state, country, units)
        console.log(this.activeWeatherLocation.weatherStats)
    }

    // Convert config into query Selectors
    #createSelectors() {
        this.#convertConfigToDOMSelectors(this.siteComponents.leftStats)
        this.#convertConfigToDOMSelectors(this.siteComponents.centerStats)
        this.#convertConfigToDOMSelectors(this.siteComponents.rightStats)
        this.#convertConfigToDOMSelectors(this.userInput)
    }

    #convertConfigToDOMSelectors(object) {
        for (const element in object) {
            object[element] = document.querySelector(object[element])
        }
    }

    // create user interaction
    #createEvents() {
        const { displayUnit, weatherSearchForm } = this.userInput

        displayUnit.addEventListener('click', () => this.updateUnits())

        weatherSearchForm.addEventListener('submit', (e) => {
            this.renderWeather(e)
        })
    }
}
