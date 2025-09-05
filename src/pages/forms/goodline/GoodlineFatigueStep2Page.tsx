import React, { useState } from 'react'
import HeaderWithClose from '../../../components/layout/HeaderWithClose'
import Button from '../../../components/ui/Button'
import { Select, TextareaInput } from '../../../components/ui'

interface GoodlineFatigueStep2PageProps {
  onNext: (hoursSlept: string, feelingAlert: string, feelingAlertComment: string) => void
  onBack: () => void
  onClose: () => void
}

const GoodlineFatigueStep2Page: React.FC<GoodlineFatigueStep2PageProps> = ({
  onNext,
  onBack,
  onClose
}) => {
  const [hoursSlept, setHoursSlept] = useState<string>('')
  const [feelingAlert, setFeelingAlert] = useState<string>('')
  const [feelingAlertComment, setFeelingAlertComment] = useState<string>('')

  const hoursSleptOptions = [
    { value: '0', label: '0 hours' },
    { value: '1', label: '1 hour' },
    { value: '2', label: '2 hours' },
    { value: '3', label: '3 hours' },
    { value: '4', label: '4 hours' },
    { value: '5', label: '5 hours' },
    { value: '6', label: '6 hours' },
    { value: '7', label: '7 hours' },
    { value: '8', label: '8 hours' },
    { value: '9', label: '9 hours' },
    { value: '10+', label: '10+ hours' }
  ]

  const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]

  const handleNext = () => {
    if (hoursSlept && feelingAlert) {
      onNext(hoursSlept, feelingAlert, feelingAlertComment)
    }
  }

  const isFormValid = hoursSlept && feelingAlert

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithClose
        title="Goodline Fatigue Form"
        onClose={onClose}
        progress="2/6"
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto">
          {/* Question 1: Hours slept */}
          <div className="space-y-2">
            <div className="text-center">
              <h2 className="text-[#266273] text-lg font-bold leading-7">
                Hours slept in last 24?
              </h2>
            </div>
            
            <Select
              placeholder="- [Choose Option] -"
              value={hoursSlept}
              onChange={(value) => setHoursSlept(value)}
              options={hoursSleptOptions}
            />
          </div>

          {/* Question 2: Feeling alert */}
          <div className="space-y-2">
            <div className="text-center">
              <h2 className="text-[#266273] text-lg font-bold leading-7">
                Feeling alert and focused?
              </h2>
            </div>
            
            <div className="space-y-2">
              {yesNoOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFeelingAlert(option.value)}
                  className={`w-full p-4 rounded-xl border text-center font-medium text-base leading-6 transition-all ${
                    feelingAlert === option.value
                      ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            {/* Comment box and warning message for "No" */}
            {feelingAlert === 'no' && (
              <div className="space-y-3">
                <TextareaInput
                  placeholder="Please provide details..."
                  value={feelingAlertComment}
                  onChange={(value) => setFeelingAlertComment(value)}
                  rows={3}
                />
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-red-800 text-sm font-medium text-center">
                    Report to your supervisor before starting work
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

export default GoodlineFatigueStep2Page
