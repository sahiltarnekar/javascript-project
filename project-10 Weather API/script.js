 const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '7432748f4dmshae1a34f452c0042p1e4193jsn97c24c9c94e4',
        'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
      }
    };

    function getWeather() {
      const city = document.getElementById('city').value;
      const result = document.getElementById('result');

      if (!city) {
        result.innerHTML = '<p class="text-danger">⚠️ Please enter a city name.</p>';
        return;
      }

      fetch(`https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=c`, options)
        .then(response => {
          if (!response.ok) throw new Error('City not found');
          return response.json();
        })
        .then(data => {
          const location = data.location.city + ', ' + data.location.country;
          const condition = data.current_observation.condition;
          const temp = condition.temperature;
          const text = condition.text;

          let icon = "☁️";
          if (text.toLowerCase().includes("sun")) icon = "☀️";
          if (text.toLowerCase().includes("rain")) icon = "🌧️";
          if (text.toLowerCase().includes("snow")) icon = "❄️";
          if (text.toLowerCase().includes("cloud")) icon = "☁️";

          result.innerHTML = `
            <h4>${location}</h4>
            <div class="weather-icon">${icon}</div>
            <p><strong>${temp}°C</strong></p>
            <p>${text}</p>
          `;
        })
        .catch(error => {
          result.innerHTML = `<p class="text-danger">❌ Error: ${error.message}</p>`;
        });
    }