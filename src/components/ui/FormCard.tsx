import React from 'react'
import { cn } from '../../utils/cn'
import arrowIcon from '../../assets/arrowicon.svg'

interface FormCardProps {
  name: string
  icon: string
  onClick?: () => void
  className?: string
  status?: 'active' | 'coming-soon'
  disabled?: boolean
}

const FormCard: React.FC<FormCardProps> = ({
  name,
  icon,
  onClick,
  className,
  status = 'active',
  disabled = false,
}) => {
  const isComingSoon = status === 'coming-soon'
  return (
    <button
      onClick={onClick}
      disabled={disabled || isComingSoon}
      className={cn(
        'bg-white rounded-2xl p-4 flex items-center gap-2.5 w-full transition-colors',
        (disabled || isComingSoon) ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-50',
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
        </div>
      </div>
      
      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
        <img src={arrowIcon} alt="Arrow" className="w-full h-full" />
      </div>
    </button>
  )
}

export default FormCard 