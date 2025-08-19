import React, { useState } from 'react'
import AuthButton from '../../components/auth/AuthButton'
import ConfirmationModal from '../../components/ui/ConfirmationModal'

interface EnterFullNamePageProps {
  onContinue?: () => void
  onBackToOnboarding?: () => void
}

const EnterFullNamePage: React.FC<EnterFullNamePageProps> = ({
  onContinue,
  onBackToOnboarding,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  })
  const [showExitModal, setShowExitModal] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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

  const isFormValid = formData.firstName.trim() && formData.lastName.trim()

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
              2/2
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="absolute box-border content-stretch flex flex-col gap-10 h-[calc(100vh-120px)] items-center justify-start left-1/2 transform -translate-x-1/2 pb-6 px-5 top-20 w-full max-w-sm">
          
          {/* Title Section */}
          <div className="flex flex-col gap-1.5 items-center justify-start text-center w-full">
            <h1 className="font-bold text-[#24262d] text-2xl leading-8">
              Enter your full name
            </h1>
            <p className="text-[#667085] text-sm leading-5">
              Please enter your full name
            </p>
          </div>

          {/* Input Fields */}
          <div className="flex flex-col gap-4 items-start justify-start w-full flex-1">
            {/* First Name Input */}
            <div className="w-full">
              <input
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#d0d5dd] rounded-xl text-base placeholder:text-[#667085] text-[#182230] focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent transition-all duration-200 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
              />
            </div>

            {/* Last Name Input */}
            <div className="w-full">
              <input
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#d0d5dd] rounded-xl text-base placeholder:text-[#667085] text-[#182230] focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent transition-all duration-200 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="flex flex-col gap-6 items-center justify-start w-full">
            <AuthButton
              variant={isFormValid ? "primary" : "secondary"}
              onClick={onContinue}
              disabled={!isFormValid}
              className="w-full"
            >
              Complete
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

export default EnterFullNamePage 