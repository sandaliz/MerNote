import React from 'react'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import { Routes, Route } from 'react-router-dom'
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  return (
    <div className="relative h-full w-full" >
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background: radial-gradient
(125%_125%_at_50%_10%, #000_60%, #00FF9D40_100%)]"> </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  )
}

export default App;
