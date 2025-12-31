// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

// GrabING the elements from the DOM
const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

// Main function to fetch weather alerts
function fetchWeatherData(state) {
  // Clear previous alerts and errors
  alertsDisplay.innerHTML = "";
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");

  // Fetch data from the weather API
  fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch alerts");
      return res.json();
    })
    .then((data) => {
      const alerts = data.features || [];
      
      // Display alert count
      alertsDisplay.textContent = `Weather Alerts: ${alerts.length}`;

      // Display each alert headline
      alerts.forEach((alert) => {
        const p = document.createElement("p");
        p.textContent = alert.properties.headline;
        alertsDisplay.appendChild(p);
      });

      // Clear the input field after successful fetch
      input.value = "";
    })
    .catch((err) => {
      errorMessage.textContent = err.message;
      errorMessage.classList.remove("hidden");
    });
}

// Attach event listener to the button
button.addEventListener("click", () => {
  const state = input.value.trim();
  if (state) fetchWeatherData(state);
});
