// Debug script to test API endpoints
// Run this in the browser console to test the API calls

const testAPI = async () => {
  const token = localStorage.getItem('token');
  const baseURL = 'http://localhost:8000';
  
  console.log('Testing API endpoints...');
  console.log('Token:', token);
  
  // Test consumer request
  try {
    console.log('\n=== Testing Consumer Request ===');
    const consumerResponse = await fetch(`${baseURL}/hq/api/payments/consumer_request/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    
    console.log('Consumer Response Status:', consumerResponse.status);
    const consumerData = await consumerResponse.json();
    console.log('Consumer Response Data:', consumerData);
  } catch (error) {
    console.error('Consumer Request Error:', error);
  }
  
  // Test reservations list
  try {
    console.log('\n=== Testing Reservations List ===');
    const reservationsResponse = await fetch(`${baseURL}/hq/api/reservations/list/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    
    console.log('Reservations Response Status:', reservationsResponse.status);
    const reservationsData = await reservationsResponse.json();
    console.log('Reservations Response Data:', reservationsData);
  } catch (error) {
    console.error('Reservations Request Error:', error);
  }
};

// Run the test
testAPI();
