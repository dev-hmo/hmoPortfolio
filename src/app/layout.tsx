import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import CustomCursor from '@/components/CustomCursor'
import Navbar from '@/components/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-display' })

export const metadata: Metadata = {
  title: 'Hlaing Min Oo | Project Coordinator & Frontend Developer',
  description: 'Portfolio of Hlaing Min Oo, a technically grounded Project Coordinator with a strong background in frontend web development.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
