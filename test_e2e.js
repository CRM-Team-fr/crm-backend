const http = require('http');
const crypto = require('crypto');

const BASE = 'http://localhost:5000';
let adminToken = '';
let managerToken = '';
let salespersonToken = '';
let testProductId = '';
let testCustomerProfileId = '';
let testCustomerUserId = '';
let testManagerId = '';
let testSalespersonId = '';

function uniquePhone(prefix) {
  const rand = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  const start = prefix === 'mgr' ? '8' : prefix === 'sp' ? '7' : '6';
  return (start + rand).slice(0, 10);
}

function request(method, urlPath, body, token) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE);
    const data = body ? JSON.stringify(body) : null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, body });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function multipartRequest(formData, token, path = '/api/products/') {
  return new Promise((resolve, reject) => {
    const boundary = '----FormBoundary' + Date.now();
    const parts = [];
    
    for (const [key, value] of formData.entries()) {
      parts.push(`--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${value}\r\n`);
    }
    parts.push(`--${boundary}--\r\n`);
    
    const bodyBuffer = Buffer.concat(
      parts.map(p => Buffer.from(p))
    );

    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': bodyBuffer.length,
        'Authorization': `Bearer ${token}`
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(body) }); }
        catch { resolve({ status: res.statusCode, body }); }
      });
    });

    req.on('error', reject);
    req.write(bodyBuffer);
    req.end();
  });
}

function multipartPatchRequest(productId, formData, token) {
  return new Promise((resolve, reject) => {
    const boundary = '----FormBoundary' + Date.now();
    const parts = [];
    
    for (const [key, value] of formData.entries()) {
      parts.push(`--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${value}\r\n`);
    }
    parts.push(`--${boundary}--\r\n`);
    
    const bodyBuffer = Buffer.concat(
      parts.map(p => Buffer.from(p))
    );

    const options = {
      hostname: 'localhost',
      port: 5000,
      path: `/api/products/${productId}`,
      method: 'PATCH',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': bodyBuffer.length,
        'Authorization': `Bearer ${token}`
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(body) }); }
        catch { resolve({ status: res.statusCode, body }); }
      });
    });

    req.on('error', reject);
    req.write(bodyBuffer);
    req.end();
  });
}

async function runTests() {
  console.log('=== CRM Backend E2E Tests ===\n');
  const results = { pass: 0, fail: 0 };

  function assert(testName, condition, detail) {
    if (condition) {
      console.log(`   PASS - ${testName}`);
      results.pass++;
    } else {
      const detailStr = typeof detail === 'object' ? JSON.stringify(detail) : String(detail);
      console.log(`   FAIL - ${testName}: ${detailStr}`);
      results.fail++;
    }
  }

  // 1. Admin login
  console.log('1. Admin login');
  const adminLogin = await request('POST', '/api/auth/employee/login', { email: 'admin@crm.com', password: 'hello999' });
  if (adminLogin.status === 200 && adminLogin.body.success) {
    adminToken = adminLogin.body.token;
    assert('Admin logged in', true, '');
  } else {
    assert('Admin login', false, adminLogin.body);
    console.log('Cannot continue without admin token');
    process.exit(1);
  }

  // 2. Create manager employee
  console.log('2. Create manager employee');
  const mgrEmail = uniquePhone('mgr') + '@test.com';
  const createManager = await request('POST', '/api/auth/admin/create-employee', { Name: 'Test Manager', email: mgrEmail, phoneNumber: uniquePhone('mgr'), role: 'manager' }, adminToken);
  if (createManager.status === 201 && createManager.body.success) {
    testManagerId = createManager.body.employeeId;
    assert('Manager created', true, testManagerId);
  } else {
    assert('Manager created', false, createManager.body);
  }

  // 3. Create salesperson employee
  console.log('3. Create salesperson employee');
  const spEmail = uniquePhone('sp') + '@test.com';
  const createSalesperson = await request('POST', '/api/auth/admin/create-employee', { Name: 'Test Salesperson', email: spEmail, phoneNumber: uniquePhone('sp'), role: 'salesperson' }, adminToken);
  if (createSalesperson.status === 201 && createSalesperson.body.success) {
    testSalespersonId = createSalesperson.body.employeeId;
    assert('Salesperson created', true, testSalespersonId);
  } else {
    assert('Salesperson created', false, createSalesperson.body);
  }

  // 4. Manager login
  console.log('4. Manager login');
  const mgrLogin = await request('POST', '/api/auth/employee/login', { email: mgrEmail, password: createManager.body.temporaryPassword });
  if (mgrLogin.status === 200 && mgrLogin.body.success) {
    managerToken = mgrLogin.body.token;
    assert('Manager logged in', true, '');
  } else {
    assert('Manager login', false, mgrLogin.body);
  }

  // 5. Salesperson login
  console.log('5. Salesperson login');
  const spLogin = await request('POST', '/api/auth/employee/login', { email: spEmail, password: createSalesperson.body.temporaryPassword });
  if (spLogin.status === 200 && spLogin.body.success) {
    salespersonToken = spLogin.body.token;
    assert('Salesperson logged in', true, '');
  } else {
    assert('Salesperson login', false, spLogin.body);
  }

  // 6. Register customer
  console.log('6. Register customer');
  const custPhone = uniquePhone('cust');
  const registerCustomer = await request('POST', '/api/auth/register', {
    Name: 'Test Customer',
    phoneNumber: custPhone,
    businessName: 'Test Business ' + Date.now(),
    businessType: 'Retail',
    address: '123 Test St',
    city: 'Test City',
    state: 'Test State',
    pincode: '123456'
  });
  if (registerCustomer.status === 201 && registerCustomer.body.success) {
    testCustomerUserId = registerCustomer.body.customerId;
    assert('Customer registered', true, testCustomerUserId);
  } else {
    assert('Customer registered', false, registerCustomer.body);
  }

  // 7. Get customer profile ID
  console.log('7. Get customer profile ID');
  const getCustomers = await request('GET', '/api/customers/?status=pending', null, adminToken);
  const pendingCustomer = getCustomers.body.customers?.find(c => c.userId === testCustomerUserId);
  if (pendingCustomer) {
    testCustomerProfileId = pendingCustomer.id;
    assert('Customer profile ID obtained', true, testCustomerProfileId);
  } else {
    assert('Customer profile ID', false, { customers: getCustomers.body.customers?.length, userId: testCustomerUserId });
  }

  // 8. Approve customer (uses User._id)
  console.log('8. Approve customer');
  const approveResult = await request('PATCH', '/api/auth/admin/approve-customer', { customerId: testCustomerUserId }, adminToken);
  assert('Customer approved', approveResult.status === 200 && approveResult.body._id === testCustomerUserId, approveResult.body);

  // ===== PRODUCT TESTS =====
  console.log('\n=== PRODUCT TESTS ===');

  // 9. Admin create product
  console.log('9. Admin create product');
  const adminProductForm = new FormData();
  adminProductForm.append('name', 'Admin Product ' + Date.now());
  adminProductForm.append('SKU', 'ADM' + Date.now().toString().slice(-6));
  adminProductForm.append('category', 'Test Category');
  adminProductForm.append('unit', 'pcs');
  adminProductForm.append('sellingPrice', '100');
  adminProductForm.append('costPrice', '50');
  adminProductForm.append('tax', '10');
  adminProductForm.append('stock', '50');
  adminProductForm.append('minimumStock', '10');
  adminProductForm.append('status', 'active');
  adminProductForm.append('description', 'Admin test product');
  
  const adminProductResult = await multipartRequest(adminProductForm, adminToken);
  if (adminProductResult.status === 201 && adminProductResult.body.success) {
    testProductId = adminProductResult.body.product.id;
    assert('Admin product created', true, testProductId);
  } else {
    assert('Admin product creation', false, adminProductResult.body);
  }

  // 10. Manager create product
  console.log('10. Manager create product');
  const mgrProductForm = new FormData();
  mgrProductForm.append('name', 'Mgr Product ' + Date.now());
  mgrProductForm.append('SKU', 'MGR' + Date.now().toString().slice(-6));
  mgrProductForm.append('category', 'Test Category');
  mgrProductForm.append('unit', 'pcs');
  mgrProductForm.append('sellingPrice', '200');
  mgrProductForm.append('costPrice', '100');
  mgrProductForm.append('tax', '12');
  mgrProductForm.append('stock', '30');
  mgrProductForm.append('minimumStock', '5');
  mgrProductForm.append('status', 'active');
  mgrProductForm.append('description', 'Manager test product');
  
  const mgrProductResult = await multipartRequest(mgrProductForm, managerToken);
  assert('Manager product created', mgrProductResult.status === 201 && mgrProductResult.body.success, mgrProductResult.body);

  // 11. Admin update product
  console.log('11. Admin update product');
  const updateForm = new FormData();
  updateForm.append('name', 'Admin Updated Product');
  updateForm.append('sellingPrice', '150');
  updateForm.append('status', 'active');
  
  const updateResult = await multipartPatchRequest(testProductId, updateForm, adminToken);
  assert('Product updated', updateResult.status === 200 && updateResult.body.success && updateResult.body.product.name === 'Admin Updated Product', updateResult.body);

  // 12. Salesperson create product (should fail)
  console.log('12. Salesperson create product (should fail)');
  const spProduct = await multipartRequest(new FormData(), salespersonToken);
  assert('Salesperson denied', spProduct.status === 403, `Expected 403, got ${spProduct.status}: ${JSON.stringify(spProduct.body)}`);

  // 13. Admin delete product
  console.log('13. Admin delete product');
  const deleteResult = await request('DELETE', `/api/products/${testProductId}`, null, adminToken);
  assert('Product deleted/deactivated', deleteResult.status === 200 && deleteResult.body.success, deleteResult.body);

  // ===== CUSTOMER REMOVAL TESTS =====
  console.log('\n=== CUSTOMER REMOVAL TESTS ===');

  // 14. Admin remove customer
  console.log('14. Admin remove customer');
  const removeCustomerResult = await request('PATCH', `/api/customers/${testCustomerProfileId}/remove`, null, adminToken);
  assert('Admin removes customer', removeCustomerResult.status === 200 && removeCustomerResult.body.success, removeCustomerResult.body);

  // 15. Manager remove customer (should fail)
  console.log('15. Manager remove customer (should fail)');
  const mgrRemove = await request('PATCH', `/api/customers/${testCustomerProfileId}/remove`, null, managerToken);
  assert('Manager denied', mgrRemove.status === 403, `Expected 403, got ${mgrRemove.status}: ${JSON.stringify(mgrRemove.body)}`);

  // 16. Salesperson remove customer (should fail)
  console.log('16. Salesperson remove customer (should fail)');
  const spRemove = await request('PATCH', `/api/customers/${testCustomerProfileId}/remove`, null, salespersonToken);
  assert('Salesperson denied', spRemove.status === 403, `Expected 403, got ${spRemove.status}: ${JSON.stringify(spRemove.body)}`);

  // ===== EMPLOYEE REMOVAL TESTS =====
  console.log('\n=== EMPLOYEE REMOVAL TESTS ===');

  // 17. Admin remove salesperson (no customers assigned - should succeed)
  console.log('17. Admin remove salesperson (no assigned customers)');
  const removeSpResult = await request('PATCH', `/api/auth/admin/employees/${testSalespersonId}/remove`, null, adminToken);
  assert('Salesperson removed', removeSpResult.status === 200 && removeSpResult.body.success, removeSpResult.body);

  // 18. Manager remove employee (should fail)
  console.log('18. Manager remove employee (should fail)');
  const mgrRemoveEmp = await request('PATCH', `/api/auth/admin/employees/${testManagerId}/remove`, null, managerToken);
  assert('Manager denied employee removal', mgrRemoveEmp.status === 403, `Expected 403, got ${mgrRemoveEmp.status}: ${JSON.stringify(mgrRemoveEmp.body)}`);

  // 19. Salesperson remove employee (should fail)
  console.log('19. Salesperson remove employee (should fail)');
  const spRemoveEmp = await request('PATCH', `/api/auth/admin/employees/${testManagerId}/remove`, null, salespersonToken);
  assert('Salesperson denied employee removal', spRemoveEmp.status === 403, `Expected 403, got ${spRemoveEmp.status}: ${JSON.stringify(spRemoveEmp.body)}`);

  // 20. Admin remove self (should fail)
  console.log('20. Admin remove self (should fail)');
  const selfRemove = await request('PATCH', `/api/auth/admin/employees/${adminLogin.body.user.id}/remove`, null, adminToken);
  assert('Self-removal blocked', selfRemove.status === 400 && selfRemove.body.message === 'You cannot deactivate your own account.', selfRemove.body);

  // 21. Assign customer to salesperson, then try to remove (should fail)
  console.log('21. Assign customer to salesperson, block removal');
  const approved = await request('GET', '/api/customers/?status=approved', null, adminToken);
  const approvedCust = approved.body.customers?.find(c => c.status === 'approved');
  
  if (approvedCust) {
    // Create a new salesperson for this test
    const spEmail2 = uniquePhone('sp2') + '@test.com';
    const createSp2 = await request('POST', '/api/auth/admin/create-employee', { Name: 'Test SP2', email: spEmail2, phoneNumber: uniquePhone('sp2'), role: 'salesperson' }, adminToken);
    const testSalespersonId2 = createSp2.body.employeeId;
    
    const assignResult = await request('PATCH', '/api/auth/admin/assign-salesperson', { customerId: approvedCust.userId, salespersonId: testSalespersonId2 }, adminToken);
    if (assignResult.status === 200 && assignResult.body.success) {
      const blockedRemove = await request('PATCH', `/api/auth/admin/employees/${testSalespersonId2}/remove`, null, adminToken);
      assert('Removal blocked with assigned customers', 
        blockedRemove.status === 400 && blockedRemove.body.message && blockedRemove.body.message.includes('assigned'), 
        blockedRemove.body);
      
      await request('PATCH', '/api/auth/admin/assign-salesperson', { customerId: approvedCust.userId, salespersonId: '' }, adminToken);
    } else {
      assert('Assign customer', false, assignResult.body);
    }
  } else {
    console.log('   SKIP - No approved customer available');
  }

  // ===== HISTORICAL DATA INTEGRITY =====
  console.log('\n=== HISTORICAL DATA INTEGRITY ===');
  
  const integrityCust = await request('GET', '/api/customers/?status=approved', null, adminToken);
  const approvedCust2 = integrityCust.body.customers?.find(c => c.status === 'approved');
  
  if (approvedCust2) {
    console.log('22. Verify customer orders exist after removal');
    const customerOrders = await request('GET', `/api/orders/customer/${approvedCust2.id}`, null, adminToken);
    assert('Customer orders preserved', customerOrders.status === 200, customerOrders.body);

    console.log('23. Verify customer follow-ups exist after removal');
    const customerFollowUps = await request('GET', `/api/followups/customer/${approvedCust2.id}`, null, adminToken);
    assert('Customer follow-ups preserved', customerFollowUps.status === 200, customerFollowUps.body);
  } else {
    console.log('22-23. SKIP - No approved customer available');
  }

  console.log(`\n=== RESULTS: ${results.pass} passed, ${results.fail} failed ===`);
}

runTests().catch(console.error);
