import React from 'react'
import { Button } from '../../../components/ui'
import successIcon from '../../../assets/successmessage/confetimiddleicon.svg'

interface VehiclePrestartSuccessPageProps {
  onContinue: () => void
}

const VehiclePrestartSuccessPage: React.FC<VehiclePrestartSuccessPageProps> = ({
  onContinue
}) => {
  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-8">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-[#17b26a] rounded-full flex items-center justify-center mb-6">
          <img src={successIcon} alt="Success" className="w-10 h-10" />
        </div>

        {/* Success Message */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-[#101828] text-2xl font-bold leading-8">
            Vehicle Prestart Complete!
          </h1>
          <p className="text-[#667085] text-base font-normal leading-6 max-w-sm">
            Your vehicle prestart inspection has been successfully submitted and recorded.
          </p>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl border border-[#eaecf0] p-4 w-full max-w-sm mb-8">
          <div className="text-center space-y-2">
            <h3 className="text-[#344054] text-sm font-semibold leading-5">
              What's Next?
            </h3>
            <p className="text-[#667085] text-sm font-normal leading-5">
              Your vehicle is ready for use. Remember to complete regular prestart checks before each shift.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="flex-shrink-0 px-5 py-4 bg-[#f8f7f2] border-t border-gray-200">
        <Button
          onClick={onContinue}
          className="w-full"
          variant="primary"
          size="lg"
        >
          Go to Home
        </Button>
      </div>
    </div>
  )
}

export default VehiclePrestartSuccessPage