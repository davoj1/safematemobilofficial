import React from 'react'
import { cn } from '../../utils/cn'

interface SelectedSiteDisplayProps {
  name: string
  location: string
  image: string
  onEdit?: () => void
  className?: string
}

const SelectedSiteDisplay: React.FC<SelectedSiteDisplayProps> = ({
  name,
  location,
  image,
  onEdit,
  className,
}) => {
  return (
    <div className={cn('space-y-1.5', className)}>
      <h2 className="font-semibold text-[#475467] text-base leading-6">
        Your Site
      </h2>
      
      <div className="flex items-center gap-3 py-2">
        <div className="w-[54px] h-[54px] rounded-[6.894px] overflow-hidden flex-shrink-0">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-[#101828] text-base leading-6">
            {name}
          </h3>
          <p className="font-normal text-[#667085] text-sm leading-5">
            {location}
          </p>
        </div>
        
        <button
          onClick={onEdit}
          className="font-semibold text-[#2a6c7e] text-sm leading-5 hover:text-[#1e4d59] transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  )
}

export default SelectedSiteDisplay 