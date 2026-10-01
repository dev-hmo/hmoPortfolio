import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import CustomCursor from '@/components/CustomCursor'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/ThemeProvider'
import { LanguageProvider } from '@/context/LanguageContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-display' })

export const metadata: Metadata = {
  title: 'Hlaing Min Oo | Junior Software Tester & Frontend Enthusiast',
  description: 'Portfolio of Hlaing Min Oo, Junior Software Tester & Frontend Developer specializing in manual QA testing, UAT execution, bug tracking in Jira, and React/Next.js web debugging.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <CustomCursor />
            <Navbar />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
