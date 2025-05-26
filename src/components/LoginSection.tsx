"use client"

import type { ChangeEvent } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./LoginSection.css"

interface LoginSectionProps {
  username: string
  password: string
  handleUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleLogin: () => void
  handleOpenRegister: () => void
  onClose?: () => void
  onLoginSuccess: (name: string) => void
}

function LoginSection({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  handleOpenRegister,
  onLoginSuccess,
}: LoginSectionProps) {
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleClick = async () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("아이디와 비밀번호를 모두 입력해주세요.")
      return
    }

    try {
      const res = await axios.post("http://13.124.190.188:8081/api/auth/login", {
        username,
        password,
      })
      console.log("로그인 성공:", res.data)
      alert("로그인 성공!")
      setError("")
      handleLogin()
      onLoginSuccess(username)
    } catch (err) {
      console.error("로그인 실패:", err)
      setError("아이디 또는 비밀번호가 올바르지 않습니다.")
    }
  }

  const handleFindPassword = () => {
    navigate("/find-password")
  }

  return (
    <div className="login-section">
      <h2>로그인</h2>

      <div className="login-field">
        <input type="text" name="username" placeholder="아이디" value={username} onChange={handleUsernameChange} />
      </div>

      <div className="login-field">
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="button" className="password-toggle" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? "숨기기" : "보기"}
          </button>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="login-buttons">
        <button className="login-button" onClick={handleClick}>
          로그인
        </button>
        <button className="register-button" onClick={handleOpenRegister}>
          회원가입
        </button>
      </div>

      <div className="login-links">
        <button className="find-password-link" onClick={handleFindPassword}>
          비밀번호 찾기
        </button>
      </div>
    </div>
  )
}

export default LoginSection
