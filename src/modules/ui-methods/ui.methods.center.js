export default function populatePageCenter() {
    popCityName.call(this)
    popDate.call(this)
    popTime.call(this)
}

function popCityName() {
    const city = returnCurrentWeather.call(this, 'name')
    this.siteComponents.leftStats.city.textContent = city
}

function popDate() {
    const date = new Date().toDateString()
    this.siteComponents.leftStats.date.textContent = date
}

function popTime() {
    const timeZone = returnCurrentWeather.call(this, 'timezone')
    const localTime = getLocalTime(timeZone)
    const convertedTime = convertTimeFormat(localTime)

    this.siteComponents.leftStats.time.textContent = convertedTime
}

/// /////////

// return Data from Current Weather Obje ct

// Local Time Conversion
function getLocalTime(localTimeZone) {
    const localTime = new Date().getTime()
    const localOffset = new Date().getTimezoneOffset() * 60000
    const currentTimeUTC = localTime + localOffset
    const targetCityOffset = currentTimeUTC + 1000 * localTimeZone
    const cityTime = new Date(targetCityOffset).toTimeString().split(' ')
    const time = cityTime[0]
    return time
}

// Time format Conversion
function convertTimeFormat(time) {
    const array = time.split(':').map((digit) => Number.parseInt(digit, 10))
    return array[0] > 12 ? `${array[0] - 12}:${array[1]} PM` : `${array[0]}:${array[1]} AM`
}

function getIcon(weather) {
    const iconName = weather.weatherStats.currentWeather.weather[0].icon
    const url = `http://openweathermap.org/img/wn/${iconName}@2x.png`

    this.siteComponents.centerStats.weatherIcon.src = url
}
