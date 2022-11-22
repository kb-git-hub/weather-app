import '/src/style.css'
import WeatherGetter from './modules/weathergetter.class'
import WeatherConfig from './modules/config/weathergetter.config'

const API = new WeatherGetter(WeatherConfig)
API.buildWeatherProfile('bentonville', 'AR', 'US', 'imperial')
console.log('api', API)
