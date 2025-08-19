import React from 'react'
import { cn } from '../../utils/cn'
import searchIcon from '../../assets/searchicon.svg'
import filterIcon from '../../assets/filtericon.svg'

interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onFilterClick?: () => void
  className?: string
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search',
  value = '',
  onChange,
  onFilterClick,
  className,
}) => {
  return (
    <div className={cn('relative w-full', className)}>
      <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#266273] focus-within:ring-1 focus-within:ring-[#266273] transition-colors">
        <div className="flex items-center px-3.5 py-2.5">
          <div className="flex items-center gap-2 flex-1">
            <img src={searchIcon} alt="Search" className="w-5 h-5 text-[#667085]" />
            <input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              className="flex-1 bg-transparent text-[#667085] text-base placeholder-[#667085] focus:outline-none"
            />
          </div>
          <button
            onClick={onFilterClick}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <img src={filterIcon} alt="Filter" className="w-5 h-5 text-[#667085]" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchInput 