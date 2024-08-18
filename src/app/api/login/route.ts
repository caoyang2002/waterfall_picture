// import { NextApiRequest, NextApiResponse } from 'next'
// import crypto from 'crypto'

// const PASSWORD = '12345' // 实际应用中应该使用环境变量
// const SECRET_KEY = 'your-secret-key' // 用于签名 cookie，应该使用环境变量

// export function POST(req: NextApiRequest, res: NextApiResponse) {
//   const { password } = req.body

//   if (password === PASSWORD) {
//     // 创建一个签名的 token
//     const token = crypto
//       .createHmac('sha256', SECRET_KEY)
//       .update(password)
//       .digest('hex')

//     // 设置一个 HTTP-only cookie
//     res.setHeader(
//       'Set-Cookie',
//       `authToken=${token}; Path=/; HttpOnly; SameSite=Strict`
//     )
//     res.status(200).json({ message: 'Login successful' })
//   } else {
//     res.status(401).json({ message: 'Incorrect password' })
//   }
// }

import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import { NextResponse } from 'next/server'
type Data = {
  // code: number
  message: string
}
const PASSWORD = process.env.MY_PASSWORD // 使用环境变量
const SECRET_KEY = process.env.MY_SECRET_KEY! // 使用环境变量

export function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log('[INFO] request: ', req)
  try {
    // if (undefined === req.headers.cookies) {
    //   console.log('[INFO] cookie is null')
    //   return
    // }
    // 检查密码是否正确
    const { password } = req.body
    // console.log('[INFO] request body is ', password)
    // return

    // const password = req.headers.cookies['password' as any]
    console.log('[INFO] password: ', password)

    if (!password) {
      // return res.status(400).json({ message: 'Password is required' })
      console.log('[INFO] password is null')
      return NextResponse.json({ code: 400, message: '请输入密码' })
      // res.status(200).json({ message: '请输入密码' })
    }

    if (password === PASSWORD) {
      const token = crypto
        .createHmac('sha256', SECRET_KEY)
        .update(password)
        .digest('hex')

      res.setHeader(
        'Set-Cookie',
        `authToken=${token}; Path=/; HttpOnly; SameSite=Strict; Secure`
      )
      console.log('[INFO] Login successful')
      return NextResponse.redirect(new URL('/', req.url))
      // res.status(200).json({ message: 'Login successful' })
    } else {
      console.log('[INFO] password is incorrect')
      return NextResponse.json({ code: 401, message: '请输入密码' })
      // res.status(401).json({ message: 'Incorrect password' })
    }
  } catch (error) {
    console.error('Error during login:', error)
    // res.status(500).json({ message: 'Internal server error' })
    // console.log("[INFO] error: ", error)
    return NextResponse.json({ code: 500, message: 'internal server error' })
    // res.status(200).json({ message: 'internal server error' })
  }
}
