
import './App.css'
import Landingpage from './pages/Landingpage'
import Hostels from './pages/Hostels'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import EmailVerification from './pages/EmailVerification'
import VerifyEmail from './pages/VerifyEmail'

import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

import DetailedSearch from './pages/DetailedSearch'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path='/hostels' element={<Hostels />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/detailed_search' element={<DetailedSearch />} />
        <Route path='/email-verification' element={<EmailVerification />} />
        <Route path='/verify-email/:token' element={<VerifyEmail />} />
      </Routes>
    </>
  )
}

export default App
