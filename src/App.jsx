import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Login from './pages/auth/login'
import DashboardPage from './pages/nurse/nurseDashboard'
import PatientDetails from './pages/nurse/patientDetails'
import Events from './pages/nurse/patientEvents'
import MedSchedule from './pages/nurse/medSchedule'

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login />}/>
    <Route path='/nurse' element={<DashboardPage />} />
    <Route path='/patient/:id' element={<PatientDetails />} />
    <Route path='/events' element={<Events />}/>
    <Route path='/medicine-schedule' element={<MedSchedule />}/>

   </Routes>
   </BrowserRouter>
   
  );
}

export default App