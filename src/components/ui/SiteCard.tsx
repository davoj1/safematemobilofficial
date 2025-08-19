import React from 'react'
import { cn } from '../../utils/cn'
import pinIcon from '../../assets/pinicon.svg'

interface SiteCardProps {
  name: string
  location: string
  image: string
  onClick?: () => void
  className?: string
}

const SiteCard: React.FC<SiteCardProps> = ({
  name,
  location,
  image,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 p-2 rounded-[20px] w-full hover:bg-gray-50 transition-colors',
        className
      )}
    >
      <div className="w-[54px] h-[54px] rounded-[6.894px] overflow-hidden flex-shrink-0">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 text-left">
        <h3 className="font-semibold text-[#101828] text-base leading-6">
          {name}
        </h3>
        <p className="font-normal text-[#667085] text-sm leading-5">
          {location}
        </p>
      </div>
      
      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
        <img src={pinIcon} alt="Location" className="w-full h-full" />
      </div>
    </button>
  )
}

export default SiteCard 