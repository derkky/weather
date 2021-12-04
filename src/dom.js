import getWeatherData from "./data.js"

const renderHeader = function(){

	const header = document.createElement("div")
	header.classList.add("header", "flexbox")
	const headerName = document.createElement("h1")
	headerName.classList.add("name")
	headerName.innerHTML = 'WeatherWhat'
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
			clearBackgroundVideo()
			renderWeatherPage(weatherData)
			renderBackgroundVideo(weatherData)
		} else{
			field.setCustomValidity(`Sorry, ${cityInput} is not a recognized city name`)
			field.reportValidity()
		}

		
	}

	header.appendChild(headerName)
	header.appendChild(searchBar)

	const content = document.getElementById("content")
	content.appendChild(header)
}


const createTodayInfo = function(weatherData){
	const cityName = weatherData.getName()
	const temperature = weatherData.getCurrentTemp()
	const dailyTemp = weatherData.getTemp(0)
	const description = weatherData.getCurrentWeather().main
	const wind = weatherData.getCurrentWindSpeed()
	const pressure = weatherData.getCurrentPressure()
	const humidity = weatherData.getCurrentHumidity()
	const feelsLike = weatherData.getCurrentFeelsLike()
	const icon = weatherData.getCurrentWeather().icon

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
          <p id="temperature"> ${temperature} </p>
        </div>
      </div>
      <div class="otherInfo flexbox">
      	<div class="flexbox">
          <p class="label"> Min Temp </p>
          <p id="minTemp"> ${dailyTemp.min} </p> 
        </div>
        <div class="flexbox">
          <p class="label"> Max Temp </p>
          <p id="maxTemp"> ${dailyTemp.max} </p> 
        </div>
        <div class="flexbox">
          <p class="label"> Wind </p>
          <p id="wind"> ${wind} </p> 
        </div>
        <div class ="flexbox">
          <p class="label"> Humidity </p>
          <p id="humdity"> ${humidity}</p>
        </div>
        <div class="flexbox">
          <p class="label"> Feels Like </p>
          <p id="feelsLike">${feelsLike}</p>
        </div>
        <div class="flexbox">
          <p class="label"> Pressure </p>
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

const renderBackgroundVideo = function(weatherData){

	//add logic to chg sourcevid based on weatherdata
	var sourceVid
	const weatherCondition = weatherData.getCurrentWeather().icon

	if (["01d", "01n"].includes(weatherCondition)){
		sourceVid = "sunny"
	} else if (["02d", "02n", "03d", "03n", "04d", "04n"].includes(weatherCondition)){
		sourceVid = "clouds"
	} else if (["09d", "09n", "10d", "10n", "11d", "11n"].includes(weatherCondition)){
		sourceVid = "rain"
	} else if (["13d", "13n"].includes(weatherCondition)){
		sourceVid = "snow"
	} else {
		sourceVid = "mist"
	}

	const backgroundVideo = document.createElement("video")
	backgroundVideo.autoplay = true
	backgroundVideo.loop = true
	backgroundVideo.muted = true
	backgroundVideo.classList.add("backgroundVideo")
	backgroundVideo.innerHTML = `<source src="./assets/${sourceVid}.mp4">`

	console.log(backgroundVideo)

	const content = document.getElementById("content")
	content.appendChild(backgroundVideo)

}

const clearBackgroundVideo = function(){
	const backgroundVideo = document.getElementsByClassName("backgroundVideo")[0]
	backgroundVideo.remove()
}

const initWeatherPage = async function(){
	const weatherData = await getWeatherData("singapore")
	renderWeatherPage(weatherData)
	renderBackgroundVideo(weatherData)
}


export {renderHeader, initWeatherPage}