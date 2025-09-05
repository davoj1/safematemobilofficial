import React, { useState } from 'react'
import HeaderWithBack from '../../../components/layout/HeaderWithBack'
import Button from '../../../components/ui/Button'

interface FatigueManagementStep1PageProps {
  onNext: (sleep24h: string, sleep48h: string) => void
  onBack: () => void
}

const FatigueManagementStep1Page: React.FC<FatigueManagementStep1PageProps> = ({
  onNext,
  onBack
}) => {
  const [sleep24Hours, setSleep24Hours] = useState<string>('')
  const [sleep48Hours, setSleep48Hours] = useState<string>('')

  const sleep24Options = [
    { value: 'less-than-5', label: 'Less than 5' },
    { value: '5-to-7', label: '5 to 7' },
    { value: '7-or-more', label: '7 or more' }
  ]

  const sleep48Options = [
    { value: 'less-than-12', label: 'Less than 12' },
    { value: '12-to-14', label: '12 to 14' },
    { value: '14-or-more', label: '14 or more' }
  ]

  const handleNext = () => {
    if (sleep24Hours && sleep48Hours) {
      // Convert the option values to the format expected by the risk calculation
      const sleep24h = sleep24Options.find(opt => opt.value === sleep24Hours)?.label || sleep24Hours
      const sleep48h = sleep48Options.find(opt => opt.value === sleep48Hours)?.label || sleep48Hours
      onNext(sleep24h, sleep48h)
    }
  }

  const isFormValid = sleep24Hours && sleep48Hours

  return (
    <div className="min-h-screen bg-[#f8f7f2] flex flex-col">
      {/* Header */}
      <HeaderWithBack
        title="Fatigue Management"
        onBack={onBack}
        progress="1/6"
      />

      {/* Content */}
      <div className="flex-1 px-5 py-3 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Question 1: 24 hours sleep */}
          <div className="space-y-2">
            <div className="text-center">
              <h2 className="text-[#266273] text-lg font-bold leading-7">
                How many hours of sleep have you had in the last 24 hours?
              </h2>
            </div>
            
            <div className="space-y-2">
              {sleep24Options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSleep24Hours(option.value)}
                  className={`w-full p-4 rounded-xl border text-center font-medium text-base leading-6 transition-all ${
                    sleep24Hours === option.value
                      ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: 48 hours sleep */}
          <div className="space-y-2">
            <div className="text-center">
              <h2 className="text-[#266273] text-lg font-bold leading-7">
                How many hours of sleep have you had in the last 48 hours?
              </h2>
            </div>
            
            <div className="space-y-2">
              {sleep48Options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSleep48Hours(option.value)}
                  className={`w-full p-4 rounded-xl border text-center font-medium text-base leading-6 transition-all ${
                    sleep48Hours === option.value
                      ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="w-full">
          <Button
            onClick={handleNext}
            disabled={!isFormValid}
            className="w-full"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FatigueManagementStep1Page