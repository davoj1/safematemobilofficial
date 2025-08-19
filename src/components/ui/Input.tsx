import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, fullWidth = true, className, ...props }, ref) => {
    return (
      <div className={cn('space-y-1', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="text-gray-400">{icon}</div>
            </div>
          )}
          
          <input
            ref={ref}
            className={cn(
              'input',
              icon && 'pl-10',
              error && 'border-danger-500 focus:ring-danger-500',
              className
            )}
            {...props}
          />
        </div>
        
        {error && (
          <p className="text-sm text-danger-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input