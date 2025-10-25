// Test script to check API endpoints
// Run this in browser console on the dashboard page

const testAPI = async () => {
  const token = localStorage.getItem('token');
  const baseURL = 'http://localhost:8000';
  
  console.log('=== API TEST RESULTS ===');
  console.log('Token:', token);
  console.log('Base URL:', baseURL);
  
  if (!token) {
    console.error('❌ No token found in localStorage');
    return;
  }

  // Test 1: Consumer Request
  try {
    console.log('\n1. Testing Consumer Request...');
    const consumerResponse = await fetch(`${baseURL}/hq/api/payments/consumer_request/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    
    console.log('Consumer Status:', consumerResponse.status);
    const consumerData = await consumerResponse.json();
    console.log('Consumer Response:', consumerData);
    
    if (consumerResponse.ok) {
      console.log('✅ Consumer Request: SUCCESS');
    } else {
      console.log('❌ Consumer Request: FAILED');
    }
  } catch (error) {
    console.error('❌ Consumer Request Error:', error);
  }

  // Test 2: Reservations List
  try {
    console.log('\n2. Testing Reservations List...');
    const reservationsResponse = await fetch(`${baseURL}/hq/api/reservations/list/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    
    console.log('Reservations Status:', reservationsResponse.status);
    const reservationsData = await reservationsResponse.json();
    console.log('Reservations Response:', reservationsData);
    
    if (reservationsResponse.ok) {
      console.log('✅ Reservations List: SUCCESS');
    } else {
      console.log('❌ Reservations List: FAILED');
    }
  } catch (error) {
    console.error('❌ Reservations List Error:', error);
  }

  // Test 3: Basic connectivity
  try {
    console.log('\n3. Testing Basic Connectivity...');
    const basicResponse = await fetch(`${baseURL}/hq/api/landing_page/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    
    console.log('Basic Status:', basicResponse.status);
    const basicData = await basicResponse.json();
    console.log('Basic Response:', basicData);
    
    if (basicResponse.ok) {
      console.log('✅ Basic Connectivity: SUCCESS');
    } else {
      console.log('❌ Basic Connectivity: FAILED');
    }
  } catch (error) {
    console.error('❌ Basic Connectivity Error:', error);
  }
};

// Run the test
testAPI();
