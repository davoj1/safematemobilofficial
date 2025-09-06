import React from 'react'
import { cn } from '../../utils/cn'

interface WarningMessageProps {
  message: string
  className?: string
}

const WarningMessage: React.FC<WarningMessageProps> = ({
  message,
  className,
}) => {
  return (
    <div className={cn('bg-[#fff9f5] border border-[#ff4405] rounded-lg p-3', className)}>
      <div className="flex items-start gap-2">
        <svg className="w-5 h-5 text-[#ff4405] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <div>
          <h4 className="font-medium text-[#ff4405] text-sm mb-1">Warning</h4>
          <p className="text-[#ff4405] text-sm leading-5">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default WarningMessage 