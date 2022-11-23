import '/src/style.css'
import WeatherGetter from './modules/weathergetter.class'
import WeatherConfig from './modules/config/weathergetter.config'
import uiConfig from './modules/config/ui.config'
import UI from './modules/ui.class'

const ui = new UI(uiConfig)
const API = new WeatherGetter(WeatherConfig)
ui.buildInteraction()
API.buildWeatherProfile('bentonville', 'AR', 'US', 'imperial')

// console.log(API.weatherStats.hourlyWeather)

setTimeout(() => {
    ui.getIcon(API)
}, 1000)
// console.log(ui)
