const https = require('https');

// Replace with your actual Vercel deployment URL
const BASE_URL = 'https://media-brokerage-rjjct7lch-firashaidars-projects.vercel.app';

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
  console.log(`📍 Testing URL: ${BASE_URL}\n`);

  const tests = [
    {
      name: 'Main API (/)',
      method: 'GET',
      path: '/',
      expectedStatus: 200
    },
    {
      name: 'API Documentation (/api)',
      method: 'GET',
      path: '/api',
      expectedStatus: 200
    },
    {
      name: 'Health Check (/health)',
      method: 'GET',
      path: '/health',
      expectedStatus: 200
    },
    {
      name: 'Users GET (/users)',
      method: 'GET',
      path: '/users',
      expectedStatus: 200
    },
    {
      name: 'Users POST (/users)',
      method: 'POST',
      path: '/users',
      data: { email: 'test@example.com', name: 'Test User' },
      expectedStatus: 200
    },
    {
      name: 'Auth Login GET (/auth/login)',
      method: 'GET',
      path: '/auth/login',
      expectedStatus: 200
    },
    {
      name: 'Auth Login POST (/auth/login)',
      method: 'POST',
      path: '/auth/login',
      data: { email: 'test@example.com', password: 'password123' },
      expectedStatus: 200
    },
    {
      name: 'Content (/content)',
      method: 'GET',
      path: '/content',
      expectedStatus: 200
    },
    {
      name: 'Projects (/projects)',
      method: 'GET',
      path: '/projects',
      expectedStatus: 200
    },
    {
      name: 'Media Types (/media-types)',
      method: 'GET',
      path: '/media-types',
      expectedStatus: 200
    }
  ];

  let passedTests = 0;
  let failedTests = 0;

  for (const test of tests) {
    try {
      console.log(`🧪 Testing: ${test.name}`);
      const response = await makeRequest(test.method, test.path, test.data);
      
      if (response.status === test.expectedStatus) {
        console.log(`   ✅ PASSED - Status: ${response.status}`);
        console.log(`   📄 Response: ${JSON.stringify(response.body, null, 2)}`);
        passedTests++;
      } else {
        console.log(`   ❌ FAILED - Expected: ${test.expectedStatus}, Got: ${response.status}`);
        console.log(`   📄 Response: ${JSON.stringify(response.body, null, 2)}`);
        failedTests++;
      }
    } catch (error) {
      console.log(`   ❌ ERROR - ${error.message}`);
      failedTests++;
    }
    console.log('');
  }

  console.log('📊 Test Summary:');
  console.log(`   ✅ Passed: ${passedTests}`);
  console.log(`   ❌ Failed: ${failedTests}`);
  console.log(`   📈 Success Rate: ${((passedTests / (passedTests + failedTests)) * 100).toFixed(1)}%`);

  if (failedTests === 0) {
    console.log('\n🎉 All tests passed! Your API is working perfectly!');
  } else {
    console.log('\n⚠️  Some tests failed. Check the responses above for details.');
  }
}

// Run the test
testAPI().catch(console.error);
