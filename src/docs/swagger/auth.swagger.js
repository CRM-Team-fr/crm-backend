/**
 * @swagger
 * tags:
 *   - name: Customer Authentication
 *     description: Customer registration and authentication APIs
 */

/**
 * @swagger
 * /api/auth/customer/send-otp:
 *   post:
 *     summary: Send OTP to customer phone number
 *     description: Sends a 6-digit OTP to the customer's registered phone number.
 *     tags:
 *       - Customer Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: OTP sent successfully.
 *
 *       400:
 *         description: Invalid phone number or resend restriction.
 *
 *       429:
 *         description: Too many OTP requests.
 */

/**
 * @swagger
 * /api/auth/customer/verify-otp:
 *   post:
 *     summary: Verify customer OTP
 *     description: Verifies the OTP entered by the customer.
 *     tags:
 *       - Customer Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - otp
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "9876543210"
 *               otp:
 *                 type: string
 *                 example: "654321"
 *     responses:
 *       200:
 *         description: OTP verified successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: OTP verified successfully.
 *
 *       400:
 *         description: Invalid OTP.
 *
 *       401:
 *         description: OTP expired.
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new customer
 *     description: Registers a new customer after successful OTP verification. Customer remains in pending state until approved by an administrator.
 *     tags:
 *       - Customer Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Name
 *               - phoneNumber
 *               - businessName
 *               - businessType
 *               - address
 *               - city
 *               - state
 *               - pincode
 *             properties:
 *               Name:
 *                 type: string
 *                 example: "Lovish Gupta"
 *               phoneNumber:
 *                 type: string
 *                 example: "9876543210"
 *               businessName:
 *                 type: string
 *                 example: "Gupta Traders"
 *               businessType:
 *                 type: string
 *                 example: "Hardware"
 *               address:
 *                 type: string
 *                 example: "Batala, Punjab"
 *               city:
 *                 type: string
 *                 example: "Batala"
 *               state:
 *                 type: string
 *                 example: "Punjab"
 *               pincode:
 *                 type: string
 *                 example: "143505"
 *     responses:
 *       201:
 *         description: Customer registered successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Registration successful. Waiting for admin approval.
 *               customerId: 688f0abc123456789abcdef0
 *
 *       409:
 *         description: Customer already exists.
 */
 /** 
 * @swagger
 * /api/auth/customer/login:
 *   post:
 *     summary: Login customer
 *     description: Logs in an approved customer and returns a JWT access token.
 *     tags:
 *       - Customer Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Login successful.
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               user:
 *                 id: 688f0abc123456789abcdef0
 *                 Name: Lovish Gupta
 *                 businessName: Gupta Traders
 *                 role: customer
 *
 *       403:
 *         description: Customer account pending approval or suspended.
 *
 *       404:
 *         description: Customer not found.
 */
/**
 * @swagger
 * tags:
 *   - name: Employee Authentication
 *     description: Employee authentication and password management APIs
 */

/**
 *
 * @swagger
 * /api/auth/employee/login:
 *   post:
 *     summary: Employee Login
 *     description: >
 *       Allows an Admin, Manager, or Salesperson to log in using their email and password.
 *       If the employee is using a temporary password, the API returns
 *       'changePasswordRequired: true' instead of a JWT token.
 *     tags:
 *       - Employee Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@rockandrollcrm.com
 *               password:
 *                 type: string
 *                 example: Admin@123
 *
 *     responses:
 *       200:
 *         description: Login successful or password change required.
 *         content:
 *           application/json:
 *             examples:
 *
 *               LoginSuccess:
 *                 summary: Successful Login
 *                 value:
 *                   success: true
 *                   message: Login successful.
 *                   token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                   user:
 *                     id: 688f0abc123456789abcdef0
 *                     Name: Super Admin
 *                     role: admin
 *
 *               ChangePasswordRequired:
 *                 summary: Temporary Password
 *                 value:
 *                   success: true
 *                   changePasswordRequired: true
 *                   employeeId: 688f0abc123456789abcdef0
 *                   message: Please change your temporary password.
 *
 *       401:
 *         description: Invalid email or password.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invalid email or password.
 *
 *       403:
 *         description: Account suspended or unauthorized login method.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Your account has been blocked.
 *
 * @swagger
 * /api/auth/employee/change-password:
 *   post:
 *     summary: Change Temporary Password
 *     description: Allows an employee to replace the temporary password with a new permanent password after the first login.
 *     tags:
 *       - Employee Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeeId
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               employeeId:
 *                 type: string
 *                 example: 688f0abc123456789abcdef0
 *               currentPassword:
 *                 type: string
 *                 example: Welcome@1234
 *               newPassword:
 *                 type: string
 *                 example: Lovish@123
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Password changed successfully.
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               user:
 *                 id: 688f0abc123456789abcdef0
 *                 Name: Rahul Sharma
 *                 role: salesperson
 *
 *       400:
 *         description: Password already changed or new password is same as current password.
 *
 *       401:
 *         description: Current password is incorrect.
 *
 *       404:
 *         description: Employee not found.
 */
/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Administrator APIs for employee and customer management
 */

/**
 * @swagger
 * /api/auth/admin/create-employee:
 *   post:
 *     summary: Create Employee
 *     description: Allows the administrator to create a new Manager or Salesperson. A temporary password is generated automatically and sent to the employee's email.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Name
 *               - email
 *               - phoneNumber
 *               - role
 *             properties:
 *               Name:
 *                 type: string
 *                 example: Rahul Sharma
 *               email:
 *                 type: string
 *                 format: email
 *                 example: rahul@crm.com
 *               phoneNumber:
 *                 type: string
 *                 example: "9876543211"
 *               role:
 *                 type: string
 *                 enum:
 *                   - manager
 *                   - salesperson
 *                 example: salesperson
 *     responses:
 *       201:
 *         description: Employee created successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Employee created successfully.
 *               employeeId: 688f0abc123456789abcdef0
 *
 *       400:
 *         description: Invalid employee role.
 *
 *       409:
 *         description: Email or phone number already exists.
 *
 *       401:
 *         description: Unauthorized.
 */

/**
 * @swagger
 * /api/auth/admin/approve-customer:
 *   patch:
 *     summary: Approve Customer
 *     description: Approves a pending customer account.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: 688f0abc123456789abcdef0
 *     responses:
 *       200:
 *         description: Customer approved successfully.
 *
 *       404:
 *         description: Customer not found.
 *
 *       400:
 *         description: Customer already approved.
 */

/**
 * @swagger
 * /api/auth/admin/assign-salesperson:
 *   patch:
 *     summary: Assign Salesperson
 *     description: Assigns a salesperson to an approved customer.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - salespersonId
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: 688f0abc123456789abcdef0
 *               salespersonId:
 *                 type: string
 *                 example: 688f0abc123456789abcdef1
 *     responses:
 *       200:
 *         description: Salesperson assigned successfully.
 *
 *       404:
 *         description: Customer or salesperson not found.
 *
 *       400:
 *         description: Invalid salesperson.
 */

/**
 * @swagger
 * /api/auth/admin/approve-and-assign:
 *   patch:
 *     summary: Approve and Assign Customer
 *     description: Approves a customer and assigns a salesperson in a single operation.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - salespersonId
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: 688f0abc123456789abcdef0
 *               salespersonId:
 *                 type: string
 *                 example: 688f0abc123456789abcdef1
 *     responses:
 *       200:
 *         description: Customer approved and salesperson assigned successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Customer approved and salesperson assigned successfully.
 *
 *       404:
 *         description: Customer or salesperson not found.
 *
 *       400:
 *         description: Customer already approved or invalid salesperson.
 */