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
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background: radial-gradient(125%_125%_at_50%_10%, #000_60%, #00FF9D40_100%)]" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/notes" element={<><HomePage /><Footer /></>} />
        <Route path="/create" element={<><CreatePage /><Footer /></>} />
        <Route path="/note/:id" element={<><NoteDetailPage /><Footer /></>} />
        <Route path="/profile" element={<><ProfilePage /><Footer /></>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  )
}

export default App;
