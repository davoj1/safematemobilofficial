import React from 'react'
import { cn } from '../../utils/cn'

interface TabNavigationProps {
  tabs: Array<{
    id: string
    label: string
  }>
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}) => {
  return (
    <div className={cn('flex gap-3 w-full', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex-1 h-8 flex items-center justify-center pb-3 pt-0 px-1 relative transition-colors',
            activeTab === tab.id
              ? 'text-[#1e4d59] font-semibold border-b-2 border-[#266273]'
              : 'text-[#667085] font-medium'
          )}
        >
          <span className="text-sm leading-5">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

export default TabNavigation 