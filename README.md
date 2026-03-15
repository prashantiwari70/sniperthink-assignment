# SniperThink Full Stack Assignment

This project implements the **SniperThink Full Stack Developer assignment**, consisting of:

1. **Interactive React Frontend** that explains the SniperThink strategy workflow.
2. **Distributed Backend File Processing System** using queues and background workers.

---

# Live Demo

Frontend deployed on Vercel:

https://sniperthink-assignment-eta.vercel.app/

---

# 1. System Architecture

The application follows a **queue-based asynchronous architecture**.

```
User
 ↓
React Frontend
 ↓
Express API
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
Results stored in Database
```

This architecture enables **asynchronous file processing without blocking API requests**.

---

# 2. Database Schema

## Users

Stores interest form submissions.

```
id INT AUTO_INCREMENT PRIMARY KEY
name VARCHAR(255)
email VARCHAR(255)
```

---

## Files

Stores uploaded file information.

```
id INT AUTO_INCREMENT PRIMARY KEY
file_path VARCHAR(255)
uploaded_at TIMESTAMP
```

---

## Jobs

Tracks processing jobs.

```
id INT AUTO_INCREMENT PRIMARY KEY
file_id INT
status VARCHAR(50)
progress INT
created_at TIMESTAMP
```

Job states:

```
pending
processing
completed
failed
```

---

## Results

Stores processed file analysis.

```
id INT AUTO_INCREMENT PRIMARY KEY
job_id INT
word_count INT
paragraph_count INT
keywords TEXT
```

---

# 3. API Documentation

## Submit Interest

POST `/api/interest`

Request

```
{
 "name": "John",
 "email": "john@email.com",
 "step": "Market Research"
}
```

Response

```
{
 "message": "Interest received successfully"
}
```

---

## Upload File

POST `/api/upload`

Form Data

```
file : PDF or TXT (max 10MB)
```

Response

```
{
 "message": "File uploaded and job created",
 "jobId": 5
}
```

---

## Get Job Status

GET `/api/job/:jobId`

Example

```
GET /api/job/5
```

Response

```
{
 "id": 5,
 "status": "completed",
 "progress": 100
}
```

---

## Get Processing Result

GET `/api/result/:jobId`

Example

```
GET /api/result/5
```

Response

```
{
 "job_id": 5,
 "word_count": 1200,
 "paragraph_count": 35,
 "keywords": ["data","analysis","market"]
}
```

---

# 4. Setup Instructions

Clone repository

```
git clone <repository-url>
cd sniperthink-assignment
```

Install dependencies

Frontend

```
cd sniperthink-frontend
npm install
```

Backend

```
cd sniperthink-backend
npm install
```

---

# 5. Running the Project

Start Redis

```
redis-server
```

Start Backend

```
cd sniperthink-backend
npm start
```

Start Worker

```
node src/workers/fileWorker.js
```

Start Frontend

```
cd sniperthink-frontend
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 6. Worker / Queue Configuration

The system uses **BullMQ with Redis** for asynchronous job processing.

```
File Upload
 ↓
Job created
 ↓
Job pushed to Redis Queue
 ↓
Worker processes job
 ↓
Results saved to database
```

Workers ensure **scalable background processing** without blocking API requests.

---

# Author

Prashant Tiwari
