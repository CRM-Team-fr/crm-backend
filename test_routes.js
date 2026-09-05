const http = require('http');

function makeRequest(method, path, token) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`${method} ${path} -> ${res.statusCode}: ${body}`);
        resolve();
      });
    });

    req.on('error', (e) => console.error(`Error: ${e.message}`));
    req.end();
  });
}

async function test() {
  // First get admin token
  const loginData = JSON.stringify({ email: 'admin@crm.com', password: 'hello999' });
  const loginReq = http.request({
    hostname: 'localhost', port: 5000, path: '/api/auth/employee/login', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(loginData) }
  }, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      const token = JSON.parse(body).token;
      console.log('Admin token obtained');
      
      // List routes by testing various endpoints
      makeRequest('GET', '/api/customers/', token);
      makeRequest('GET', '/api/customers/my-customers', token);
      
      // Get a customer
      makeRequest('GET', '/api/customers/', token).then(() => {
        // Now test PATCH remove with a fake ID to see what route matching does
        makeRequest('PATCH', '/api/customers/12345/remove', token);
        makeRequest('PATCH', '/api/customers/12345/stage', token);
      });
    });
  });
  loginReq.write(loginData);
  loginReq.end();
}

test();
