import React from 'react'
import { cn } from '../../utils/cn'

interface FormHistoryItemProps {
  title: string
  description: string
  companyName: string
  companyLogo: string
  timestamp: string
  status: 'completed' | 'pending' | 'failed'
  icon: React.ReactNode
  onClick?: () => void
}

const FormHistoryItem: React.FC<FormHistoryItemProps> = ({
  title,
  description,
  companyName,
  companyLogo,
  timestamp,
  status,
  icon,
  onClick
}) => {
  const statusConfig = {
    completed: {
      bgColor: 'bg-[#dcfae6]',
      textColor: 'text-[#17b26a]',
      borderColor: 'border-[#dcfae6]',
      label: 'Completed'
    },
    pending: {
      bgColor: 'bg-[#fef3c7]',
      textColor: 'text-[#d97706]',
      borderColor: 'border-[#fef3c7]',
      label: 'Pending'
    },
    failed: {
      bgColor: 'bg-[#fee2e2]',
      textColor: 'text-[#dc2626]',
      borderColor: 'border-[#fee2e2]',
      label: 'Failed'
    }
  }

  const config = statusConfig[status]

  return (
    <div 
      className="bg-white rounded-3xl p-4 cursor-pointer hover:shadow-sm transition-shadow"
      onClick={onClick}
    >
      <div className="flex gap-2.5 items-start">
        {/* Icon */}
        <div className="bg-[#eaf0f2] p-1 rounded-lg flex-shrink-0">
          <div className="w-6 h-6 text-[#709da9]">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="mb-0.5">
            <h3 className="font-medium text-[#101828] text-base leading-6 truncate">
              {title}
            </h3>
          </div>

          {/* Description */}
          <div className="mb-0.5">
            <p className="font-normal text-[#475467] text-sm leading-5 line-clamp-2">
              {description}
            </p>
          </div>

          {/* Spacer */}
          <div className="h-[3px]" />

          {/* Company */}
          <div className="flex items-center gap-2 mb-0.5">
            <img
              src={companyLogo}
              alt={companyName}
              className="w-6 h-6 object-contain flex-shrink-0"
            />
            <span className="font-medium text-[#101828] text-base leading-6">
              {companyName}
            </span>
          </div>

          {/* Status and Timestamp */}
          <div className="flex items-center justify-between">
            <span className="font-normal text-[#667085] text-sm leading-5">
              {timestamp}
            </span>
            <div className={cn(
              'flex items-center gap-1 px-2 py-[3px] rounded-full border',
              config.bgColor,
              config.borderColor
            )}>
              <span className={cn(
                'font-medium text-xs leading-[18px]',
                config.textColor
              )}>
                {config.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormHistoryItem 