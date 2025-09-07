import React from 'react'
import { cn } from '../../utils/cn'
import arrowIcon from '../../assets/arrowicon.svg'

interface FormCardProps {
  name: string
  icon: string
  onClick?: () => void
  className?: string
  status?: 'active' | 'coming-soon' | 'unavailable'
  disabled?: boolean
  note?: string
}

const FormCard: React.FC<FormCardProps> = ({
  name,
  icon,
  onClick,
  className,
  status = 'active',
  disabled = false,
  note,
}) => {
  const isComingSoon = status === 'coming-soon'
  const isUnavailable = status === 'unavailable'
  const isDisabled = disabled || isComingSoon || isUnavailable
  
  return (
    <div className="space-y-2">
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={cn(
          'bg-white rounded-2xl p-4 flex items-center gap-2.5 w-full transition-colors',
          isDisabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-50',
          className
        )}
      >
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
          <img 
            src={icon} 
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="flex-1 text-left">
          <div className="flex items-center gap-1.5">
            <h3 className="font-medium text-[#101828] text-base leading-6">
              {name}
            </h3>
            {isComingSoon && (
              <span className="bg-[#fef3c7] text-[#d97706] text-xs font-medium px-2 py-0.5 rounded-full">
                Coming soon
              </span>
            )}
            {isUnavailable && (
              <span className="bg-[#f3f4f6] text-[#6b7280] text-xs font-medium px-2 py-0.5 rounded-full">
                Unavailable
              </span>
            )}
          </div>
        </div>
        
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
          <img src={arrowIcon} alt="Arrow" className="w-full h-full" />
        </div>
      </button>
      
      {isUnavailable && note && (
        <p className="text-xs text-gray-500 px-4 italic">
          {note}
        </p>
      )}
    </div>
  )
}

export default FormCard 