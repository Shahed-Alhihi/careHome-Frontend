import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Login from './pages/auth/login'
import DashboardPage from './pages/nurse/nurseDashboard'
import PatientDetails from './pages/nurse/patientDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login />}/>
    <Route path='/nurse' element={<DashboardPage />} />
    <Route path='/patient/:id' element={<PatientDetails />} />
   </Routes>
   </BrowserRouter>
   
  );
}

export default App