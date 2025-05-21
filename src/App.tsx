import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import About from './pages/About'
import LoginSection from './components/LoginSection'
import RegisterForm from './components/RegisterForm'
import FindPasswordForm from './components/FindPasswordForm'

function App() {
  // 임시 테스트용 회원가입 요청 (초기 렌더링 시 1회 실행)
  useEffect(() => {
    fetch('http://13.124.190.188:8081/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: '홍길동',
        username: 'testuser01',
        password: 'Test@1234',
        email: 'test@example.com',
        nickname: 'tester',
        phoneNumber: '01012345678',
        account: '110123456789',
        accountHolder: '홍길동',
        bank: 'KB',
        role: 'USER'
      })
    })
      .then(res => res.json())
      .then(data => console.log('백엔드 응답:', data))
      .catch(err => console.error('에러:', err))
  }, [])

  // 상태 관리
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showRegister, setShowRegister] = useState(false)

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
                />
              )}
              {/* <div style={{ marginTop: '10px' }}>
                {!showRegister && (
                  <Link to="/find-password">
                    <button>비밀번호 찾기</button>
                  </Link>
                )}
              </div> */}
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