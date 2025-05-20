import { ChangeEvent, useState } from 'react'
import axios from 'axios'

interface RegisterFormProps {
  onClose: () => void
}

function RegisterForm({ onClose }: RegisterFormProps) {
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    nickname: '',
    phoneNumber: '',
    account: '',
    accountHolder: '',
    bank: 'KB',     // 기본값 지정
    role: 'USER'    // 기본 USER 고정
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://13.124.190.188:8081/api/user/register', form)
      alert('회원가입 성공!')
      onClose()
    } catch (err) {
      console.error('회원가입 실패:', err)
      alert('회원가입 실패!')
    }
  }

  return (
    <div>
      <h2>회원가입</h2>

      <input name="name" placeholder="이름" value={form.name} onChange={handleChange} />
      <input name="username" placeholder="아이디" value={form.username} onChange={handleChange} />
      <input type="password" name="password" placeholder="비밀번호" value={form.password} onChange={handleChange} />
      <input name="email" placeholder="이메일" value={form.email} onChange={handleChange} />
      <input name="nickname" placeholder="닉네임" value={form.nickname} onChange={handleChange} />
      <input name="phoneNumber" placeholder="전화번호" value={form.phoneNumber} onChange={handleChange} />
      <input name="account" placeholder="계좌번호" value={form.account} onChange={handleChange} />
      <input name="accountHolder" placeholder="예금주" value={form.accountHolder} onChange={handleChange} />

      {/* 은행 enum 선택 */}
      <select name="bank" value={form.bank} onChange={handleChange}>
        <option value="KB">KB국민</option>
        <option value="NH">NH농협</option>
        <option value="KAKAO">카카오뱅크</option>
        <option value="TOSS">토스뱅크</option>
        <option value="SHINHAN">신한은행</option>
      </select>

      <button onClick={handleRegister}>회원가입</button>
      <button onClick={onClose}>취소</button>
    </div>
  )
}

export default RegisterForm
