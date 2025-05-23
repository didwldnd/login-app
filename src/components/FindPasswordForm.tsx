import type { ChangeEvent } from "react"
import { useState } from "react"
import axios from "axios"
import "./FindPasswordForm.css"

function FindPasswordForm() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
  })

  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFindPassword = async () => {
    if (!form.name || !form.username || !form.email) {
      setMessage("모든 항목을 입력해주세요.")
      setIsSuccess(false)
      return
    }

    try {
      await axios.post("/api/user/find-password", form)
      setMessage("임시 비밀번호가 이메일로 전송되었습니다.")
      setIsSuccess(true)
    } catch (err) {
      console.error("비밀번호 찾기 실패:", err)
      setMessage("정보가 일치하지 않거나 서버 오류가 발생했습니다.")
      setIsSuccess(false)
    }
  }

  return (
    <div className="find-password-form">
      <h2>비밀번호 찾기</h2>

      <div className="form-input">
        <input name="name" placeholder="이름" value={form.name} onChange={handleChange} />
      </div>

      <div className="form-input">
        <input name="username" placeholder="아이디" value={form.username} onChange={handleChange} />
      </div>

      <div className="form-input">
        <input name="email" placeholder="이메일" value={form.email} onChange={handleChange} />
      </div>

      <button className="find-button" onClick={handleFindPassword}>
        비밀번호 찾기
      </button>
            
      {message && <p className={`message ${isSuccess ? "success-message" : "error-message"}`}>{message}</p>}
    </div>
  )
}

export default FindPasswordForm

// 임시 비밀번호 받은 후 비밀번호 재설정 기능능