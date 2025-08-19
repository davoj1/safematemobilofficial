import React from 'react'
import { cn } from '../../utils/cn'
import { TextareaInput, FileUpload, WarningMessage } from './index'

interface ExposureQuestionProps {
  question: string
  value: 'na' | 'no' | 'yes' | null
  onChange: (value: 'na' | 'no' | 'yes') => void
  className?: string
  // Optional fields for when "NO" is selected
  showPhoto?: boolean
  showComment?: boolean
  showAlert?: boolean
  alertMessage?: string
  commentValue?: string
  onCommentChange?: (value: string) => void
  onPhotoSelect?: (file: File) => void
}

const ExposureQuestion: React.FC<ExposureQuestionProps> = ({
  question,
  value,
  onChange,
  className,
  showPhoto = false,
  showComment = false,
  showAlert = false,
  alertMessage = "You must complete a JHA or see your supervisor before proceeding.",
  commentValue = '',
  onCommentChange,
  onPhotoSelect,
}) => {
  return (
    <div className={cn('bg-white border border-[#d0d5dd] rounded-[20px] p-5', className)}>
      <h3 className="font-semibold text-[#344054] text-base leading-6 text-center mb-4">
        {question}
      </h3>
      
      <div className="flex gap-[9px] mb-4">
        {/* NA Button */}
        <button
          onClick={() => onChange('na')}
          className={cn(
            'flex-1 h-11 px-3 py-2.5 rounded-xl font-semibold text-base transition-colors',
            value === 'na'
              ? 'bg-[#f0fdf9] border border-[#2a6c7e] text-[#266273]'
              : 'bg-[#f2f4f7] text-[#98a2b3]'
          )}
        >
          NA
        </button>
        
        {/* NO Button */}
        <button
          onClick={() => onChange('no')}
          className={cn(
            'flex-1 h-11 px-3 py-2.5 rounded-xl flex items-center justify-center transition-colors',
            value === 'no'
              ? 'bg-[#fff9f5] border border-[#ff4405]'
              : 'bg-[#f2f4f7]'
          )}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke={value === 'no' ? '#ff4405' : '#98a2b3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* YES Button */}
        <button
          onClick={() => onChange('yes')}
          className={cn(
            'flex-1 h-11 px-3 py-2.5 rounded-xl flex items-center justify-center transition-colors',
            value === 'yes'
              ? 'bg-[#ecfdf3] border border-[#17b26a]'
              : 'bg-[#f2f4f7]'
          )}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke={value === 'yes' ? '#17b26a' : '#98a2b3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Conditional fields when "NO" is selected */}
      {value === 'no' && (
        <div className="space-y-3 pt-3">
          {showPhoto && onPhotoSelect && (
            <FileUpload
              title="Add Photo"
              description="Upload a photo to document the issue"
              buttonText="Click to upload photo"
              onFileSelect={onPhotoSelect}
            />
          )}
          
          {showComment && onCommentChange && (
            <TextareaInput
              placeholder="Add your comment here..."
              value={commentValue}
              onChange={onCommentChange}
            />
          )}
          
          {showAlert && (
            <WarningMessage message={alertMessage} />
          )}
        </div>
      )}
    </div>
  )
}

export default ExposureQuestion 