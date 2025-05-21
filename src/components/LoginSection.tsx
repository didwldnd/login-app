import type { ChangeEvent } from 'react'
import { useState } from 'react'
import axios from 'axios'

interface LoginSectionProps {
  username: string
  password: string
  handleUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleLogin: () => void
  handleOpenRegister: () => void
  // onLoginSuccess: (name: string) => void
  onClose?: () => void
}

function LoginSection({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  handleOpenRegister,
  // onLoginSuccess
}: LoginSectionProps) {
  const [error, setError] = useState('')

  const handleClick = async () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('아이디와 비밀번호를 모두 입력해주세요.')
      return
    }

    try {
      const res = await axios.post('http://13.124.190.188:8081/api/auth/login', {
        username,
        password
      })
      console.log('로그인 성공:', res.data)
      alert('로그인 성공!')
      setError('')
      handleLogin()
      // onLoginSuccess(res.data.name) // ✅ 이름 상위 컴포넌트로 전달
    } catch (err) {
      console.error('로그인 실패:', err)
      setError('아이디 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  return (
    <div>
      <h2>로그인</h2>

      <input
        type="text"
        name="username"
        placeholder="아이디"
        value={username}
        onChange={handleUsernameChange}
      />

      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={password}
        onChange={handlePasswordChange}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleClick}>로그인</button>
      <button onClick={handleOpenRegister}>회원가입</button>
    </div>
  )
}

export default LoginSection