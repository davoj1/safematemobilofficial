import React from 'react'
import { cn } from '../../utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'light-teal'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  className,
  disabled,
  children,
  ...props
}) => {
  const baseClasses = 'font-medium rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-[#266273] text-white hover:bg-[#1e4d59] focus:ring-[#266273]',
    secondary: 'bg-[#f2f4f7] text-[#98a2b3] hover:bg-[#eaecf0] focus:ring-[#98a2b3]',
    outline: 'border-2 border-[#266273] text-[#266273] hover:bg-[#f8f7f2] focus:ring-[#266273]',
    ghost: 'text-[#266273] hover:bg-[#f8f7f2] focus:ring-[#266273]',
    danger: 'bg-[#dc2626] text-white hover:bg-[#b91c1c] focus:ring-[#dc2626]',
    'light-teal': 'bg-[#eaf0f2] text-[#266273] hover:bg-[#dde8eb] focus:ring-[#266273] border border-[#eaf0f2]',
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-3 text-base min-h-[44px]',
    lg: 'px-6 py-4 text-lg min-h-[52px]',
  }

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
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

export default Button