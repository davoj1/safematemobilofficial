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
    <div className={cn('bg-[#fef3f2] border border-[#f04438] rounded-xl px-3 py-2', className)}>
      <p className="font-medium text-[#d92d20] text-sm leading-5 text-center">
        {message}
      </p>
    </div>
  )
}

export default WarningMessage 