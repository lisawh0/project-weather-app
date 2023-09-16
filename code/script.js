
//API: https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d75b73cbadec04610cd0103495fdb88c

const weatherDescription = document.getElementById('weatherDescription')
const container = document.getElementById('container')
const header = document.getElementById('header')
const forecastItems = document.getElementById('forecastItems')


const fetchWeather = () => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d75b73cbadec04610cd0103495fdb88c")
        .then((response) => {
            return response.json()
        })

        .then((json) => {

            const sunRise = new Date(json.sys.sunrise * 1000)

            let sunRiseHoursAndMinutes = String(sunRise.getHours()).padStart(2, '0') + ':' + String(sunRise.getMinutes()).padStart(2, '0')


            const sunSet = new Date(json.sys.sunset * 1000);
            let sunSetHoursAndMinutes = String(sunSet.getHours()).padStart(2, '0') + ':' + String(sunSet.getMinutes()).padStart(2, '0')

            const weathers = json.weather
            weathers.map((weather) => {

                header.innerHTML = `
        <h3>${weather.description} | ${(json.main.temp).toFixed(0)}°</h3>
        <h3>sunrise ${sunRiseHoursAndMinutes}</h3>
        <h3>sunset ${sunSetHoursAndMinutes}</h3>
        `

                switch (weather.main) {
                    case 'Clouds':
                        document.body.style.backgroundColor = '#F4F7F8'
                        container.style.color = '#F47775'
                        weatherDescription.innerHTML += `
              <img src ="cloud.svg" alt = "cloud"/>
                <h1>The sky is grey in ${json.name}. Maybe go for a lil walk with a podcast! </h1>
                `
                        break;

                    case 'Rain':
                        document.body.style.backgroundColor = '#A3DEF7'
                        container.style.color = '#164A68'
                        weatherDescription.innerHTML += `
                <img src = "umbrella.svg" alt = "umbrella"/> <h1>It's raining in ${json.name}. Have a cup of tea, put on Netflix and stay inside! </h1>
                `
                        break;

                    default:
                        console.log('sunny')
                        document.body.style.backgroundColor = '#F7E9B9'
                        container.style.color = '#2A5510'
                        weatherDescription.innerHTML += `
                <img src ="shades.svg" alt = "sunglasses"/><h1>The sky is crispy and clear in ${json.name}. Put on your best shades and don't forget spf!</h1>
                </div>
                `
                        break;
                }

            })
        })
}


fetchWeather()