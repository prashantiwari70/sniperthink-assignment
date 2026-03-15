SniperThink Full Stack Developer Assignment

This project implements the SniperThink hiring assignment, consisting of:

Interactive Strategy Flow Frontend

Distributed File Processing Backend

The system demonstrates modern React UI development and scalable backend architecture using queues and background workers.

1. Live Demo

Frontend deployed on Vercel:

https://sniperthink-assignment-eta.vercel.app/

2. Frontend Overview

The frontend visually explains how the SniperThink strategy engine works through an interactive UI.

Features

Scroll-based storytelling section

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

The strategy section dynamically renders steps from a data structure:

Market Research
AI Analysis
Strategic Planning
Execution Intelligence

Users can click “I'm Interested” to submit their details.

3. Backend Overview

The backend provides a distributed file processing system that processes uploaded files asynchronously using Redis queues and background workers.

Technology Stack

Node.js

Express.js

MySQL

Redis

BullMQ

Multer

4. System Architecture

The application follows a client → API → queue → worker → database architecture to ensure scalable file processing.

User
 ↓
React Frontend
 ↓
Express API (Node.js)
 ↓
File Upload (Multer)
 ↓
MySQL Database (File + Job Entry)
 ↓
Redis Queue (BullMQ)
 ↓
Background Worker
 ↓
File Processing
 ↓
Result Stored in Database

This architecture enables:

Non-blocking API requests

Scalable background processing

Reliable job handling

5. Database Schema

The system uses MySQL to store uploaded files, job information, and processing results.

Users Table

Stores interest form submissions.

id INT AUTO_INCREMENT PRIMARY KEY
name VARCHAR(255)
email VARCHAR(255)
Files Table

Stores uploaded file metadata.

id INT AUTO_INCREMENT PRIMARY KEY
file_path VARCHAR(255)
uploaded_at TIMESTAMP
Jobs Table

Tracks file processing jobs.

id INT AUTO_INCREMENT PRIMARY KEY
file_id INT
status VARCHAR(50)
progress INT
created_at TIMESTAMP

Job statuses include:

pending
processing
completed
failed
Results Table

Stores processed document analysis results.

id INT AUTO_INCREMENT PRIMARY KEY
job_id INT
word_count INT
paragraph_count INT
keywords TEXT
6. API Documentation

Base URL

http://localhost:5000/api
Submit Interest

POST /api/interest

Request body:

{
 "name": "John",
 "email": "john@email.com",
 "step": "Market Research"
}

Response:

{
 "message": "Interest received successfully"
}
Upload File

POST /api/upload

Form Data:

file : PDF or TXT

Response:

{
 "message": "File uploaded and job created",
 "jobId": 5
}
Get Job Status

GET /api/job/:jobId

Example:

GET /api/job/5

Response:

{
 "id": 5,
 "status": "completed",
 "progress": 100
}
Get Processing Result

GET /api/result/:jobId

Example:

GET /api/result/5

Response:

{
 "job_id": 5,
 "word_count": 1200,
 "paragraph_count": 35,
 "keywords": ["data","analysis","market"]
}
7. Setup Instructions (Run Locally)
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
8. Environment Setup

Create a .env file inside:

sniperthink-backend

Example configuration:

PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=sniperthink

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
9. Running the Project

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

Frontend runs at:

http://localhost:5173
10. Worker / Queue Configuration

The system uses BullMQ with Redis to process jobs asynchronously.

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

Workers run independently from the API server, ensuring that heavy file processing tasks do not block API requests.

11. Project Structure
project-root
├── sniperthink-frontend
│   ├── components
│   ├── sections
│   └── data
│
├── sniperthink-backend
│   ├── routes
│   ├── queue
│   ├── workers
│   ├── config
│   └── server.js
12. Author

Prashant Tiwari
Full Stack Developer
