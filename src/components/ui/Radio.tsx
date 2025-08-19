import React from 'react'
import { cn } from '../../utils/cn'

interface RadioProps {
  checked: boolean
  onChange?: () => void
  disabled?: boolean
  className?: string
}

const Radio: React.FC<RadioProps> = ({
  checked,
  onChange,
  disabled = false,
  className
}) => {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      className={cn(
        'w-6 h-6 rounded-full border-[1.5px] flex items-center justify-center transition-colors',
        checked 
          ? 'bg-[#266273] border-[#266273]' 
          : 'bg-white border-[#d0d5dd]',
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && 'hover:border-[#266273]',
        className
      )}
    >
      {checked && (
        <div className="w-3 h-3 rounded-full bg-white"></div>
      )}
    </button>
  )
}

export default Radio