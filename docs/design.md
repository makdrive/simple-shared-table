# Simple Shared Table Design

## Overview

This project implements a collaborative spreadsheet-like web application. The left side
of the UI displays an explorer listing files created within the application.
The right side shows a spreadsheet that can be edited by multiple users
simultaneously. Formatting options such as font size, colors, bold and
underline are supported.

The system uses a modern stack composed of React for the front end and Node.js
with Express for the back end. Real-time collaboration is achieved using
`socket.io` for WebSocket communication. The entire codebase is written in
TypeScript for type safety.

## Architecture

```
┌────────────┐        WebSocket        ┌────────────┐
│   Client   │ <─────────────────────> │   Server   │
└────────────┘                         └────────────┘
```

- **Front end**: React application bootstrapped by Vite. The main page
  (`index.html`) hosts the React app. Components include:
  - `Explorer` – lists files obtained from `/api/files`.
  - `Sheet` – displays an editable table and broadcasts changes via sockets.
- **Back end**: Express server exposing REST endpoints and handling
  WebSocket connections via socket.io. It stores sheet state in memory.
- **Shared data**: Sheet updates are broadcast to all connected clients to
  keep them in sync.

## File Structure

```
/
├── client/             # React front end
│   ├── index.html
│   └── src/
│       ├── App.tsx
│       ├── Explorer.tsx
│       ├── Sheet.tsx
│       └── main.tsx
├── server/             # Express + socket.io backend
│   ├── index.ts
│   └── test/
│       └── server.test.ts
└── docs/
    └── design.md
```

## Running Locally

1. Install dependencies in both `client` and `server` directories using `npm install`.
2. Start the back end:
   ```bash
   npm start --prefix server
   ```
3. In a separate terminal, start the front end:
   ```bash
   npm run dev --prefix client
   ```
4. Navigate to `http://localhost:5173` to access the application.

## Testing

Run the automated tests with:

```bash
npm test --prefix server
```

The tests use Jest and Supertest to check that API endpoints respond correctly.
