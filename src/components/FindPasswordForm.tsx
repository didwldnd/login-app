import type { ChangeEvent } from "react";
import { useState } from "react";
import axios from 'axios'

function FindPasswordForm() {
    const [form, setForm] = useState({
        name: '',
        username: '',
        email: ''
    })

    const [message, setMessage] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleFindPassword = async () => {
        if (!form.name || !form.username || !form.email) {
            setMessage('모든 항목을 입력해주세요.')
            return
        }

        try {
            await axios.post('http://13.124.190.188:8081/api/user/find-password', form)
            setMessage('임시 비밀번호가 이메일로 전송되었습니다.')
        } catch (err) {
            console.error('비밀번호 찾기 실패:', err)
            setMessage('정보가 일치하지 않거나 서버 오류가 발생했습니다.')
        }
    }

    return (
        <div>
            <h2>비밀번호 찾기</h2>

            <input name="name" placeholder="이름" value={form.name} onChange={handleChange}/>
            <input name="username" placeholder="아이디" value={form.username} onChange={handleChange}/>
            <input name="email" placeholder="이메일" value={form.email} onChange={handleChange}/>

            <button onClick={handleFindPassword}>비밀번호 찾기</button>
            {message && <p>{message}</p>}
        </div>
    )
}

export default FindPasswordForm