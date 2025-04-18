// src/context/AuthContext.tsx
'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useUser } from '@clerk/nextjs'

// Define the shape of our auth context
interface AuthContextType {
  isSignedIn: boolean
  userId: string | null
  userEmail: string | null
}

// Create the context with a default (signed out) state
const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  userId: null,
  userEmail: null,
})

// Provider component to wrap your app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isSignedIn: clerkSignedIn, user } = useUser()

  // Coalesce undefined to false for context
  const isSignedIn = clerkSignedIn ?? false

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        userId: user?.id ?? null,
        userEmail: user?.primaryEmailAddress?.emailAddress ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook to access auth state anywhere
export const useAuth = () => useContext(AuthContext)
