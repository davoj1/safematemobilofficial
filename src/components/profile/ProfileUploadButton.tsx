import React from 'react'

interface ProfileUploadButtonProps {
  icon: 'photo' | 'camera'
  label: string
  onClick?: () => void
}

const ProfileUploadButton: React.FC<ProfileUploadButtonProps> = ({
  icon,
  label,
  onClick
}) => {
  const renderIcon = () => {
    if (icon === 'photo') {
      return (
        <svg className="w-8 h-8 text-[#667085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    } else if (icon === 'camera') {
      return (
        <svg className="w-8 h-8 text-[#667085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  }

  return (
    <button
      onClick={onClick}
      className="flex-1 bg-white border border-[#d0d5dd] rounded-lg px-5 py-3 flex flex-col gap-0.5 items-center justify-center hover:bg-gray-50 transition-colors duration-200"
    >
      <div className="flex items-center justify-center">
        {renderIcon()}
      </div>
      <span className="font-medium text-[#475467] text-sm leading-5">
        {label}
      </span>
    </button>
  )
}

export default ProfileUploadButton 