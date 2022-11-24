import '/src/style.css'

import WeatherGetter from './modules/weathergetter.class'
import UI from './modules/ui.class'
import WeatherConfig from './modules/config/weathergetter.config'
import uiConfig from './modules/config/ui.config'

const API = new WeatherGetter(WeatherConfig)
// API.buildWeatherProfile('bentonville', 'AR', 'US', 'imperial')

const ui = new UI(uiConfig)
ui.buildInteraction()
ui.getWeatherAPI(API)
