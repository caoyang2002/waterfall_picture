'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [password, setPassword] = useState('')
  const router = useRouter()
  // console.log('[INFO] 进入 /login')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const password_json = JSON.stringify({ password })
    console.log('[INFO] 密码 Json: ', password_json)
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: password_json,
    })
    console.log('[INFO] 响应: ', res.body)

    if (res.ok) {
      console.log('[INFO] 重定向到主页')
      router.push('/') // 登录成功，重定向到主页
    } else {
      const errorData = await res
      alert(errorData.statusText) // 显示具体的错误信息
      // alert('错误')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button type="submit">Login</button>
    </form>
  )
}
