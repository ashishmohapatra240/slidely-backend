
# Slidely Backend

This is the backend server for the Slidely Form App, built with Express and TypeScript.

## Getting Started

### Installation

1. Clone the repository:
    ```bash
    git clone [<repository-url>](https://github.com/ashishmohapatra240/slidely-backend.git)
    cd slidely-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### Running the Server

To start the server in development mode:
```bash
npm run dev
```

### Project Structure

```plaintext
slidely-backend/
├── src/
│   ├── controllers/
│   │   ├── formController.ts
│   ├── routes/
│   │   ├── formRoutes.ts
│   ├── services/
│   │   ├── formService.ts
│   ├── models/
│   │   ├── formModel.ts
│   ├── utils/
│   │   ├── db.ts
│   ├── index.ts
├── db.json
├── package.json
├── tsconfig.json
├── README.md
```

## API Endpoints

### GET /ping

**Description:** Check if the server is running.  
**Response:**
```json
true
```

### POST /submit

**Description:** Submit a new form entry.  
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "phone": "9876543210",
  "github_link": "https://github.com/john_doe/my_slidely_task/",
  "stopwatch_time": "00:01:19"
}
```

**Response (Success):**
- **Status Code:** 201
- **Body:** Form submitted successfully

**Response (Failure - Missing Fields):**
- **Status Code:** 400
- **Body:** All fields are required

### GET /read

**Description:** Retrieve a specific form entry by index.  
**Query Parameters:**
- `index`: The 0-based index of the form entry to retrieve.

**Response (Success):**
- **Status Code:** 200
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "phone": "9876543210",
    "github_link": "https://github.com/john_doe/my_slidely_task/",
    "stopwatch_time": "00:01:19"
  }
  ```

**Response (Failure - Invalid Index):**
- **Status Code:** 400
- **Body:** Index must be a number

**Response (Failure - Index Out of Range):**
- **Status Code:** 404
- **Body:** Index out of range

**Response (Failure - No Submissions):**
- **Status Code:** 404
- **Body:** No submissions found

### DELETE /delete

**Description:** Delete a specific form entry by index.  
**Query Parameters:**
- `index`: The 0-based index of the form entry to delete.

**Response (Success):**
- **Status Code:** 200
- **Body:** Form deleted successfully

**Response (Failure - Invalid Index):**
- **Status Code:** 400
- **Body:** Index must be a number

**Response (Failure - Index Out of Range):**
- **Status Code:** 404
- **Body:** Index out of range

**Response (Failure - No Submissions):**
- **Status Code:** 404
- **Body:** No submissions found

### PUT /edit

**Description:** Edit a specific form entry by index.  
**Query Parameters:**
- `index`: The 0-based index of the form entry to edit.

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "updatedemail@example.com",
  "phone": "1234567890",
  "github_link": "https://github.com/updated_repo",
  "stopwatch_time": "00:02:00"
}
```

**Response (Success):**
- **Status Code:** 200
- **Body:** Form updated successfully

**Response (Failure - Missing Fields):**
- **Status Code:** 400
- **Body:** All fields are required

**Response (Failure - Invalid Index):**
- **Status Code:** 400
- **Body:** Index must be a number

**Response (Failure - Index Out of Range):**
- **Status Code:** 404
- **Body:** Index out of range

**Response (Failure - No Submissions):**
- **Status Code:** 404
- **Body:** No submissions found

### GET /search

**Description:** Search form entries by email.  
**Query Parameters:**
- `email`: The email ID to search for.

**Response (Success):**
- **Status Code:** 200
- **Body:**
  ```json
  [
    {
      "name": "John Doe",
      "email": "johndoe@gmail.com",
      "phone": "9876543210",
      "github_link": "https://github.com/john_doe/my_slidely_task/",
      "stopwatch_time": "00:01:19"
    }
  ]
  ```

**Response (Failure - No Entries Found):**
- **Status Code:** 404
- **Body:** No entries found for the provided email

**Response (Failure - Invalid Email Parameter):**
- **Status Code:** 400
- **Body:** Email must be a string

## Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/ashishmohapatra240/slidely-backend.git
    cd slidely-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm run dev
    ```

The server will start on [http://localhost:3000](http://localhost:3000).

## Endpoints Summary

- **GET /ping:** Check server status.
- **POST /submit:** Submit a new form entry.
- **GET /read:** Retrieve a specific form entry by index.
- **DELETE /delete:** Delete a specific form entry by index.
- **PUT /edit:** Edit a specific form entry by index.
- **GET /search:** Search form entries by email.
