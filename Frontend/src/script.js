// Get HTML elements
const fetchDataButton = document.getElementById('fetchData');
const postDataForm = document.getElementById('postDataForm');
const inputData = document.getElementById('inputData');
const output = document.getElementById('output');

// API Base URL
const API_URL = 'http://localhost:3000/api/account';

// Fetch data from the backend (GET request)
fetchDataButton.addEventListener('click', async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    output.textContent = data.message; // Display response
  } catch (error) {
    console.error('Error fetching data:', error);
    output.textContent = 'Error fetching data.';
  }
});

// Send data to the backend (POST request)
postDataForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent page reload
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: inputData.value }), // Send input data
    });
    const data = await response.json();
    output.textContent = data.message; // Display response
  } catch (error) {
    console.error('Error sending data:', error);
    output.textContent = 'Error sending data.';
  }
});
