import React from 'react'
import { cn } from '../../utils/cn'

interface HeaderWithCloseProps {
  title: string
  progress?: string
  onClose?: () => void
  className?: string
}

const HeaderWithClose: React.FC<HeaderWithCloseProps> = ({
  title,
  progress,
  onClose,
  className,
}) => {
  return (
    <div className={cn('bg-[#f8f7f2] border-b border-[#eaecf0]', className)}>
      <div className="px-4 py-5 flex items-center justify-between">
        <div className="w-6 h-6 flex items-center justify-center">
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="flex-1 flex justify-center">
          <h1 className="font-semibold text-[#000000] text-base leading-6">
            {title}
          </h1>
        </div>
        
        <div className="w-6 h-6 flex items-center justify-center">
          {progress && (
            <div className="font-semibold text-[#2a6c7e] text-sm leading-5">
              {progress}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeaderWithClose 