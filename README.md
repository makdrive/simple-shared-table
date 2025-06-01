# Collaborative Web Application

This project is a web application featuring a file explorer and a collaborative spreadsheet.

## Features (Planned & In-Progress)

- **File Explorer:** Displays files and folders.
- **Collaborative Spreadsheet:** Allows multiple users to edit a spreadsheet simultaneously.
  - Basic text formatting (font size, color, background, bold, underline).
- **Real-time Collaboration:** Changes are reflected instantly for all connected users.

## Technology Stack

- **Frontend:**
  - React (with Vite for bundling)
  - JavaScript/JSX
  - Socket.IO Client
- **Backend:**
  - Node.js
  - Express.js
  - Socket.IO
- **Containerization:**
  - Docker
  - Docker Compose

## Project Structure

```
.
├── client/             # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/ # React components (FileExplorer.jsx, Spreadsheet.jsx)
│   │   ├── App.css
│   │   ├── App.jsx     # Main application component
│   │   ├── main.jsx    # React entry point
│   │   └── index.css
│   ├── .env            # Environment variables for client (VITE_API_URL, VITE_SOCKET_URL)
│   ├── Dockerfile      # Dockerfile for client (builds React app, serves with Nginx)
│   ├── package.json
│   └── vite.config.js
├── server/             # Backend Node.js application
│   ├── node_modules/
│   ├── Dockerfile      # Dockerfile for server
│   ├── index.js        # Express server setup, API endpoints, Socket.IO logic
│   └── package.json
├── docker-compose.yml  # Docker Compose configuration
└── README.md           # This file
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (comes with Node.js)
- Docker
- Docker Compose

### Development Setup (Using Docker - Recommended)

1.  **Clone the repository (if applicable).**

2.  **Environment Variables:**
    The client application expects certain environment variables. A `client/.env` file is included with defaults:
    ```env
    VITE_API_URL=http://localhost:3001
    VITE_SOCKET_URL=http://localhost:3001
    ```
    These point to the backend server, which will be accessible on `localhost:3001` when running via Docker Compose.

3.  **Build and run the application using Docker Compose:**
    ```bash
    docker-compose up --build
    ```
    - The backend server will be accessible at `http://localhost:3001`.
    - The frontend application will be accessible at `http://localhost:5173`.

4.  **Accessing the application:**
    Open your web browser and navigate to `http://localhost:5173`.

### Development Setup (Manual - Without Docker)

#### Backend (Server)

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the backend server:**
    ```bash
    npm start
    ```
    (Assuming you add a "start": "node index.js" script to server/package.json)
    Alternatively, run: `node index.js`
    The server will run on `http://localhost:3001`.

#### Frontend (Client)

1.  **Navigate to the client directory:**
    ```bash
    cd client
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Ensure `.env` file exists in `client/` directory with the following content:**
    ```env
    VITE_API_URL=http://localhost:3001
    VITE_SOCKET_URL=http://localhost:3001
    ```
4.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The client application will be available at `http://localhost:5173`.

## Next Steps / Future Development

- Implement actual file system operations for the File Explorer.
- Develop the core spreadsheet functionality (cell data model, rendering, editing).
- Implement text formatting features for the spreadsheet.
- Enhance real-time collaboration for spreadsheet edits (Operational Transformation or CRDTs).
- Add user authentication and authorization.
- Persist spreadsheet data to a database.
- Write unit and integration tests.

EOL
