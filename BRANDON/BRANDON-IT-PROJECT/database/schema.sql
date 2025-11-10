-- Brandon IT Project Database Schema
-- MongoDB Schema Documentation

-- Collections:
-- 1. users
-- 2. data

-- Users Collection Schema
{
  "_id": ObjectId,
  "firstName": String (required),
  "lastName": String (required),
  "email": String (required, unique),
  "password": String (hashed, required),
  "role": String (enum: ['user', 'admin'], default: 'user'),
  "isActive": Boolean (default: true),
  "lastLogin": Date,
  "createdAt": Date,
  "updatedAt": Date
}

-- Data Collection Schema
{
  "_id": ObjectId,
  "title": String (required),
  "description": String (required),
  "category": String (enum: ['general', 'technical', 'academic', 'personal', 'other']),
  "status": String (enum: ['draft', 'published', 'archived'], default: 'draft'),
  "tags": Array of Strings,
  "createdBy": ObjectId (ref: User),
  "metadata": {
    "views": Number (default: 0),
    "lastModified": Date
  },
  "createdAt": Date,
  "updatedAt": Date
}

-- Indexes
-- users collection:
db.users.createIndex({ "email": 1 }, { unique: true })

-- data collection:
db.data.createIndex({ "title": "text", "description": "text", "tags": "text" })
db.data.createIndex({ "createdBy": 1 })
db.data.createIndex({ "category": 1 })
db.data.createIndex({ "status": 1 })
