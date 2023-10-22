import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import { AuthProvider } from './utils/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>

        <Route path='/login' element={<LoginPage/>}  />
        <Route path='/register' element={<RegisterPage/>}  />

        <Route element={<PrivateRoutes/>}>
          <Route path='/' element={<Dashboard/>} />
        </Route>

      </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
