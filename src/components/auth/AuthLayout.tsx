import React from 'react'
import { cn } from '../../utils/cn'
import logo from '../../assets/logo.svg'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  showLogo?: boolean
  className?: string
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showLogo = true,
  className,
}) => {
  return (
    <div className="bg-white overflow-hidden relative w-full min-h-screen">
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex flex-col justify-center px-4 py-8 max-w-sm mx-auto w-full">
          
          {/* Logo */}
          {showLogo && (
            <div className="flex justify-center mb-8">
              <img
                src={logo}
                alt="SafeMate"
                className="h-10 w-auto"
              />
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-bold text-[#182230] text-2xl leading-tight mb-3">
              {title}
            </h1>
            {subtitle && (
              <p className="font-normal text-[#667085] text-sm leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Content */}
          <div className={cn('space-y-6', className)}>
            {children}
          </div>
        </div>

        {/* Home Indicator */}
        <div className="flex justify-center pb-2">
          <div className="bg-black h-1 rounded-full w-32 opacity-60" />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout