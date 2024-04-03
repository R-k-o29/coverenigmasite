document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch sensor data from NodeMCU via Fiddler proxy
  async function fetchSensorData() {
    try {
      // Fetch temperature data
      const temperatureResponse = await fetch(
        "http://192.168.117.92/temperature"
      );
      const temperatureData = await temperatureResponse.text();

      // Fetch water level data
      const waterLevelResponse = await fetch(
        "http://192.168.117.92/waterLevel"
      );
      const waterLevelData = await waterLevelResponse.text();

      // Fetch toxicity data
      const toxicityResponse = await fetch(
        "http://192.168.117.92/toxicity"
      );
      const toxicityData = await toxicityResponse.text();

      // Fetch tilt data
      const tiltResponse = await fetch(
        "http://192.168.117.92/tilt"
      );
      const tiltData = await tiltResponse.text();

      // Return fetched sensor data
      return {
        temperature: temperatureData,
        waterLevel: waterLevelData,
        toxicity: toxicityData,
        tilt: tiltData,
      };
    } catch (error) {
      console.error("Error fetching sensor data:", error);
      return null;
    }
  }

  // Update gauge chart data
  function updateChart(chart, value, valueElementId) {
    chart.data.datasets[0].data[0] = value;
    chart.update();
    document.getElementById(valueElementId).textContent = value.toFixed(2);
  }

  // Create gauge chart
  function createChart(elementId, label) {
    return new Chart(document.getElementById(elementId).getContext("2d"), {
      type: "doughnut",
      data: {
        labels: [label],
        datasets: [
          {
            data: [0],
            backgroundColor: ["#007bff"], // Blue
          },
        ],
      },
      options: {
        cutout: "80%", // Adjust this value to control the size of the circular chart
        rotation: -Math.PI,
        circumference: Math.PI,
        plugins: {
          legend: {
            display: false,
          },
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }

  // Update chart data
  async function updateCharts() {
    const data = await fetchSensorData();

    if (!data) {
      return; // Stop execution if there's an error fetching data
    }

    // Update temperature chart
    updateChart(
      temperatureChart,
      parseFloat(data.temperature),
      "temperature-value"
    );

    // Update water level chart
    updateChart(
      waterLevelChart,
      parseFloat(data.waterLevel),
      "water-level-value"
    );

    // Update toxicity chart
    updateChart(toxicityChart, parseFloat(data.toxicity), "toxicity-value");

    // Update tilt
    document.getElementById("tilt").textContent = data.tilt;
  }

  // Update charts on page load
  const temperatureChart = createChart("temperature-chart", "Temperature");
  const waterLevelChart = createChart("water-level-chart", "Water Level");
  const toxicityChart = createChart("toxicity-chart", "Toxicity");
  updateCharts();

  // Update charts every 5 seconds
  setInterval(updateCharts, 5000);

  // Button click event
  document
    .getElementById("release-button")
    .addEventListener("click", function () {
      // Call function to release acids (replace with actual implementation)
      console.log("Acids released!");
    });
});
