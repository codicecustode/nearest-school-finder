# 🏫 School Management API

A simple, fast API to manage schools and find the nearest schools based on user location.

---

## 🚀 Features

- Add a new school with location data
- Find nearest schools by user latitude and longitude
- Uses MySQL for data storage with connection pooling
- Built with Node.js and TypeScript for scalability and type safety

---

## 📦 Installation

    git clone https://github.com/codicecustode/nearest-school-finder.git
    cd school-management-api
    npm install

Make sure you have a MySQL database running and update your `.env` with your database credentials:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=school_management
    PORT=3000
    NODE_ENV=development

---

## ⚡ Running the Server

Start in development mode:

    npm run dev

You should see:

  ✅ Connected to the MySQL database
  🚀 Running successfully
  📍 Listening on: http://localhost:3000
  🌐 Live on Render: https://nearest-school-finder.onrender.com

---

## 📚 API Routes

### 1. Add School

**POST** `/api/v1/addSchool`

Add a new school to the database.

- **Request Body (JSON):**

        {
          "name": "Springfield Elementary",
          "address": "987 Birch Street",
          "latitude": 28.6129,
          "longitude": 77.2090
        }

- **Response:**

        {
          "message": "School added successfully",
          "schoolId": 1
        }

---

### 2. List Nearest Schools

**GET** `/api/v1/listSchools?latitude=28.6139&longitude=77.2090`

Get nearest schools based on the user's current location.

- **Query Parameters:**

| Parameter | Type    | Description                 | Required |
| --------- | ------- | ---------------------------| -------- |
| latitude  | float   | User's latitude coordinate | Yes      |
| longitude | float   | User's longitude coordinate| Yes      |

- **Response:**

        [
          {
            "id": 1,
            "name": "Springfield Elementary",
            "latitude": 28.6129,
            "longitude": 77.2090,
            "distance_in_meters": 150
          },
          {
            "id": 2,
            "name": "Shelbyville High",
            "latitude": 28.6150,
            "longitude": 77.2105,
            "distance_in_meters": 300
          }
        ]

---

## 🔧 Tech Stack

- Node.js  
- TypeScript  
- Express  
- MySQL (`mysql2` package)  
- dotenv for environment variables  

---



