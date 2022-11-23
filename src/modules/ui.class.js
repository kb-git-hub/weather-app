import { generateQueryConstructor } from './utils'

export default class UI {
    constructor() {
        generateQueryConstructor.call(this, ...arguments)
    }

    renderWeather() {
        this.#populatePage()
    }

    updateUnits() {}

    buildInteraction() {
        this.#createSelectors()
        this.#createEvents()
    }

    #createSelectors() {
        this.#convertConfigToDOMSelectors(this.siteComponents.leftStats)
        this.#convertConfigToDOMSelectors(this.siteComponents.centerStats)
        this.#convertConfigToDOMSelectors(this.siteComponents.rightStats)
        this.#convertConfigToDOMSelectors(this.userInput)
    }

    #createEvents() {}

    #populatePage() {}

    getIcon(weather) {
        const iconName = weather.weatherStats.currentWeather.weather[0].icon
        const url = `http://openweathermap.org/img/wn/${iconName}@2x.png`

        this.siteComponents.centerStats.weatherIcon.src = url

        // this.siteComponents.centerStats.weatherIcon.src = url
        console.log(this.siteComponents.centerStats.weatherIcon)
    }

    #convertConfigToDOMSelectors(object) {
        for (const element in object) {
            object[element] = document.querySelector(object[element])
        }
    }
}

// ui.siteComponents.leftStats.city.textContent = 'hello from vegas'
