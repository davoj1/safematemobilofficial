import React, { useState } from 'react'
import HeaderWithClose from '../../../components/layout/HeaderWithClose'
import Button from '../../../components/ui/Button'
import { TextareaInput } from '../../../components/ui'

interface GoodlineFatigueStep4PageProps {
  onNext: (stressedOrDistracted: string, sickOrFlu: string, stressedComment: string, sickComment: string) => void
  onBack: () => void
  onClose: () => void
}

const GoodlineFatigueStep4Page: React.FC<GoodlineFatigueStep4PageProps> = ({
  onNext,
  onBack,
  onClose
}) => {
  const [stressedOrDistracted, setStressedOrDistracted] = useState<string>('')
  const [sickOrFlu, setSickOrFlu] = useState<string>('')
  const [stressedComment, setStressedComment] = useState<string>('')
  const [sickComment, setSickComment] = useState<string>('')

  const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]

  const handleNext = () => {
    if (stressedOrDistracted && sickOrFlu) {
      onNext(stressedOrDistracted, sickOrFlu, stressedComment, sickComment)
    }
  }

  const isFormValid = stressedOrDistracted && sickOrFlu

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithClose
        title="Goodline Fatigue Form"
        onClose={onClose}
        progress="4/6"
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto">
          {/* Question 1: Are you feeling stressed or distracted? */}
          <div className="space-y-2">
            <div className="text-center">
              <h2 className="text-[#266273] text-lg font-bold leading-7">
                Are you feeling stressed or distracted?
              </h2>
            </div>
            
            <div className="space-y-2">
              {yesNoOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setStressedOrDistracted(option.value)}
                  className={`w-full p-4 rounded-xl border text-center font-medium text-base leading-6 transition-all ${
                    stressedOrDistracted === option.value
                      ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            {/* Comment box and warning message for "Yes" */}
            {stressedOrDistracted === 'yes' && (
              <div className="space-y-3">
                <TextareaInput
                  placeholder="Please provide details..."
                  value={stressedComment}
                  onChange={(value) => setStressedComment(value)}
                  rows={3}
                />
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-red-800 text-sm font-medium text-center">
                    Report to your supervisor immediately
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Question 2: Are you feeling unwell? */}
          <div className="space-y-2">
            <div className="text-center">
              <h2 className="text-[#266273] text-lg font-bold leading-7">
                Are you feeling unwell?
              </h2>
            </div>
            
            <div className="space-y-2">
              {yesNoOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSickOrFlu(option.value)}
                  className={`w-full p-4 rounded-xl border text-center font-medium text-base leading-6 transition-all ${
                    sickOrFlu === option.value
                      ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            {/* Comment box and warning message for "Yes" */}
            {sickOrFlu === 'yes' && (
              <div className="space-y-3">
                <TextareaInput
                  placeholder="Please provide details..."
                  value={sickComment}
                  onChange={(value) => setSickComment(value)}
                  rows={3}
                />
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-red-800 text-sm font-medium text-center">
                    Report to your supervisor immediately
                  </p>
                </div>
              </div>
            )}
          </div>
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="px-5 py-3 flex-shrink-0">
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

export default GoodlineFatigueStep4Page
