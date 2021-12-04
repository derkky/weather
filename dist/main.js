(()=>{"use strict";const e="c9d9f44469f048ce0b742fae1252c784",t=function(e,t){const n=document.createElement("div");n.classList.add("flexbox");var a=new Date;a.setDate(a.getDate()+e),a=a.toString().substring(0,15);const i=t.getWeather(e).icon,s=t.getTemp(e).day,d=t.getWeather(e).main;return n.innerHTML=`\n        <p class="date"> ${a} </p>\n        <img class="icon" src="https://openweathermap.org/img/wn/${i}@2x.png">\n        <p class="temperatureWeek"> ${s} </p>\n        <p class="descriptionWeek"> ${d} </p>\n    \t`,n},n=function(){const e=document.createElement("div");e.classList.add("weatherPage"),document.getElementById("content").appendChild(e)},a=function(){document.getElementsByClassName("weatherPage")[0].remove()};!function(){const i=document.createElement("div");i.classList.add("header","flexbox");const s=document.createElement("h1");s.classList.add("name"),s.innerHTML="WEATHER APP";const d=document.createElement("form");d.noValidate="true",d.classList.add("inputForm"),d.innerHTML='\n        <input type="text" class="cityInput">\n        <input type="submit">\n\t',d.onsubmit=async function(i){i.preventDefault();const s=document.getElementsByClassName("cityInput")[0].value,d=await async function(t){const n=`https://api.openweathermap.org/geo/1.0/direct?q=${t}&limit=1&appid=${e}`,a=await fetch(n),i=a.ok,s=await a.json();try{const t=`https://api.openweathermap.org/data/2.5/onecall?lat=${s[0].lat}&lon=${s[0].lon}&exclude=minutely,hourly&appid=${e}&units=metric`,n=await fetch(t),a=await n.json();return{getName:e=>s[0].name,getWeather:e=>a.daily[e].weather[0],getTemp:e=>a.daily[e].temp,getWind:e=>a.daily[e].wind_speed,getPressure:e=>a.daily[e].pressure,getHumidity:e=>a.daily[e].humidity,getFeelsLike:e=>a.daily[e].feels_like.day,isOk:()=>i}}catch{return"err"}}(s),c=document.getElementsByClassName("cityInput")[0];"err"!=d?(c.setCustomValidity(""),a(),function(e){const n=document.createElement("div");n.classList.add("weatherPage","flexbox");const a=function(e){const t=e.getName(),n=e.getTemp(0),a=e.getWeather(0).main,i=e.getWind(0),s=e.getPressure(0),d=e.getHumidity(0),c=e.getFeelsLike(0),p=e.getWeather(0).icon,o=document.createElement("div");return o.classList.add("todayInfo","flexbox"),o.innerHTML=`\n\t<h2 class="cityName"> ${t} </h2>\n      <div class="weatherTemp flexbox">\n        <div class="todayWeather flexbox">\n          <p id="weatherDescription"> ${a} </p>\n          <img src="https://openweathermap.org/img/wn/${p}@2x.png">\n        </div>\n        <div class="todayTemperature flexbox"> \n          <p id="temperature"> ${n.day} </p>\n          <p> Min Temp </p>\n          <p id="minTemp"> ${n.min} </p>\n          <p> Max Temp </p>\n          <p id="maxTemp"> ${n.max} </p>\n        </div>\n      </div>\n      <div class="otherInfo flexbox">\n        <div class="flexbox">\n          <p> Wind </p>\n          <p id="wind"> ${i} </p> \n        </div>\n        <div class ="flexbox">\n          <p> Humidity </p>\n          <p id="humdity"> ${d}</p>\n        </div>\n        <div class="flexbox">\n          <p> Feels Like </p>\n          <p id="feelsLike">${c}</p>\n        </div>\n        <div class="flexbox">\n          <p> Pressure </p>\n          <p id="pressure">${s}</p>\n        </div> \n\t`,o}(e),i=function(e){const n=document.createElement("div");n.classList.add("weekInfo","flexbox");for(var a=1;a<8;a++){var i=t(a,e);n.appendChild(i)}return n}(e);n.appendChild(a),n.appendChild(i),document.getElementById("content").appendChild(n)}(d)):(c.setCustomValidity(`Sorry, ${s} is not a recognized city name`),c.reportValidity(),a(),n())},i.appendChild(s),i.appendChild(d),document.getElementById("content").appendChild(i)}(),n()})();