export interface User {
  id: string
  email: string
  fullName?: string
  avatarUrl?: string
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
}

// Common mobile component props
export interface MobileComponentProps {
  className?: string
  children?: React.ReactNode
  safeArea?: boolean
}

// Navigation types
export interface NavigationItem {
  id: string
  label: string
  icon?: React.ComponentType<any>
  path: string
}

export interface BottomNavItem extends NavigationItem {
  badge?: number
}