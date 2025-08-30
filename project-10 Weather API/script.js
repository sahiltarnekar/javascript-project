    const apiKey = "743281fc3056421588642333253008"; 

    async function getWeather() {
      const city = document.getElementById("cityInput").value;
      if (!city) {
        alert("Please enter a city name");
        return;
      }

      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
          document.getElementById("weather").innerHTML = `<p>❌ City not found</p>`;
          return;
        }

        document.getElementById("weather").innerHTML = `
          <h3>${data.location.name}, ${data.location.country}</h3>
          <p>🌡 Temperature: ${data.current.temp_c} °C</p>
          <p>☁ Condition: ${data.current.condition.text}</p>
          <img src="https:${data.current.condition.icon}" alt="weather icon">
        `;
      } catch (error) {
        document.getElementById("weather").innerHTML = `<p>⚠ Error fetching data</p>`;
      }
    }