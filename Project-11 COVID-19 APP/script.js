
const url = 'https://covid-193.p.rapidapi.com/countries';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'ac0e8396e8msh3dd745735810391p1c6499jsn5f02d676cfb8', 
    'x-rapidapi-host': 'covid-193.p.rapidapi.com'
  }
};

const countrySelect = document.getElementById("countrySelect");

// Load countries in dropdown
async function loadCountries() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const countries = result.response;

    countries.forEach(country => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;
      countrySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

// Get stats for selected country
async function getStats() {
  const country = countrySelect.value;
  const statsUrl = `https://covid-193.p.rapidapi.com/statistics?country=${country}`;
  
  try {
    const response = await fetch(statsUrl, options);
    const data = await response.json();
    const stats = data.response[0];

    document.getElementById("stats").style.display = "block";
    document.getElementById("countryName").innerText = stats.country;
    document.getElementById("cases").innerText = stats.cases.total || "N/A";
    document.getElementById("deaths").innerText = stats.deaths.total || "N/A";
    document.getElementById("recovered").innerText = stats.cases.recovered || "N/A";
  } catch (error) {
    console.error("Error fetching stats:", error);
  }
}

// Load countries on page load
loadCountries();
