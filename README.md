SniperThink Full Stack Developer Assignment

This project implements the SniperThink hiring assignment, consisting of:

Interactive Strategy Flow Frontend

Distributed File Processing Backend

The system demonstrates modern React UI development and scalable backend architecture using queues and background workers.

Live Demo

Frontend deployed on Vercel:

https://sniperthink-assignment-eta.vercel.app/

Tech Stack
Frontend

React

Vite

TailwindCSS

Framer Motion

Backend

Node.js

Express.js

Database

MySQL

Queue System

Redis

BullMQ

File Handling

Multer

System Architecture
Frontend (React + Vite)
        ↓
REST API (Node.js + Express)
        ↓
Redis Queue (BullMQ)
        ↓
Background Worker
        ↓
MySQL Database

The system processes files asynchronously using background workers, ensuring the API remains responsive.

1. Frontend Overview

The frontend visually explains how the SniperThink strategy engine works through an interactive UI.

Features

Scroll-based storytelling

Animated strategy cards

Hover interactions

Progress indicator

Interest form with backend integration

Responsive layout

Technology Stack

React (Functional Components + Hooks)

Vite

TailwindCSS

Framer Motion

Strategy Steps

The strategy section dynamically renders steps from a data structure.

Market Research
AI Analysis
Strategic Planning
Execution Intelligence

Users can click “I'm Interested” to submit their details.

2. Backend Overview

The backend provides a distributed file processing system.

Uploaded files are processed asynchronously using a Redis queue and worker system.

Backend Features

File upload API

Redis job queue

Background worker processing

MySQL data storage

Job progress tracking

3. Database Schema

The system stores data using the following tables.

Users

Stores interest form submissions.

id INT AUTO_INCREMENT PRIMARY KEY
name VARCHAR(255)
email VARCHAR(255)
Files

Stores uploaded file metadata.

id INT AUTO_INCREMENT PRIMARY KEY
file_path VARCHAR(255)
uploaded_at TIMESTAMP
Jobs

Tracks processing jobs.

id INT AUTO_INCREMENT PRIMARY KEY
file_id INT
status VARCHAR(50)
progress INT
created_at TIMESTAMP

Job statuses:

pending
processing
completed
failed
Results

Stores processed document analysis results.

id INT AUTO_INCREMENT PRIMARY KEY
job_id INT
word_count INT
paragraph_count INT
keywords TEXT
4. API Documentation
Submit Interest

POST /api/interest

Request Body

{
 "name": "John",
 "email": "john@email.com",
 "step": "Market Research"
}

Response

{
 "message": "Interest received successfully"
}
Upload File

POST /api/upload

Form Data

file : PDF or TXT

Response

{
 "message": "File uploaded and job created",
 "jobId": 5
}
Get Job Status

GET /api/job/:jobId

Example

GET /api/job/5

Response

{
 "id": 5,
 "status": "completed",
 "progress": 100
}
Get Processing Result

GET /api/result/:jobId

Example

GET /api/result/5

Response

{
 "job_id": 5,
 "word_count": 1200,
 "paragraph_count": 35,
 "keywords": ["data","analysis","market"]
}
5. Setup Instructions
Clone Repository
git clone https://github.com/prashantiwari70/sniperthink-assignment.git
cd sniperthink-assignment
Install Dependencies

Frontend

cd sniperthink-frontend
npm install

Backend

cd sniperthink-backend
npm install
6. Environment Configuration

Create a .env file inside sniperthink-backend

PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=sniperthink

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
7. Running the Project

Start Redis

redis-server

Start Backend

cd sniperthink-backend
npm start

Start Worker

node src/workers/fileWorker.js

Start Frontend

cd sniperthink-frontend
npm run dev

Frontend runs at

http://localhost:5173
8. Worker & Queue Configuration

The system uses BullMQ with Redis for background processing.

Processing Flow
File Upload
     ↓
Job Created
     ↓
Job pushed to Redis Queue
     ↓
Worker picks job
     ↓
File processed
     ↓
Results saved to database

Workers process jobs asynchronously so API requests are not blocked.

9. Project Structure
sniperthink-assignment
│
├── sniperthink-frontend
│   ├── components
│   ├── sections
│   ├── data
│   └── pages
│
├── sniperthink-backend
│   ├── routes
│   ├── queue
│   ├── workers
│   ├── config
│   └── server.js
10. Author

Prashant Tiwari
Full Stack Developer
