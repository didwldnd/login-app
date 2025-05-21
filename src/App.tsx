import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import About from './pages/About'
import LoginSection from './components/LoginSection'
import RegisterForm from './components/RegisterForm'
import FindPasswordForm from './components/FindPasswordForm'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showRegister, setShowRegister] = useState(false)
  // const [userName, setUserName] = useState<string | null>(null) // ✅ 로그인 사용자 이름 저장

  const handleLogin = () => {
    console.log('로그인 요청:', { username, password })
  }

  return (
    <Router>
      <nav style={{ padding: '10px', borderBottom: '1px solid gray' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/about" style={{ marginRight: '10px' }}>About</Link>
        <Link to="/find-password">비밀번호 찾기</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              {showRegister ? (
                <RegisterForm onClose={() => setShowRegister(false)} />
              ) : (
                <LoginSection
                  username={username}
                  password={password}
                  handleUsernameChange={(e) => setUsername(e.target.value)}
                  handlePasswordChange={(e) => setPassword(e.target.value)}
                  handleLogin={handleLogin}
                  handleOpenRegister={() => setShowRegister(true)}
                  // onLoginSuccess={(name) => setUserName(name)} // ✅ 이름 전달 받음
                />
              )}
            </div>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/find-password" element={<FindPasswordForm />} />
      </Routes>
    </Router>
  )
}

export default App