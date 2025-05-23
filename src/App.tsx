import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import About from "./pages/About"
import LoginSection from "./components/LoginSection"
import RegisterForm from "./components/RegisterForm"
import FindPasswordForm from "./components/FindPasswordForm"
import NavBar from "./components/NavBar"
import LoggedInView from "./components/LoggedInView"
import "./AppLayout.css"

function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showRegister, setShowRegister] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
    if (isLoggedIn && userName) {
      return <LoggedInView userName={userName} onLogout={handleLogout} />
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
