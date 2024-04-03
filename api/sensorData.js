// sensorData.js
export default async function handler(req, res) {
  try {
    // Make HTTP request to your NodeMCU device
    const response = await fetch('http://192.168.117.92/sensorData');
    const data = await response.json();

    // Return the response from the NodeMCU device
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
