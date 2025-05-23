import type { ChangeEvent } from 'react'
import { useState } from 'react'
import axios from 'axios'
import './RegisterForm.css'

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

    const validations: { [key: string]: { condition: boolean, message: string } } = {
      name: {
        condition: form.name.trim() === '',
        message: '이름은 필수입니다.'
      },
      username: {
        condition: !/^[a-zA-Z0-9]{4,20}$/.test(form.username),
        message: '아이디는 4~20자, 영문+숫자 조합입니다.'
      },
      password: {
        condition: !/^(?=.*[a-zA-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,16}$/.test(form.password),
        message: '비밀번호는 8~16자, 영문+특수문자 포함입니다.'
      },
      confirmPassword: {
        condition: form.password !== form.confirmPassword,
        message: '비밀번호가 일치하지 않습니다.'
      },
      email: {
        condition: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
        message: '이메일 형식이 올바르지 않습니다.'
      },
      nickname: {
        condition: form.nickname.trim() === '',
        message: '닉네임은 필수입니다.'
      },
      phoneNumber: {
        condition: !/^\d{10,11}$/.test(form.phoneNumber),
        message: '전화번호는 숫자 10~11자리여야 합니다.'
      },
      account: {
        condition: !/^\d{10,}$/.test(form.account),
        message: '계좌번호는 최소 10자리 숫자입니다.'
      },
      accountHolder: {
        condition: form.accountHolder.trim() === '',
        message: '예금주는 필수입니다.'
      }
    }

    for (const key in validations) {
      if(validations[key].condition) {
        newErrors[key] = validations[key].message
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async () => {
    if (!validate()) return

    try {
      const res = await axios.post('/api/user/register', form)
      console.log(res.data)
      alert('회원가입 성공!')
      onClose()
    } catch (err) {
      console.error('회원가입 실패:', err)
      alert('회원가입 실패!')
    }
  }

  type FormField = keyof typeof form

  const fieldLabels: { [K in FormField]?: string } = {
    name: '이름',
    username: '아이디',
    password: '비밀번호',
    confirmPassword: '비밀번호 확인',
    email: '이메일',
    nickname: '닉네임',
    phoneNumber: '전화번호',
    account: '계좌번호',
    accountHolder: '예금주'
  }

  const fields: FormField[] = [
    'name',
    'username',
    'password',
    'confirmPassword',
    'email',
    'nickname',
    'phoneNumber',
    'account',
    'accountHolder'
  ]

  return (
    <form className="register-form">
      <h2>회원가입</h2>

      {fields.map((field) => (
        <div key={field} className="form-field">
          <input
            type={field.toLowerCase().includes('password') ? 'password' : 'text'}
            name={field}
            placeholder={fieldLabels[field] || field}
            value={form[field]}
            onChange={handleChange}
          />
          {errors[field] && <p className="error-message">{errors[field]}</p>}
        </div>
      ))}

      <div className="form-field">
        <select name="bank" value={form.bank} onChange={handleChange}>
          <option value="KB">KB국민</option>
          <option value="NH">NH농협</option>
          <option value="KAKAO">카카오뱅크</option>
          <option value="TOSS">토스뱅크</option>
          <option value="SHINHAN">신한은행</option>
        </select>
      </div>

      <div className="form-buttons">
        <button type="button" onClick={handleRegister}>회원가입</button>
        <button type="button" onClick={onClose}>취소</button>
      </div>
    </form>
  )
}

export default RegisterForm