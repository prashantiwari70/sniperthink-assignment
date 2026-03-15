# SniperThink Full Stack Developer Assignment

This project implements the **SniperThink hiring assignment**, consisting of:

1. **Interactive Strategy Flow Frontend**
2. **Distributed File Processing Backend**

The system demonstrates **modern React UI development and scalable backend architecture using queues and background workers**.

---

# 1. Frontend Overview

The frontend visually explains how the SniperThink strategy engine works through an interactive UI.

## Features

* Scroll-based storytelling section
* Animated strategy cards
* Hover interactions
* Progress indicator
* Interest form with backend integration
* Responsive layout

## Technology Stack

* React (Functional Components + Hooks)
* Vite
* TailwindCSS
* Framer Motion

## Strategy Steps

The strategy section dynamically renders steps from a data structure:

```
Market Research
AI Analysis
Strategic Planning
Execution Intelligence
```

Users can click **“I'm Interested”** to submit their details.

---

# 2. Backend Overview

The backend provides a **distributed file processing system** that processes uploaded files asynchronously using **Redis queues and workers**.

## Technology Stack

* Node.js
* Express.js
* MySQL
* Redis
* BullMQ
* Multer

---

# 3. Database Schema

The system stores data in the following tables.

## Users

```
id INT AUTO_INCREMENT PRIMARY KEY
name VARCHAR(255)
email VARCHAR(255)
```

Stores user interest form submissions.

---

## Files

```
id INT AUTO_INCREMENT PRIMARY KEY
file_path VARCHAR(255)
uploaded_at TIMESTAMP
```

Stores uploaded file information.

---

## Jobs

```
id INT AUTO_INCREMENT PRIMARY KEY
file_id INT
status VARCHAR(50)
progress INT
created_at TIMESTAMP
```

Tracks file processing jobs.

Job statuses include:

```
pending
processing
completed
failed
```

---

## Results

```
id INT AUTO_INCREMENT PRIMARY KEY
job_id INT
word_count INT
paragraph_count INT
keywords TEXT
```

Stores processed file analysis results.

---

# 4. API Documentation

## Submit Interest

POST `/api/interest`

Request body:

```
{
 "name": "John",
 "email": "john@email.com",
 "step": "Market Research"
}
```

Response:

```
{
 "message": "Interest received successfully"
}
```

---

## Upload File

POST `/api/upload`

Form Data:

```
file : PDF or TXT
```

Response:

```
{
 "message": "File uploaded and job created",
 "jobId": 5
}
```

---

## Get Job Status

GET `/api/job/:jobId`

Example:

```
GET /api/job/5
```

Response:

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

Example:

```
GET /api/result/5
```

Response:

```
{
 "job_id": 5,
 "word_count": 1200,
 "paragraph_count": 35,
 "keywords": ["data","analysis","market"]
}
```

---

# 5. Setup Instructions

## Clone Repository

```
git clone <repository-url>
cd sniperthink-assignment
```

---

## Install Dependencies

Frontend:

```
cd sniperthink-frontend
npm install
```

Backend:

```
cd sniperthink-backend
npm install
```

---

# 6. Running the Project

Start Redis:

```
redis-server
```

Start Backend:

```
cd sniperthink-backend
npm start
```

Start Worker:

```
node src/workers/fileWorker.js
```

Start Frontend:

```
cd sniperthink-frontend
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 7. Worker & Queue Configuration

The system uses **BullMQ with Redis** for background job processing.

## Flow

```
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
```

Workers process jobs asynchronously to prevent blocking API requests.

---

# 8. Project Structure

```
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
```

---

# 9. Live Demo

Frontend deployed using **Vercel**.

---

# 10. Author

Prashant Tiwari

Full Stack Developer
