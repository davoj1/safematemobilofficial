import React from 'react'
import { cn } from '../../utils/cn'
import backArrowIcon from '../../assets/backarrowicon.svg'

interface HeaderWithBackProps {
  title: string
  progress?: string
  onBack?: () => void
  className?: string
}

const HeaderWithBack: React.FC<HeaderWithBackProps> = ({
  title,
  progress,
  onBack,
  className,
}) => {
  return (
    <div className={cn('bg-[#f8f7f2] border-b border-[#eaecf0]', className)}>
      <div className="px-4 py-5 flex items-center justify-between">
        <div className="w-6 h-6 flex items-center justify-center">
          <button
            onClick={onBack}
            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
          >
            <img src={backArrowIcon} alt="Back" className="w-full h-full" />
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

export default HeaderWithBack 