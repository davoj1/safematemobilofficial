import React from 'react'
import { cn } from '../../utils/cn'

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'disabled'
  size?: 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  children: React.ReactNode
}

const AuthButton: React.FC<AuthButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  fullWidth = true,
  loading = false,
  className,
  disabled,
  children,
  ...props
}) => {
  const baseClasses = 'font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-[#266273] text-white border border-[#266273] hover:bg-[#1e4d59] focus:ring-[#266273] disabled:bg-gray-400 disabled:border-gray-400',
    secondary: 'bg-white text-[#1e4d59] border border-[#2a6c7e] hover:bg-gray-50 focus:ring-[#266273] disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300',
    outline: 'bg-transparent text-[#266273] border border-[#266273] hover:bg-[#266273] hover:text-white focus:ring-[#266273] disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300',
    disabled: 'bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed'
  }

  const sizeClasses = {
    md: 'px-4 py-3 text-base rounded-xl',
    lg: 'px-6 py-3.5 text-base rounded-xl',
  }

  const isDisabled = disabled || loading || variant === 'disabled'

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default AuthButton