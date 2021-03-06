const apiKey = "c9d9f44469f048ce0b742fae1252c784"



const getWeatherData = async function(cityName){
	const coordsUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
	const coordsReq = await fetch(coordsUrl)
	const coordsJson = await coordsReq.json()

	try {
		const lat = coordsJson[0].lat
		const lon = coordsJson[0].lon

		const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`
		const weatherReq = await fetch(weatherUrl)
		const weatherJson = await weatherReq.json()

		const getCurrentTemp = () => weatherJson.current.temp
		const getCurrentFeelsLike = () => weatherJson.current.feels_like
		const getCurrentHumidity = () => weatherJson.current.humidity
		const getCurrentWindSpeed = () => weatherJson.current.wind_speed
		const getCurrentWeather = () => weatherJson.current.weather [0]
		const getCurrentPressure = () => weatherJson.current.pressure

		const getWeather = (day) => weatherJson.daily[day].weather[0]
		const getTemp = (day) => weatherJson.daily[day].temp
		const getWind = (day) => weatherJson.daily[day].wind_speed
		const getName = (day) => coordsJson[0].name
		const getHumidity = (day) => weatherJson.daily[day].humidity
		const getPressure = (day) => weatherJson.daily[day].pressure
		const getFeelsLike = (day) => weatherJson.daily[day].feels_like.day

		return {getName, getWeather, getTemp, getWind, getPressure, getHumidity, getFeelsLike, 
			getCurrentTemp, getCurrentFeelsLike, getCurrentHumidity, getCurrentWindSpeed, getCurrentWeather, getCurrentPressure}
	} catch {
		return "err"
	}
	
}


export default getWeatherData
