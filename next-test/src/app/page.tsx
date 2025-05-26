'use client'

import { useState } from "react"

export default function Home() {
  const [name, setName ] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    const res = await fetch('/api/echo', {
      method: 'POST',
      headers: { 'Context-Type': 'application/json' },
      body: JSON.stringify({ name })
    })

    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <div>
      <input
      value={name}
      onChange={e => setName(e.target.value)}
      placeholder="이름 입력"
      />
      <button onClick={handleSubmit}>서버에 보내기</button>
      <p>{message}</p>
    </div>
  )
}