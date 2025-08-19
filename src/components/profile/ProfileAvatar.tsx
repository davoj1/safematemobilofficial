import React from 'react'

interface ProfileAvatarProps {
  size?: 'sm' | 'md' | 'lg'
  hasImage?: boolean
  verified?: boolean
  imageUrl?: string
  alt?: string
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  size = 'md',
  hasImage = false,
  verified = false,
  imageUrl,
  alt = 'Profile picture'
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-40 h-40'
  }

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-20 h-20'
  }

  return (
    <div className={`relative rounded-full ${sizeClasses[size]}`}>
      {hasImage && imageUrl ? (
        // Profile image
        <div className="relative w-full h-full">
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-full object-cover rounded-full"
          />
          {/* White border with shadow */}
          <div className="absolute inset-[-4px] border-4 border-white rounded-full shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] pointer-events-none" />
        </div>
      ) : (
        // Placeholder
        <div className="relative w-full h-full">
          <div className="bg-[#f2f4f7] w-full h-full rounded-full flex items-center justify-center">
            {/* User icon */}
            <div className={`${iconSizes[size]} text-[#667085]`}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          {/* White border with shadow */}
          <div className="absolute inset-[-4px] border-4 border-white rounded-full shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] pointer-events-none" />
        </div>
      )}

      {/* Verified badge */}
      {verified && (
        <div className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
          <div className="w-5 h-5 bg-[#266273] rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileAvatar 