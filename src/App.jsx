
import './App.css'
import Landingpage from './pages/Landingpage'
import Hostels from './pages/Hostels'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import LoginPrompt from './pages/LoginPrompt'
import Dashboard from './pages/Dashboard'
import EmailVerification from './pages/EmailVerification'
import VerifyEmail from './pages/VerifyEmail'
import StudentResources from './pages/StudentResources'
import CampusGuide from './pages/CampusGuide'
import SafetyTips from './pages/SafetyTips'
import HelpCenter from './pages/HelpCenter'
import ContactUs from './pages/ContactUs'
import ReportIssue from './pages/ReportIssue'
import Feedback from './pages/Feedback'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookiePolicy from './pages/CookiePolicy'
import Disclaimer from './pages/Disclaimer'

import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { useEffect, useState } from 'react'

import DetailedSearch from './pages/DetailedSearch'
import HostelDetail from './pages/HostelDetail'

function App() {
  const [token, setToken] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('token') : null));

  useEffect(() => {
    const handleAuthChange = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('authChange', handleAuthChange);
    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  return (
    <>
      <Routes>
        {/* Public routes - accessible without authentication */}
        <Route path='/' element={token ? <Landingpage /> : <LoginPrompt />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/login-prompt' element={<LoginPrompt />} />
        <Route path='/email-verification' element={<EmailVerification />} />
        <Route path='/verify-email/:token' element={<VerifyEmail />} />
        <Route path='/student-resources' element={<StudentResources />} />
        <Route path='/campus-guide' element={<CampusGuide />} />
        <Route path='/safety-tips' element={<SafetyTips />} />
        <Route path='/help-center' element={<HelpCenter />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/report-issue' element={<ReportIssue />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-of-service' element={<TermsOfService />} />
        <Route path='/cookie-policy' element={<CookiePolicy />} />
        <Route path='/disclaimer' element={<Disclaimer />} />
        
        {/* Protected routes - require authentication */}
        <Route path='/hostels' element={
          <ProtectedRoute>
            <Hostels />
          </ProtectedRoute>
        } />
        <Route path='/hostels/:slugOrId' element={
          <ProtectedRoute>
            <HostelDetail />
          </ProtectedRoute>
        } />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/detailed_search' element={
          <ProtectedRoute>
            <DetailedSearch />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
