import React from 'react'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import ProfilePage from './pages/ProfilePage'
import { Routes, Route } from 'react-router-dom'
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/notes" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/note/:id" element={<NoteDetailPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
    </Routes>
  )
}

export default App;
