# FluxPay API Specification v1.0

## Base URL
`http://localhost:5000/api`

## Authentication
Most endpoints require a Bearer Token in the `Authorization` header.
`Authorization: Bearer <your_jwt_token>`

---

## 1. Authentication Endpoints

### Register User
`POST /auth/register`
- **Body**:
  ```json
  { "name": "Name", "email": "email", "password": "password" }
  ```
- **Returns**: User object and token.

### Login User
`POST /auth/login`
- **Body**:
  ```json
  { "email": "email", "password": "password" }
  ```
- **Returns**: User object and token.

---

## 2. User Endpoints

### Get User Profile
`GET /user/profile` (Auth required)
- **Returns**: Current authenticated user details.

### Get Balance
`GET /user/balance` (Auth required)
- **Returns**: `{ "balance": 1000.00 }`

---

## 3. Transaction Endpoints

### Send Money
`POST /transaction/send` (Auth required)
- **Body**:
  ```json
  { "receiverEmail": "target@email.com", "amount": 100.00 }
  ```
- **Returns**: Transaction details.

### Transaction History
`GET /transaction/history` (Auth required)
- **Returns**: Array of transactions.

---

## 4. Beneficiary Endpoints (CRUD)

### Get All Beneficiaries
`GET /beneficiary` (Auth required)
- **Returns**: List of saved contacts.

### Add Beneficiary
`POST /beneficiary` (Auth required)
- **Body**:
  ```json
  { "name": "Contact Name", "email": "contact@email.com", "upiId": "contact@upi" }
  ```
- **Returns**: Created beneficiary object.

### Update Beneficiary
`PUT /beneficiary/:id` (Auth required)
- **Body**:
  ```json
  { "name": "New Name", "email": "new@email.com" }
  ```
- **Returns**: Updated beneficiary object.

### Delete Beneficiary
`DELETE /beneficiary/:id` (Auth required)
- **Returns**: Success message.
