# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token"
  }
}
```

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {...},
    "token": "jwt_token"
  }
}
```

### Get Current User
```http
GET /auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## User Endpoints (Admin Only)

### Get All Users
```http
GET /users?page=1&limit=10
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

### Get User by ID
```http
GET /users/:id
```

### Update User
```http
PUT /users/:id
```

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "role": "admin",
  "isActive": true
}
```

### Delete User
```http
DELETE /users/:id
```

---

## Data Endpoints

### Get All Data
```http
GET /data?page=1&limit=10&category=technical&status=published&search=keyword
```

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category
- `status` - Filter by status
- `search` - Search in title, description, tags

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {...}
}
```

### Get Data by ID
```http
GET /data/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "data_id",
    "title": "Sample Title",
    "description": "Description here",
    "category": "technical",
    "status": "published",
    "tags": ["tag1", "tag2"],
    "createdBy": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    },
    "metadata": {
      "views": 10,
      "lastModified": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### Create Data
```http
POST /data
```

**Request Body:**
```json
{
  "title": "New Data Entry",
  "description": "Detailed description",
  "category": "technical",
  "status": "draft",
  "tags": ["important", "project"]
}
```

### Update Data
```http
PUT /data/:id
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "status": "published"
}
```

### Delete Data
```http
DELETE /data/:id
```

### Get My Data
```http
GET /data/my-data
```

---

## Error Responses

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

**Unauthorized (401):**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**Forbidden (403):**
```json
{
  "success": false,
  "message": "User role 'user' is not authorized to access this route"
}
```

**Not Found (404):**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
