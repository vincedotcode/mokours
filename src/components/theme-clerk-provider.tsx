// src/components/ThemeClerkProvider.tsx
'use client'

import { useTheme } from 'next-themes'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function ThemeClerkProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { resolvedTheme } = useTheme()

  // Your brand’s primary orange from the picker
  const primaryColor = 'hsl(24, 64%, 52%)'
  // (or you can drop in the hex: '#D37036')

  const appearance = {
    variables: {
      colorPrimary: primaryColor,
    },
    // only use Clerk’s dark baseTheme when in dark mode
    ...(resolvedTheme === 'dark' ? { baseTheme: dark } : {}),
  }

  return (
    <ClerkProvider appearance={appearance}>
      {children}
    </ClerkProvider>
  )
}
