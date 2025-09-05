import React from 'react'
import { Button } from '../../../../components/ui'
import confettiIcon from '../../../../assets/successmessage/confetimiddleicon.svg'
import confettiBackground from '../../../../assets/successmessage/confeti1.svg'

interface TakeControlSuccessPageProps {
  onGoHome: () => void
  onViewRank?: () => void
}

const TakeControlSuccessPage: React.FC<TakeControlSuccessPageProps> = ({
  onGoHome,
  onViewRank
}) => {
  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] relative overflow-hidden">
      {/* Confetti Background */}
      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[684px] h-[130px] pointer-events-none z-10"
        style={{
          backgroundImage: `url(${confettiBackground})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      />

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 relative z-20">
        {/* Success Icon and Points */}
        <div className="flex flex-col items-center mb-10">
          {/* Confetti Icon */}
          <div className="w-[210px] h-[210px] mb-4 flex items-center justify-center">
            <img 
              src={confettiIcon} 
              alt="Success celebration" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Points Section */}
          <div className="flex flex-col items-center text-center w-[350px]">
            <div className="text-[#667085] text-sm font-medium leading-5 mb-0.5">
              EARNED
            </div>
            <div className="text-[#ff692e] text-[46px] font-bold leading-normal">
              +100 Pts
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="flex flex-col items-center text-center px-3 mb-5 w-full">
          <div className="flex flex-col gap-0.5 w-full mb-5">
            <h1 className="text-[#24262d] text-lg font-semibold leading-7">
              Form submitted successfully!
            </h1>
            <p className="text-[#667085] text-base font-normal leading-6">
              Your safety check has been submitted.
              <br />
              Thanks for helping keep yourself and you work mates safe! [[memory:6573360]]
            </p>
          </div>

          {/* View My Rank Link */}
          <button 
            onClick={onViewRank}
            className="text-[#266273] text-base font-semibold leading-6 underline hover:text-[#1e4d59] transition-colors"
          >
            View My Rank
          </button>
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="px-4 pb-3 flex-shrink-0">
        <Button
          onClick={onGoHome}
          className="w-full"
          variant="primary"
        >
          Go to Home
        </Button>
      </div>
    </div>
  )
}

export default TakeControlSuccessPage