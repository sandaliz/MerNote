# MerNote
MERN Notes webapp

## Setup and Installation

1. Clone the repository and navigate to the project directory

2. Install dependencies for the entire project:
```bash
npm install
```

3. Install dependencies for backend and frontend:
```bash
npm install --prefix backend
npm install --prefix frontend
```

## Running the Application

### Option 1: Run both servers concurrently
```bash
npm run dev
```

### Option 2: Run servers separately

**Backend (Terminal 1):**
```bash
npm run dev --prefix backend
```
The backend will run on `http://localhost:5001`

**Frontend (Terminal 2):**
```bash
npm run dev --prefix frontend
```
The frontend will run on `http://localhost:5173`

### Option 3: Direct node execution

**Backend:**
```bash
cd backend && node src/server.js
```

**Frontend:**
```bash
cd frontend && npm run dev
```

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS, DaisyUI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt

## Features

- Create, read, update, and delete notes
- User authentication and authorization
- Modern, responsive UI with TailwindCSS
- Real-time updates

## Access

- Frontend: http://localhost:5173
- Backend API: http://localhost:5001

## Troubleshooting

### CORS Issues
If you encounter CORS errors when using browser preview or different ports, the backend is configured to allow requests from:
- `http://localhost:5173` (default Vite dev server)
- `http://127.0.0.1:64116` (browser preview)
- `http://localhost:3000` (alternative port)

To add more origins, update the CORS configuration in `backend/src/server.js`:
```javascript
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:64116", "http://localhost:3000", "YOUR_ORIGIN_HERE"]
}))
```

### Server Not Starting
- Ensure MongoDB is running
- Check if ports 5001 and 5173 are available
- Verify all dependencies are installed

### Dependencies Issues
If npm scripts fail, try:
```bash
npm install --force
# Or reinstall specific packages
npm uninstall vite && npm install vite
```
