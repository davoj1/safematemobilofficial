import React from 'react'
import { cn } from '../../utils/cn'

interface CompanyCardProps {
  name: string
  logo: string
  onClick?: () => void
  className?: string
  status?: string
  role?: string
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  logo,
  onClick,
  className,
  status,
  role,
}) => {
  const isPending = status?.toLowerCase() === 'pending'
  
  return (
    <button
      onClick={onClick}
      disabled={isPending}
      className={cn(
        `w-full bg-white rounded-[20px] border border-[#eaecf0] p-4 flex items-center gap-3 transition-all duration-200 ${
          isPending 
            ? 'opacity-40 cursor-not-allowed' 
            : 'hover:border-[#266273] hover:shadow-sm'
        }`,
        className
      )}
    >
      {/* Company Logo */}
      <div className="w-11 h-11 bg-white rounded-[10px] border border-[#eaecf0] flex items-center justify-center p-[5.5px] flex-shrink-0">
        <img
          src={logo}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Company Info */}
      <div className="flex-1 flex flex-col items-start justify-center text-left">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-[#101828] text-base leading-6">
            {name}
          </span>
          {isPending && (
            <div className="bg-[#f2f4f7] border border-[#eaf0f2] rounded-full px-2 py-[3px]">
              <span className="font-medium text-[#667085] text-xs leading-[18px]">
                Pending
              </span>
            </div>
          )}
        </div>
        {role && (
          <span className="font-normal text-[#667085] text-sm leading-5">
            {role}
          </span>
        )}
      </div>

      {/* Arrow Icon */}
      <div className="w-6 h-6 flex items-center justify-center">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="text-[#709da9]"
        >
          <path 
            d="M9 18L15 12L9 6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  )
}

export default CompanyCard 