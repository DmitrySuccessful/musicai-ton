```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MusicAI TON - Создавай хиты с ИИ',
  description: 'Первая ИИ-платформа для создания музыки в Telegram',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
      
        
        {children}
      
    
  )
}
```
