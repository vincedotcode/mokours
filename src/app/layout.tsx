// src/app/layout.tsx
import './globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/theme-provider'
import ThemeClerkProvider from '@/components/theme-clerk-provider'
import { AuthProvider } from '@/context/auth-content'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeClerkProvider>
            <AuthProvider>
            {children}
            </AuthProvider>
          </ThemeClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
