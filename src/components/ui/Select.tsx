import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../../utils/cn'
import arrowIcon from '../../assets/arrowicon.svg'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  options: SelectOption[]
  className?: string
  disabled?: boolean
}

const Select: React.FC<SelectProps> = ({
  placeholder = 'Choose Option',
  value = '',
  onChange,
  options,
  className,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleOptionClick = (optionValue: string) => {
    setSelectedValue(optionValue)
    onChange?.(optionValue)
    setIsOpen(false)
  }

  const selectedOption = options.find(option => option.value === selectedValue)
  const displayText = selectedOption ? selectedOption.label : placeholder

  return (
    <div className={cn('relative w-full', className)} ref={selectRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'w-full bg-white border border-[#d5d7da] rounded-xl px-3.5 py-3 text-[#101828] text-base focus:outline-none focus:border-[#266273] focus:ring-1 focus:ring-[#266273] transition-colors flex items-center justify-between min-h-[44px]',
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && 'hover:border-[#266273]',
          !selectedOption && 'text-[#667085]'
        )}
      >
        <span className="text-left truncate">{displayText}</span>
        <img 
          src={arrowIcon} 
          alt="Arrow" 
          className={cn(
            'w-4 h-4 transition-transform',
            isOpen && 'rotate-90'
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#d5d7da] rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              className={cn(
                'w-full px-3.5 py-3 text-left text-[#101828] text-base hover:bg-[#f8f7f2] transition-colors first:rounded-t-xl last:rounded-b-xl',
                selectedValue === option.value && 'bg-[#eaf0f2] text-[#266273]'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Select
