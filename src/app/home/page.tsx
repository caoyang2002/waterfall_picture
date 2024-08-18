'use client'

import { useState, useEffect } from 'react'
import Waterfall from '@/app/components/Waterfall'

export default function Home() {
  const [files, setFiles] = useState([])

  useEffect(() => {
    fetch('/api/getFiles')
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((error) => console.error('Error fetching files:', error))
  }, [])

  return (
    <div>
      <h1>2024-08-18 图片</h1>
      <Waterfall items={files} />
    </div>
  )
}
