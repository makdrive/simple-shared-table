const express = require('express');
const http = require('http'); // Required for Socket.IO
const { Server } = require("socket.io"); // Socket.IO server class
const cors = require('cors');
const app = express();
const server = http.createServer(app); // Create HTTP server

// Configure Socket.IO
// Allow connections from frontend (assuming it runs on port 5173 for Vite dev server)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite default dev port
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for Express routes

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

const mockFileSystem = [
  { id: '1', name: 'Project Documents', type: 'folder', children: [
    { id: '1-1', name: 'Roadmap.docx', type: 'file' },
    { id: '1-2', name: 'Budget.xlsx', type: 'file' },
  ]},
  { id: '2', name: 'Source Code', type: 'folder', children: [
    { id: '2-1', name: 'README.md', type: 'file' },
    { id: '2-2', name: 'app.js', type: 'file' },
  ]},
  { id: '3', name: 'Meeting Notes.txt', type: 'file' },
  { id: '4', name: 'design_mockups', type: 'folder', children: []}
];

app.get('/api/files', (req, res) => {
  res.json(mockFileSystem);
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  // Example: broadcast a message to all clients
  socket.broadcast.emit('user_joined', { userId: socket.id });

  // Example: listen for a message from a client
  socket.on('client_message', (data) => {
    console.log('Message from client:', data);
    // Echo message back to the sender or broadcast to others
    socket.emit('server_message', { text: `Server received: ${data.text}` });
  });
});

// Start the server (using the http server instance for Socket.IO)
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
