import getWeatherData from "./data.js"

const renderHeader = function(){

	const header = document.createElement("div")
	header.classList.add("header", "flexbox")
	const headerName = document.createElement("h1")
	headerName.classList.add("name")
	headerName.innerHTML = 'WEATHER APP'
	const searchBar = document.createElement("form")
	searchBar.noValidate = "true"
	searchBar.classList.add("inputForm")
	searchBar.innerHTML = `
        <input type="text" class="cityInput">
        <input type="submit">
	`

	searchBar.onsubmit = async function(ev){
		ev.preventDefault()

		const cityInput = document.getElementsByClassName("cityInput")[0].value
		const weatherData = await getWeatherData(cityInput)
		const field = document.getElementsByClassName('cityInput')[0]


		if (weatherData != "err") {
			field.setCustomValidity("")
			clearWeatherPage()
			renderWeatherPage(weatherData)
		} else{
			field.setCustomValidity(`Sorry, ${cityInput} is not a recognized city name`)
			field.reportValidity()
			clearWeatherPage()
			initWeatherPage()
		}

		
	}

	header.appendChild(headerName)
	header.appendChild(searchBar)

	const content = document.getElementById("content")
	content.appendChild(header)
}


const createTodayInfo = function(weatherData){
	const cityName = weatherData.getName()
	const temperature = weatherData.getTemp(0)
	const description = weatherData.getWeather(0).main
	const wind = weatherData.getWind(0)
	const pressure = weatherData.getPressure(0)
	const humidity = weatherData.getHumidity(0)
	const feelsLike = weatherData.getFeelsLike(0)
	const icon = weatherData.getWeather(0).icon

	const todayInfo = document.createElement("div")
	todayInfo.classList.add("todayInfo", "flexbox")
	todayInfo.innerHTML = `
	<h2 class="cityName"> ${cityName} </h2>
      <div class="weatherTemp flexbox">
        <div class="todayWeather flexbox">
          <p id="weatherDescription"> ${description} </p>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
        </div>
        <div class="todayTemperature flexbox"> 
          <p id="temperature"> ${temperature.day} </p>
          <p> Min Temp </p>
          <p id="minTemp"> ${temperature.min} </p>
          <p> Max Temp </p>
          <p id="maxTemp"> ${temperature.max} </p>
        </div>
      </div>
      <div class="otherInfo flexbox">
        <div class="flexbox">
          <p> Wind </p>
          <p id="wind"> ${wind} </p> 
        </div>
        <div class ="flexbox">
          <p> Humidity </p>
          <p id="humdity"> ${humidity}</p>
        </div>
        <div class="flexbox">
          <p> Feels Like </p>
          <p id="feelsLike">${feelsLike}</p>
        </div>
        <div class="flexbox">
          <p> Pressure </p>
          <p id="pressure">${pressure}</p>
        </div> 
	`
	return todayInfo
}

const createForecastCard = function(day, weatherData){
	const forecastCard = document.createElement("div")
	forecastCard.classList.add("flexbox")
	var date = new Date()
	date.setDate(date.getDate() + day)
	date = date.toString().substring(0, 15)

	const icon = weatherData.getWeather(day).icon
	const temperature = weatherData.getTemp(day).day
	const description = weatherData.getWeather(day).main

	forecastCard.innerHTML = `
        <p class="date"> ${date} </p>
        <img class="icon" src="https://openweathermap.org/img/wn/${icon}@2x.png">
        <p class="temperatureWeek"> ${temperature} </p>
        <p class="descriptionWeek"> ${description} </p>
    	`
    return forecastCard
}

const createWeekInfoBox = function(weatherData){
	const weekInfoBox = document.createElement("div")
	weekInfoBox.classList.add("weekInfo", "flexbox")
	for (var i = 1; i < 8; i++ ){
		var forecastCard = createForecastCard(i, weatherData)
		weekInfoBox.appendChild(forecastCard)
	}

	return weekInfoBox
}

const initWeatherPage = function(){
	const weatherPage = document.createElement("div")
	weatherPage.classList.add("weatherPage")

	const content = document.getElementById("content")
	content.appendChild(weatherPage)
}

const clearWeatherPage = function(){
	const weatherPage = document.getElementsByClassName("weatherPage")[0]
	weatherPage.remove()
}

const renderWeatherPage = function(weatherData){

	const weatherPage = document.createElement("div")
	weatherPage.classList.add("weatherPage", "flexbox")

	const todayInfo = createTodayInfo(weatherData)
	const weekInfo = createWeekInfoBox(weatherData)

	weatherPage.appendChild(todayInfo)
	weatherPage.appendChild(weekInfo)

	const content = document.getElementById("content")
	content.appendChild(weatherPage)

}


export {renderHeader, initWeatherPage}