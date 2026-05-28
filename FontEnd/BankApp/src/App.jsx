import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar' 
import Home from './pages/Home' 
import CustomerList from './pages/CustomerList' 
import CustomerDetails from './pages/CustomerDetails' 
import AccountDetails from './pages/AccountDetails' 
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-green-100 flex flex-col">
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customer-list" element={<CustomerList />} />
            <Route path="/customer-details" element={<CustomerDetails />} />
            <Route path="/account-details" element={<AccountDetails />} />
          </Routes>
      </div>
    </Router>
  )
}

export default App