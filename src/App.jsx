
import './App.css'
import Landingpage from './pages/Landingpage'
import Hostels from './pages/Hostels'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

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
      </Routes>
    </>
  )
}

export default App
