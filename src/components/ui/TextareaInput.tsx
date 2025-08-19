import React from 'react'
import { cn } from '../../utils/cn'

interface TextareaInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  rows?: number
}

const TextareaInput: React.FC<TextareaInputProps> = ({
  placeholder = '',
  value = '',
  onChange,
  className,
  rows = 3,
}) => {
  return (
    <div className={cn('relative w-full', className)}>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        rows={rows}
        className="w-full bg-white border border-[#d5d7da] rounded-xl px-3.5 py-3 text-[#101828] text-base placeholder-[#667085] focus:outline-none focus:border-[#266273] focus:ring-1 focus:ring-[#266273] transition-colors resize-none"
      />
    </div>
  )
}

export default TextareaInput 