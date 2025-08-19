import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  fullWidth?: boolean
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, icon, fullWidth = true, className, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-[#182230]">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="text-[#667085]">{icon}</div>
            </div>
          )}
          
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-3.5 border rounded-xl text-base',
              'placeholder:text-[#667085] text-[#182230]',
              'focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent',
              'transition-all duration-200',
              error 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-[#D0D5DD] hover:border-[#266273]',
              icon && 'pl-10',
              className
            )}
            {...props}
          />
        </div>
        
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

AuthInput.displayName = 'AuthInput'

export default AuthInput