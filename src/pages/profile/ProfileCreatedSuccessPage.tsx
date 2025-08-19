import React from 'react'
import tickIcon from '../../assets/tickicon.svg'
import AuthButton from '../../components/auth/AuthButton'

interface ProfileCreatedSuccessPageProps {
  onGoToHome?: () => void
}

const ProfileCreatedSuccessPage: React.FC<ProfileCreatedSuccessPageProps> = ({
  onGoToHome,
}) => {
  return (
    <div className="bg-[#f8f7f2] overflow-hidden relative w-full min-h-screen">
      <div className="flex flex-col h-screen">
        <div className="absolute box-border content-stretch flex flex-col gap-6 h-[calc(100vh-120px)] items-center justify-start left-1/2 transform -translate-x-1/2 pb-6 px-5 top-20 w-full max-w-sm">
          
          {/* Content - Centered */}
          <div className="flex flex-col gap-6 w-full flex-1 justify-center">
            {/* Success Icon */}
            <div className="flex justify-center">
              <img
                src={tickIcon}
                alt="Success"
                className="w-[120px] h-[120px]"
              />
            </div>

            {/* Title & Message */}
            <div className="text-center space-y-3">
              <h1 className="font-bold text-[#24262d] text-[30px] leading-[38px]">
                Profile created successfully
              </h1>
              <p className="text-[#344054] text-base leading-6 max-w-80 mx-auto">
                Your profile has been created successfully. You can now start using SafeMate.
              </p>
            </div>
          </div>

          {/* Action Button - At Bottom */}
          <div className="w-full">
            <AuthButton
              variant="primary"
              onClick={onGoToHome}
            >
              Go to Home
            </AuthButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCreatedSuccessPage 