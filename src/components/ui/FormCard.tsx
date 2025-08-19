import React from 'react'
import { cn } from '../../utils/cn'
import arrowIcon from '../../assets/arrowicon.svg'

interface FormCardProps {
  name: string
  icon: string
  onClick?: () => void
  className?: string
}

const FormCard: React.FC<FormCardProps> = ({
  name,
  icon,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-white rounded-2xl p-4 flex items-center gap-2.5 w-full hover:bg-gray-50 transition-colors',
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
        <h3 className="font-medium text-[#101828] text-base leading-6">
          {name}
        </h3>
      </div>
      
      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
        <img src={arrowIcon} alt="Arrow" className="w-full h-full" />
      </div>
    </button>
  )
}

export default FormCard 