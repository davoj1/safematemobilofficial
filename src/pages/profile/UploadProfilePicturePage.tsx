import React, { useState } from 'react'
import logo from '../../assets/logo.svg'
import ProfileAvatar from '../../components/profile/ProfileAvatar'
import ProfileUploadButton from '../../components/profile/ProfileUploadButton'
import AuthButton from '../../components/auth/AuthButton'
import ConfirmationModal from '../../components/ui/ConfirmationModal'

interface UploadProfilePicturePageProps {
  onContinue?: () => void
  onSkip?: () => void
  onBackToOnboarding?: () => void
}

const UploadProfilePicturePage: React.FC<UploadProfilePicturePageProps> = ({
  onContinue,
  onSkip,
  onBackToOnboarding,
}) => {
  const [hasProfilePicture, setHasProfilePicture] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)

  const handlePhotoUpload = () => {
    // TODO: Implement photo upload logic
    setHasProfilePicture(true)
  }

  const handleCameraCapture = () => {
    // TODO: Implement camera capture logic
    setHasProfilePicture(true)
  }

  const handleBackClick = () => {
    setShowExitModal(true)
  }

  const handleConfirmExit = () => {
    setShowExitModal(false)
    onBackToOnboarding?.()
  }

  const handleCancelExit = () => {
    setShowExitModal(false)
  }

  return (
    <div className="bg-white overflow-hidden relative w-full min-h-screen">
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="bg-white flex flex-row gap-4 items-center justify-start p-3 relative w-full">
          {/* Back Button */}
          <button 
            onClick={handleBackClick}
            className="flex items-center justify-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-[#667085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Progress Indicator */}
          <div className="ml-auto">
            <span className="font-semibold text-[#2a6c7e] text-sm">
              1/3
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="absolute box-border content-stretch flex flex-col gap-10 h-[calc(100vh-120px)] items-center justify-start left-1/2 transform -translate-x-1/2 pb-6 px-5 top-20 w-full max-w-sm">
          
          {/* Title Section */}
          <div className="flex flex-col gap-1.5 items-center justify-start text-center w-full">
            <h1 className="font-bold text-[#24262d] text-2xl leading-8">
              Add a profile picture
            </h1>
            <p className="text-[#667085] text-sm leading-5 max-w-80">
              Add a profile picture so your friends know it's you. Everyone will be able to see your picture
            </p>
          </div>

          {/* Profile Picture Section */}
          <div className="flex flex-col gap-8 items-center justify-start w-full flex-1">
            {/* Avatar */}
            <div className="relative">
              <ProfileAvatar 
                size="lg"
                hasImage={hasProfilePicture}
                verified={false}
              />
            </div>

            {/* Upload Options */}
            <div className="flex flex-row gap-4 items-start justify-start w-full">
              <ProfileUploadButton
                icon="photo"
                label="Photo"
                onClick={handlePhotoUpload}
              />
              <ProfileUploadButton
                icon="camera"
                label="Camera"
                onClick={handleCameraCapture}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 items-center justify-start w-full mt-auto">
            <AuthButton
              variant="primary"
              onClick={onContinue}
              disabled={!hasProfilePicture}
              className="w-full"
            >
              Continue
            </AuthButton>
            <AuthButton
              variant="secondary"
              onClick={onSkip}
              className="w-full"
            >
              Skip
            </AuthButton>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      <ConfirmationModal
        isOpen={showExitModal}
        onClose={handleCancelExit}
        onConfirm={handleConfirmExit}
        title="Exit Profile Creation?"
        message="Are you sure you want to exit creating a profile? You'll be taken back to the onboarding screen."
        confirmText="Yes, Exit"
        cancelText="No, Continue"
      />
    </div>
  )
}

export default UploadProfilePicturePage 