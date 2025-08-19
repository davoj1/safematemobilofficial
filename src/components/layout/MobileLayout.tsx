import React from 'react'
import { cn } from '../../utils/cn'
import type { MobileComponentProps } from '../../types'

interface MobileLayoutProps extends MobileComponentProps {
  header?: React.ReactNode
  footer?: React.ReactNode
  padding?: boolean
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  header,
  footer,
  safeArea = true,
  padding = true,
  className,
}) => {
  return (
    <div className={cn(
      'min-h-screen flex flex-col bg-white',
      safeArea && 'safe-area',
      className
    )}>
      {header && (
        <header className="flex-shrink-0 bg-white border-b border-gray-200">
          {header}
        </header>
      )}
      
      <main className={cn(
        'flex-1 overflow-y-auto',
        padding && 'px-4 py-6'
      )}>
        {children}
      </main>
      
      {footer && (
        <footer className="flex-shrink-0 bg-white border-t border-gray-200">
          {footer}
        </footer>
      )}
    </div>
  )
}

export default MobileLayout