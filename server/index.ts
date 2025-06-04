import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(process.cwd(), 'data');

app.use(cors());
app.use(express.json());

function listFiles(): string[] {
  try {
    return fs.readdirSync(DATA_DIR);
  } catch (e) {
    return [];
  }
}

app.get('/api/files', (req, res) => {
  res.json({ files: listFiles() });
});

interface Sheet {
  [key: string]: string;
}

const sheet: Sheet = {};

io.on('connection', socket => {
  socket.emit('init', sheet);
  socket.on('update-cell', ({ key, value }: { key: string; value: string }) => {
    sheet[key] = value;
    socket.broadcast.emit('update-cell', { key, value });
  });
});

if (process.env.NODE_ENV !== 'test') {
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
