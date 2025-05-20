import { ChangeEvent } from 'react'

interface LoginSectionProps {
  username: string
  password: string
  handleUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleLogin: () => void
  handleOpenRegister: () => void
  toggleTheme: () => void
}

function LoginSection({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  handleOpenRegister,
  toggleTheme,
}: LoginSectionProps) {
  return (
    <div>
      <h1>로그인</h1>

      <div>
        <label>아이디: </label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>

      <div>
        <label>비밀번호: </label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>

      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleOpenRegister}>회원가입</button>
      <button onClick={toggleTheme}>
      </button>

      <hr />
    </div>
  )
}

export default LoginSection
