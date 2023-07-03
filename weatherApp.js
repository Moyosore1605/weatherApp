const apikey = 'a85febcc6f274a3bca9c93061fa6474e'
const weatherEL = document.getElementById('weather-data')
const cityInputEl = document.getElementById('city-input')
const formEl = document.querySelector('form')
const feels_like = document.getElementById('feels')
const humidi = document.getElementById('humid')
const winds = document.getElementById('wnds')

formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    const cityValue = cityInputEl.value
    getWeatherData(cityValue)
})

const getWeatherData = async (cityValue) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const weatherData = await response.json()
        console.log(weatherData);
        const weatherTemperature = Math.floor(weatherData.main.temp)
        const weatherDescription = weatherData.weather[0].description
        const weatherIcon = weatherData.weather[0].icon
        const weatherDetails = [
            `${Math.floor( weatherData.main.feels_like)}°`,
            `${weatherData.main.humidity}%`,
            `${weatherData.wind.speed}m/s`
        ]
        document.getElementById('displayCityName').innerText = weatherData.name
        weatherEL.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}.png">`
        weatherEL.querySelector('.temperature').innerText = `${weatherTemperature}°C`
        weatherEL.querySelector('.description').innerText = weatherDescription
        feels.innerText = weatherDetails[0]
        humid.innerText = weatherDetails[1]
        winds.innerText = weatherDetails[2]
    } catch (error) {
        weatherEL.querySelector('.icon').innerHTML = ''
        weatherEL.querySelector('.temperature').innerText = ''
        weatherEL.querySelector('.description').innerText = 'An error occured while fetching weather data'
        weatherEL.querySelector('.details').innerHTML = ''
    }
}