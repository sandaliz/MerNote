# MerNote

A modern, elegant notes application built with the MERN stack. Create, organize, and manage your personal notes with a beautiful responsive interface.

## Features

- **Note Management**: Create, read, update, and delete notes effortlessly
- **User Authentication**: Secure login and signup with JWT tokens
- **Modern UI**: Clean, responsive design using TailwindCSS and DaisyUI
- **Search Functionality**: Find notes quickly with real-time search
- **Rate Limiting**: Built-in API protection for better performance

## Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast development build tool
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Component library for TailwindCSS
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MERN-1st
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   npm install --prefix backend
   
   # Install frontend dependencies
   npm install --prefix frontend
   ```

3. **Environment Setup**
   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

### Running the Application

#### Option 1: Both servers (Recommended)
```bash
npm run dev
```

#### Option 2: Separate terminals
```bash
# Terminal 1 - Backend
npm run dev --prefix backend

# Terminal 2 - Frontend  
npm run dev --prefix frontend
```

## Application Access

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001

## Project Structure

```
MERN-1st/
|-- backend/
|   |-- src/
|   |   |-- config/     # Database and server configuration
|   |   |-- controllers/ # Route controllers
|   |   |-- middleware/  # Custom middleware
|   |   |-- models/      # MongoDB models
|   |   |-- routes/      # API routes
|   |   |-- server.js    # Server entry point
|   |-- package.json
|
|-- frontend/
|   |-- src/
|   |   |-- components/  # Reusable UI components
|   |   |-- pages/       # Page components
|   |   |-- lib/         # Utilities and API calls
|   |   |-- App.jsx      # Main app component
|   |-- package.json
|
|-- README.md
|-- package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User signup
- `POST /api/auth/login` - User login

### Notes
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create new note
- `GET /api/notes/:id` - Get specific note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note


