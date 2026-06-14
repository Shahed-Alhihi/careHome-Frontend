import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Login from './pages/auth/login'
import "./pages/auth/login.css"
import DashboardPage from './pages/nurse/nurseDashboard'
import "./pages/nurse/nurseDashboard.css"

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login />}/>
    <Route path='/nurse' element={<DashboardPage />} />
   </Routes>
   </BrowserRouter>
   
  );
}

export default App