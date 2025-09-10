import React from 'react'
import { cn } from '../../utils/cn'
import { TextareaInput, FileUpload } from '.'

export type CheckItemStatus = 'ok' | 'not-ok' | 'na' | null

interface PrestartCheckItemProps {
  title: string
  status: CheckItemStatus
  comment?: string
  photo?: File | null
  onStatusChange: (status: CheckItemStatus) => void
  onCommentChange?: (comment: string) => void
  onPhotoAdd?: (photo: File) => void
  disabled?: boolean
  className?: string
}

const PrestartCheckItem: React.FC<PrestartCheckItemProps> = ({
  title,
  status,
  comment = '',
  photo = null,
  onStatusChange,
  onCommentChange,
  onPhotoAdd,
  disabled = false,
  className
}) => {
  const getButtonClass = (buttonStatus: CheckItemStatus) => {
    const baseClass = 'flex items-center justify-center min-w-[44px] h-[44px] rounded-xl border-2 transition-all duration-200 disabled:opacity-50'
    
    if (status === buttonStatus) {
      switch (buttonStatus) {
        case 'ok':
          return `${baseClass} bg-[#ecfdf3] border-[#17b26a] text-[#17b26a]`
        case 'not-ok':
          return `${baseClass} bg-[#fff9f5] border-[#ff4405] text-[#ff4405]`
        case 'na':
          return `${baseClass} bg-[#f0fdf9] border-[#2a6c7e] text-[#266273]`
        default:
          return `${baseClass} bg-white border-[#d5d7da] text-[#667085]`
      }
    } else {
      return `${baseClass} bg-white border-[#d5d7da] text-[#667085] hover:border-[#266273]`
    }
  }

  const requiresComment = status === 'not-ok'

  return (
    <div className={cn('space-y-3', className)}>
      {/* Title and Status Buttons */}
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-medium text-[#344054] text-sm leading-5 flex-1">
          {title}
        </h3>
        
        <div className="flex items-center gap-2">
          {/* OK Button */}
          <button
            type="button"
            onClick={() => onStatusChange('ok')}
            disabled={disabled}
            className={getButtonClass('ok')}
            title="OK"
          >
            <span className="text-lg font-bold">✓</span>
          </button>
          
          {/* Not OK Button */}
          <button
            type="button"
            onClick={() => onStatusChange('not-ok')}
            disabled={disabled}
            className={getButtonClass('not-ok')}
            title="Not OK"
          >
            <span className="text-lg font-bold">✗</span>
          </button>
          
          {/* N/A Button */}
          <button
            type="button"
            onClick={() => onStatusChange('na')}
            disabled={disabled}
            className={getButtonClass('na')}
            title="Not Applicable"
          >
            <span className="text-sm font-bold">N/A</span>
          </button>
        </div>
      </div>

      {/* Comment and Photos Section (mandatory when Not OK) */}
      {requiresComment && onCommentChange && (
        <div className="space-y-3">
          {/* Comment */}
          <div className="space-y-1.5">
            <label className="font-medium text-[#344054] text-xs leading-4">
              Comment (required) *
            </label>
            <TextareaInput
              placeholder="Please explain the issue..."
              value={comment}
              onChange={onCommentChange}
              rows={2}
              className="text-sm"
            />
          </div>

          {/* Photos */}
          {onPhotoAdd && (
            <div className="space-y-2">
              <FileUpload
                title="Add Photo"
                description="Upload a photo to document the issue"
                buttonText="Click to upload photo"
                onFileSelect={onPhotoAdd}
              />
              
              {/* Display uploaded photo */}
              {photo && (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Uploaded photo"
                    className="w-full h-32 object-cover rounded-lg border border-[#d0d5dd]"
                  />
                  <button
                    onClick={() => onPhotoAdd(null as any)} // This will need to be handled by parent
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PrestartCheckItem
