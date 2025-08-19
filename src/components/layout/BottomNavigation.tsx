import React from 'react'
import { cn } from '../../utils/cn'
import formsSelectedIcon from '../../assets/formsselectedicon.svg'
import formsUnselectedIcon from '../../assets/formsunselectedicon.svg'
import jobsSelectedIcon from '../../assets/jobsselectedicon.svg'
import jobsUnselectedIcon from '../../assets/jobsunselectedicon.svg'
import companySelectedIcon from '../../assets/companyselectedicon.svg'
import companyUnselectedIcon from '../../assets/companyunselectedicon.svg'
import settingsSelectedIcon from '../../assets/settingsselectedicon.svg'
import settingsUnselectedIcon from '../../assets/settingsunselectedicon.svg'

interface BottomNavigationProps {
  activeTab?: string
  onTabChange?: (tabId: string) => void
  className?: string
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab = 'forms',
  onTabChange,
  className,
}) => {
  const tabs = [
    {
      id: 'forms',
      label: 'Forms',
      selectedIcon: formsSelectedIcon,
      unselectedIcon: formsUnselectedIcon,
    },
    {
      id: 'jobs',
      label: 'Jobs',
      selectedIcon: jobsSelectedIcon,
      unselectedIcon: jobsUnselectedIcon,
    },
    {
      id: 'company',
      label: 'Company',
      selectedIcon: companySelectedIcon,
      unselectedIcon: companyUnselectedIcon,
    },
    {
      id: 'settings',
      label: 'Settings',
      selectedIcon: settingsSelectedIcon,
      unselectedIcon: settingsUnselectedIcon,
    },
  ]

  return (
    <div className={cn('bg-white border-t border-[#eaecf0]', className)}>
      <div className="flex items-center justify-between px-3 py-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className="flex flex-col items-center gap-1 flex-1"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <img 
                src={activeTab === tab.id ? tab.selectedIcon : tab.unselectedIcon}
                alt={tab.label}
                className="w-6 h-6 object-contain"
              />
            </div>
            <span
              className={cn(
                'text-xs leading-4',
                activeTab === tab.id
                  ? 'text-[#2a6c7e] font-semibold'
                  : 'text-[#98a2b3] font-medium'
              )}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default BottomNavigation 