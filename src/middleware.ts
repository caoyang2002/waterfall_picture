import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
export function middleware(req: NextRequest) {
  // add more process
  return NextResponse.next()
}

export const config = {
  matcher: '/',
}
