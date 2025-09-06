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
            <svg className="w-5 h-5 text-[#667085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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