// pages/api/verify-password.ts
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { password } = req.body
      const isValid = password === '12345' // 假设这里是您的密码验证逻辑
      res.status(200).json({ success: isValid })
    } catch (error) {
      console.error('请求处理错误:', error)
      res.status(500).json({ success: false })
    }
  } else {
    res.status(405).json({ message: '仅允许 POST 方法' })
  }
}
