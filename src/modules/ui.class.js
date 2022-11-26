import populatePageLeft from './ui-methods/ui.methods.left'
import populatePageCenter from './ui-methods/ui.methods.center'
import populatePageRight from './ui-methods/ui.methods.right'
import populatePageHourly from './ui-methods/ui.methods.hourly'
import { generateQueryConstructor } from './utils'

export default class UI {
    constructor() {
        generateQueryConstructor.call(this, ...arguments)
    }

    #parseSearch() {
        const { weatherSearchInput } = this.userInput
        const locationSearch = weatherSearchInput.value.split(',')
        return { city: locationSearch[0], state: locationSearch[1], country: locationSearch[2] }
    }

    async renderWeather(e) {
        if (e) e.preventDefault()

        const userInput = this.#parseSearch()
        if (!userInput) return
        await this.#getWeatherForLocation(
            userInput.city,
            userInput.state,
            userInput.country,
            this.activeDisplayUnit
        )
        this.userInput.weatherSearchInput.value = ''
        this.updateDisplay()
    }

    async initRender() {
        await this.#getWeatherForLocation('Dallas', '', '', this.displayUnit)
        this.updateDisplay()
    }

    updateDisplay() {
        populatePageLeft.call(this)
        populatePageCenter.call(this)
        populatePageRight.call(this)
        populatePageHourly.call(this)
    }

    async updateUnits() {
        const { displayUnit } = this.userInput
        const spans = displayUnit.querySelectorAll('span')
        spans.forEach((span) => {
            if (!span.classList.contains('active')) {
                span.classList.add('active')
                if (span.textContent === '°F') this.activeDisplayUnit = 'imperial'
                if (span.textContent === '°C') this.activeDisplayUnit = 'metric'
            } else span.classList.remove('active')
        })
        await this.#getWeatherForLocation(
            this.activeWeatherLocation.weatherStats.hourlyWeather.city.name,
            '',
            '',
            this.activeDisplayUnit
        )
        this.updateDisplay()
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
