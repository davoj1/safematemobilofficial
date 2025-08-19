import React from 'react'
import { cn } from '../../utils/cn'

interface HeaderProps {
  title?: string
  leftAction?: React.ReactNode
  rightAction?: React.ReactNode
  className?: string
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftAction,
  rightAction,
  className,
}) => {
  return (
    <div className={cn(
      'flex items-center justify-between px-4 py-3 min-h-[56px]',
      className
    )}>
      <div className="flex items-center">
        {leftAction}
      </div>
      
      {title && (
        <h1 className="text-lg font-semibold text-gray-900 truncate px-4">
          {title}
        </h1>
      )}
      
      <div className="flex items-center">
        {rightAction}
      </div>
    </div>
  )
}

export default Header