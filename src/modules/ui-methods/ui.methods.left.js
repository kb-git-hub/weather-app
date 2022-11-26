import { format, parseISO } from 'date-fns'

export default function populatePageHourly() {
    popCityName.call(this)
    popDate.call(this)
    popTime.call(this)
}

function popCityName() {
    const city = this.activeWeatherLocation.weatherStats.currentWeather.name
    this.siteComponents.leftStats.city.textContent = city
}

function popDate() {
    const date = new Date().toDateString()
    this.siteComponents.leftStats.date.textContent = date
}

function popTime() {
    const timeZone = this.activeWeatherLocation.weatherStats.currentWeather.timezone
    const localTime = getLocalTime(timeZone)
    const convertedTime = convertTimeFormat(localTime)

    this.siteComponents.leftStats.time.textContent = convertedTime
}

// Local Time Conversion
export function getLocalTime(localTimeZone) {
    const localTime = new Date().getTime()
    const localOffset = new Date().getTimezoneOffset() * 60000
    const currentTimeUTC = localTime + localOffset
    const targetCityOffset = currentTimeUTC + 1000 * localTimeZone
    const cityTime = new Date(targetCityOffset).toTimeString().split(' ')
    const time = cityTime[0]
    return time
}

// Time format Conversion
export function convertTimeFormat(time) {
    let array = time.split(':')
    array = array.map((item) => Number.parseInt(item, 10))

    let [hour, minutes] = array

    minutes = minutes.toString().padStart(2, '0')
    console.log('📡 | file: ui.methods.left.js | line 46 | convertTimeFormat | minutes', minutes)

    if (hour > 12) return `${hour - 12}:${minutes} PM`
    if (hour === 0) return `${hour + 12}:${minutes} AM`
    return `${hour}:${minutes} AM`
}
