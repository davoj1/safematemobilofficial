import React, { createContext, useContext, useEffect, useState } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { auth } from '../services/supabase'
import type { User, AuthState } from '../types'

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string) => Promise<{ error?: string }>
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get initial session
    auth.getCurrentUser().then(({ data: { user } }) => {
      setUser(user ? mapSupabaseUser(user) : null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
      setUser(session?.user ? mapSupabaseUser(session.user) : null)
      setLoading(false)
    })

    return () => subscription?.unsubscribe()
  }, [])

  const mapSupabaseUser = (supabaseUser: SupabaseUser): User => ({
    id: supabaseUser.id,
    email: supabaseUser.email!,
    fullName: supabaseUser.user_metadata?.full_name,
    avatarUrl: supabaseUser.user_metadata?.avatar_url,
  })

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    const { error } = await auth.signUp(email, password)
    setLoading(false)
    if (error) {
      setError(error.message)
      return { error: error.message }
    }
    return {}
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    const { error } = await auth.signIn(email, password)
    setLoading(false)
    if (error) {
      setError(error.message)
      return { error: error.message }
    }
    return {}
  }

  const signOut = async () => {
    setLoading(true)
    await auth.signOut()
    setUser(null)
    setLoading(false)
  }

  const value: AuthContextType = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}