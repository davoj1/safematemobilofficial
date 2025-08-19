import React from 'react'
import { cn } from '../../utils/cn'

interface FileUploadProps {
  onFileSelect?: (file: File) => void
  className?: string
  title?: string
  description?: string
  buttonText?: string
  fileTypes?: string
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  className,
  title = 'Add Photos (Optional)',
  description = 'Photos have maximum size of 10Mb',
  buttonText = 'Click to upload photo',
  fileTypes = 'SVG, PNG, JPG or GIF files up to 10MB',
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && onFileSelect) {
      onFileSelect(file)
    }
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="space-y-0.5">
        <h3 className="font-medium text-[#344054] text-sm leading-5">
          {title}
        </h3>
        <p className="font-normal text-[#475467] text-xs leading-[18px]">
          {description}
        </p>
      </div>
      
      <div className="bg-white border border-dashed border-[#d0d5dd] rounded-xl p-5">
        <div className="flex items-center gap-3">
          <div className="w-[42px] h-[42px] bg-white rounded-lg border border-[#d5d7da] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16L12 8M12 8L15 11M12 8L9 11" stroke="#414651" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 15V16C3 18.8284 3 20.2426 3.87868 21.1213C4.75736 22 6.17157 22 9 22H15C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V15" stroke="#414651" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className="flex-1">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="space-y-0.5">
                <p className="font-semibold text-[#558998] text-sm leading-5 cursor-pointer">
                  {buttonText}
                </p>
                <p className="font-normal text-[#535862] text-xs leading-[18px]">
                  {fileTypes}
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileUpload 