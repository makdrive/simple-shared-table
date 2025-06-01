import React, { useEffect } from 'react';
import io from 'socket.io-client';
import FileExplorer from './components/FileExplorer';
import Spreadsheet from './components/Spreadsheet';
import './App.css';

// Connect to the Socket.IO server
// Ensure this matches the backend server address and port
const socket = io(import.meta.env.VITE_SOCKET_URL);

function App() {
  useEffect(() => {
    // Listen for connection confirmation
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server with ID:', socket.id);
      // Send a test message to the server
      socket.emit('client_message', { text: 'Hello from React client!' });
    });

    // Listen for messages from the server
    socket.on('server_message', (data) => {
      console.log('Message from server:', data);
    });

    socket.on('user_joined', (data) => {
      console.log('Another user joined:', data.userId);
    });

    // Listen for disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server.');
    });

    // Clean up the connection when the component unmounts
    return () => {
      socket.off('connect');
      socket.off('server_message');
      socket.off('user_joined');
      socket.off('disconnect');
      // socket.disconnect(); // Optionally disconnect if app is fully unmounted
    };
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <FileExplorer />
      <Spreadsheet />
    </div>
  );
}

export default App;
