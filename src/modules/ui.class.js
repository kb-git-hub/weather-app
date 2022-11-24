import populatePage from './ui-methods/ui.methods'
import { generateQueryConstructor } from './utils'

export default class UI {
    constructor() {
        generateQueryConstructor.call(this, ...arguments)
    }

    renderWeather() {
        populatePage.call(this)
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
    }

    buildInteraction() {
        this.#createSelectors()
        this.#createEvents()
    }

    // Stores Active Weather Object in UI Class
    getWeatherAPI(API) {
        this.activeWeatherLocation = API
    }

    #getWeatherForLocation(city = '', state = '', country = '', units = this.activeDisplayUnit) {
        this.activeWeatherLocation.buildWeatherProfile(city, state, country, units)
        console.log(this.activeWeatherLocation)
    }

    // Convert config into query Selectors
    #createSelectors() {
        this.#convertConfigToDOMSelectors(this.siteComponents.leftStats)
        this.#convertConfigToDOMSelectors(this.siteComponents.centerStats)
        this.#convertConfigToDOMSelectors(this.siteComponents.rightStats)
        this.#convertConfigToDOMSelectors(this.userInput)
    }

    // create user interaction
    #createEvents() {
        const { displayUnit, weatherSearchForm, weatherSearchInput } = this.userInput

        displayUnit.addEventListener('click', () => this.updateUnits())

        weatherSearchForm.addEventListener('submit', (e) => {
            e.preventDefault()
            const locationSearch = weatherSearchInput.value
            weatherSearchInput.value = ''
            this.#getWeatherForLocation(locationSearch, '', '', this.displayUnit)

            // will need to break up or do regex of user input
        })
    }

    /// //

    #convertConfigToDOMSelectors(object) {
        for (const element in object) {
            object[element] = document.querySelector(object[element])
        }
    }

    #getIcon(weather) {
        const iconName = weather.weatherStats.currentWeather.weather[0].icon
        const url = `http://openweathermap.org/img/wn/${iconName}@2x.png`

        this.siteComponents.centerStats.weatherIcon.src = url
    }
}

// ui.siteComponents.leftStats.city.textContent = 'hello from vegas'
