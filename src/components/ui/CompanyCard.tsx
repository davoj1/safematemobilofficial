import React from 'react'
import { cn } from '../../utils/cn'
import arrowIcon from '../../assets/arrowicon.svg'

interface CompanyCardProps {
  name: string
  logo: string
  onClick?: () => void
  className?: string
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  logo,
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
      <div className="flex items-center justify-center w-9 h-9">
        <img 
          src={logo} 
          alt={`${name} logo`} 
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="flex-1 text-left">
        <h3 className="font-semibold text-[#101828] text-base leading-6">
          {name}
        </h3>
      </div>
      
      <div className="flex items-center justify-center w-6 h-6">
        <img src={arrowIcon} alt="Arrow" className="w-full h-full" />
      </div>
    </button>
  )
}

export default CompanyCard 