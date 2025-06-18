let API_KEY = "523ed55281036c658b56875c1dd63225";
let input = document.getElementById("searchinput");
let showDiv = document.getElementById("showData");

let searchData = async () => {
  const city = input.value.trim();
  if (city === "") {
    showDiv.innerHTML = `<p class="text-danger">Please enter a city name.</p>`;
    return;
  }

  showDiv.innerHTML = `<div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;

  try {
    let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    let response = await fetch(API_URL);
    let data = await response.json();

    if (data.cod == "404") {
      showDiv.innerHTML = `<h5 class="text-danger">❌ ${data.message}</h5>`;
    } else {
      showWeatherData(data);
    }
  } catch (error) {
    showDiv.innerHTML = `<p class="text-danger">Error fetching data. Try again later.</p>`;
    console.error(error);
  }
};

let showWeatherData = (data) => {
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  const visibilityKm = (data.visibility / 1000).toFixed(1); // visibility in km

  showDiv.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon" />
    <h3>${data.name}, ${data.sys.country}</h3>
    <h4>${data.main.temp}°C - ${data.weather[0].main}</h4>
    <p><strong>Description:</strong> ${data.weather[0].description}</p>
    <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    <p><strong>Cloudiness:</strong> ${data.clouds.all}%</p>
    <p><strong>Visibility:</strong> ${visibilityKm} km</p>
    <p><strong>Min Temp:</strong> ${data.main.temp_min}°C</p>
    <p><strong>Max Temp:</strong> ${data.main.temp_max}°C</p>
    <p><strong>Sunrise:</strong> ${sunrise}</p>
    <p><strong>Sunset:</strong> ${sunset}</p>
    <p class="text-muted">Updated just now</p>
  `;
};

