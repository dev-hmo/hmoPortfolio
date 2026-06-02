import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import CustomCursor from '@/components/CustomCursor'
import MagneticElement from '@/components/MagneticElement'
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
        {/* Navigation Bar */}
        <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, padding: '20px 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <MagneticElement>
              <a href="#hero" style={{ textDecoration: 'none' }}>
                <h2 className="text-gradient" style={{ fontSize: '1.8rem', margin: 0, fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '2px' }}>&lt;HMO /&gt;</h2>
              </a>
            </MagneticElement>
            <div className="glass" style={{ padding: '10px 24px', display: 'flex', gap: '24px', borderRadius: '30px' }}>
              <a href="#about" style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>About</a>
              <a href="#experience" style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>Experience</a>
              <a href="#skills" style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>Skills</a>
              <a href="#work" style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>Work</a>
              <a href="#contact" style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>Contact</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
