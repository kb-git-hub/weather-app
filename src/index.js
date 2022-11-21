import FetchWrapper from './modules/fetchWrapper.class'
import '/src/style.css'

const API = new FetchWrapper('https://api.openweathermap.org/data/2.5/weather?q=')
API.get('bentonville').then((response) => console.log(response))
