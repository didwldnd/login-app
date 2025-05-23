import type React from "react"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"
import About from "./pages/About"
import LoginSection from "./components/LoginSection"
import RegisterForm from "./components/RegisterForm"
import FindPasswordForm from "./components/FindPasswordForm"
import "./LoggedInView.css"
import "./AppLayout.css"

// NavLink 컴포넌트 - 현재 경로에 따라 active 클래스 추가
function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link to={to} className={`nav-link ${isActive ? "active" : ""}`}>
      {children}
    </Link>
  )
}

// NavBar 컴포넌트
function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Title
        </Link>
        <div className="navbar-links">
          <NavLink to="/">홈</NavLink>
          <NavLink to="/about">소개</NavLink>
          <NavLink to="/find-password">비밀번호 찾기</NavLink>
        </div>
      </div>
    </nav>
  )
}

function App() {
  const [username, setUsername] = useState("") // 이용자의 ID (입력값)
  const [password, setPassword] = useState("")
  const [showRegister, setShowRegister] = useState(false)
  const [userName, setUserName] = useState<string | null>(null) // 이용자의 이름 (서버에서 받음)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // 로그인 여부

  const handleLogin = () => {
    console.log("로그인 요청:", { username, password })
  }

  const handleLogout = () => {
    setUserName(null)
    setIsLoggedIn(false)
    setUsername("")
    setPassword("")
  }

  const renderHomeContent = () => {
    if (isLoggedIn) {
      return (
        <div className="logged-in-container">
          <p className="welcome-message">
            <span className="user-name">{userName}</span>님 반갑습니다!
          </p>
          <button className="logout-button" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      )
    }

    if (showRegister) {
      return <RegisterForm onClose={() => setShowRegister(false)} />
    }

    return (
      <LoginSection
        username={username}
        password={password}
        handleUsernameChange={(e) => setUsername(e.target.value)}
        handlePasswordChange={(e) => setPassword(e.target.value)}
        handleLogin={handleLogin}
        handleOpenRegister={() => setShowRegister(true)}
        onLoginSuccess={(name) => {
          setUserName(name)
          setIsLoggedIn(true)
        }}
      />
    )
  }

  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={renderHomeContent()} />
            <Route path="/about" element={<About />} />
            <Route path="/find-password" element={<FindPasswordForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
