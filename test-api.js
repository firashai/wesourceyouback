const https = require('https');

// Replace with your actual Vercel deployment URL
const BASE_URL = 'https://your-project-name.vercel.app';

function makeRequest(method, path, data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: jsonBody
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: body
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function testAPI() {
  console.log('🚀 Testing Media Brokerage API...\n');

  try {
    // Test 1: Check if API is running
    console.log('1. Testing API health...');
    const healthCheck = await makeRequest('GET', '/api');
    console.log(`   Status: ${healthCheck.status}`);
    console.log(`   Response: ${JSON.stringify(healthCheck.body, null, 2)}\n`);

    // Test 2: Test user registration
    console.log('2. Testing user registration...');
    const userData = {
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      userType: 'individual'
    };
    
    const registerResponse = await makeRequest('POST', '/users', userData);
    console.log(`   Status: ${registerResponse.status}`);
    console.log(`   Response: ${JSON.stringify(registerResponse.body, null, 2)}\n`);

    // Test 3: Test login
    console.log('3. Testing user login...');
    const loginData = {
      email: userData.email,
      password: 'password123'
    };
    
    const loginResponse = await makeRequest('POST', '/auth/login', loginData);
    console.log(`   Status: ${loginResponse.status}`);
    
    if (loginResponse.status === 200) {
      console.log('   ✅ Login successful!');
      const token = loginResponse.body.access_token;
      
      // Test 4: Test protected endpoint
      console.log('\n4. Testing protected endpoint...');
      const protectedResponse = await makeRequest('GET', '/users', null, {
        'Authorization': `Bearer ${token}`
      });
      console.log(`   Status: ${protectedResponse.status}`);
      console.log(`   Response: ${JSON.stringify(protectedResponse.body, null, 2)}\n`);
    } else {
      console.log(`   ❌ Login failed: ${JSON.stringify(loginResponse.body, null, 2)}\n`);
    }

    // Test 5: Test media types endpoint
    console.log('5. Testing media types endpoint...');
    const mediaTypesResponse = await makeRequest('GET', '/media-types');
    console.log(`   Status: ${mediaTypesResponse.status}`);
    console.log(`   Response: ${JSON.stringify(mediaTypesResponse.body, null, 2)}\n`);

    // Test 6: Test projects endpoint
    console.log('6. Testing projects endpoint...');
    const projectsResponse = await makeRequest('GET', '/projects');
    console.log(`   Status: ${projectsResponse.status}`);
    console.log(`   Response: ${JSON.stringify(projectsResponse.body, null, 2)}\n`);

    console.log('✅ API testing completed!');

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
  }
}

// Instructions
console.log('📋 Instructions:');
console.log('1. Replace "your-project-name" in the BASE_URL with your actual Vercel deployment URL');
console.log('2. Make sure your database is connected and environment variables are set');
console.log('3. Run this script with: node test-api.js\n');

// Run the test
testAPI();
