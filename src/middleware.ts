import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/') {
    const authCookie = req.cookies.get('authToken')
    if (!authCookie) {
      console.log('[INFO] 没有 cookie，重定向到 /login')
      // 如果没有认证 cookie，重定向到登录页面
      return NextResponse.redirect(new URL('/login', req.url))
    }
    console.log('[INFO] 有 cookie，继续请求')
  }
  // 如果有认证 cookie，继续请求
  return NextResponse.next()
}

export const config = {
  matcher: '/',
}
