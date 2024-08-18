import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const directory = path.join(process.cwd(), 'public', 'images')
  const files = fs.readdirSync(directory)

  const fileData = files.map((file) => ({
    name: file,
    path: `/images/${file}`,
    type: path.extname(file).slice(1),
  }))

  return NextResponse.json(fileData)
}
