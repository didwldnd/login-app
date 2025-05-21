import type { ChangeEvent } from 'react'
import { useState } from 'react'
import axios from 'axios'

interface RegisterFormProps {
  onClose: () => void
}

function RegisterForm({ onClose }: RegisterFormProps) {
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    nickname: '',
    phoneNumber: '',
    account: '',
    accountHolder: '',
    bank: 'KB',
    role: 'USER'
  })

  const [errors, setErrors] = useState<{ [key: string]: string}>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}

    if (form.name.trim() === '') newErrors.name = '이름은 필수입니다.'
    if (!/^[a-zA-Z0-9]{4,20}$/.test(form.username)) newErrors.username = '아이디는 4~20자, 영문+숫자 조합입니다.'
    if (!/^(?=.*[a-zA-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,16}$/.test(form.password)) {
      newErrors.password = '비밀번호는 8~16자, 영문+특수문자 포함입니다.'
    }
    if (
      form.password && form.confirmPassword &&
      form.password !== form.confirmPassword
      ) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = '이메일 형식이 올바르지 않습니다.'
    if (form.nickname.trim() === '') newErrors.nickname = '닉네임은 필수입니다.'
    if (!/^\d{10,11}$/.test(form.phoneNumber)) newErrors.phoneNumber = '전화번호는 숫자 10~11자리여야 합니다.'
    if (!/^\d{10,}$/.test(form.account)) newErrors.account = '계좌번호는 최소 10자리 숫자입니다.'
    if (form.accountHolder.trim() === '') newErrors.accountHolder = '예금주는 필수입니다.'
    

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async () => {
    if (!validate()) return

    try {
      const res = await axios.post('http://13.124.190.188:8081/api/user/register', form)
      console.log(res.data)
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
      {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

      <input name="username" placeholder="아이디" value={form.username} onChange={handleChange} />
      {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}

      <input type="password" name="password" placeholder="비밀번호" value={form.password} onChange={handleChange} />
      {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

      <input type="password" name="confirmPassword" placeholder='비밀번호 확인' value={form.confirmPassword} onChange={handleChange} />
      {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}

      <input name="email" placeholder="이메일" value={form.email} onChange={handleChange} />
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

      <input name="nickname" placeholder="닉네임" value={form.nickname} onChange={handleChange} />
      {errors.nickname && <p style={{ color: 'red' }}>{errors.nickname}</p>}

      <input name="phoneNumber" placeholder="전화번호" value={form.phoneNumber} onChange={handleChange} />
      {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}

      <input name="account" placeholder="계좌번호" value={form.account} onChange={handleChange} />
      {errors.account && <p style={{ color: 'red' }}>{errors.account}</p>}

      <input name="accountHolder" placeholder="예금주" value={form.accountHolder} onChange={handleChange} />
      {errors.accountHolder && <p style={{ color: 'red' }}>{errors.accountHolder}</p>}

      <select name="bank" value={form.bank} onChange={handleChange}>
        <option value="KB">KB국민</option>
        <option value="NH">NH농협</option>
        <option value="KAKAO">카카오뱅크</option>
        <option value="TOSS">토스뱅크</option>
        <option value="SHINHAN">신한은행</option>
      </select>

      <br />
      <button onClick={handleRegister}>회원가입</button>
      <button onClick={onClose}>취소</button>
    </div>
  )
}

export default RegisterForm
