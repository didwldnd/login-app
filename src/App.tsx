import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import LoginSection from './components/LoginSection'
import RegisterForm from './components/RegisterForm'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showRegister, setShowRegister] = useState(false)

  const handleLogin = () => {
    // 로그인 로직 구현 예정
    console.log('로그인 요청:', { username, password })
  }

  return (
    <Router>
      <nav style={{ padding: '10px', borderBottom: '1px solid gray' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            showRegister ? (
              <RegisterForm onClose={() => setShowRegister(false)} />
            ) : (
              <LoginSection
                username={username}
                password={password}
                handleUsernameChange={(e) => setUsername(e.target.value)}
                handlePasswordChange={(e) => setPassword(e.target.value)}
                handleLogin={handleLogin}
                handleOpenRegister={() => setShowRegister(true)}
              />
            )
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
