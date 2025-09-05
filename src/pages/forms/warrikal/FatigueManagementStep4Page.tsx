import React, { useState } from 'react'
import HeaderWithClose from '../../../components/layout/HeaderWithClose'
import Button from '../../../components/ui/Button'

interface FatigueManagementStep4PageProps {
  onNext: () => void
  onBack: () => void
  onClose: () => void
}

const FatigueManagementStep4Page: React.FC<FatigueManagementStep4PageProps> = ({
  onNext,
  onBack,
  onClose
}) => {
  const [medicationAnswer, setMedicationAnswer] = useState<string>('')
  const [stressAnswer, setStressAnswer] = useState<string>('')

  const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]

  const handleNext = () => {
    if (medicationAnswer && stressAnswer) {
      onNext()
    }
  }

  const isFormValid = medicationAnswer && stressAnswer

  return (
    <div className="min-h-screen bg-[#f8f7f2] flex flex-col">
      {/* Header */}
      <HeaderWithClose
        title="Fatigue Management"
        onClose={onClose}
        progress="4/6"
      />

      {/* Content */}
      <div className="flex-1 px-5 py-3 flex flex-col justify-between">
        <div className="flex-1 space-y-8">
          {/* Question 1: Medication */}
          <div className="space-y-2">
            <div className="text-center">
              <h2 className="text-[#266273] text-lg font-bold leading-7">
                Are you on any medication or other substances that could cause drowsiness or cause you to be unfit for work?
              </h2>
            </div>
            
            <div className="space-y-2">
              {yesNoOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setMedicationAnswer(option.value)}
                  className={`w-full p-4 rounded-xl border text-center font-medium text-base leading-6 transition-all ${
                    medicationAnswer === option.value
                      ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Stress */}
          <div className="space-y-2">
            <div className="text-center">
              <h2 className="text-[#266273] text-lg font-bold leading-7">
                Do you have any stress or other personal problems that are significantly affecting your concentration or sleep?
              </h2>
            </div>
            
            <div className="space-y-2">
              {yesNoOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setStressAnswer(option.value)}
                  className={`w-full p-4 rounded-xl border text-center font-medium text-base leading-6 transition-all ${
                    stressAnswer === option.value
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

        {/* Navigation Buttons */}
        <div className="flex gap-4 w-full">
          <Button
            onClick={onBack}
            variant="light-teal"
            className="flex-1"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isFormValid}
            className="flex-1"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FatigueManagementStep4Page