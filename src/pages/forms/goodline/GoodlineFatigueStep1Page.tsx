import React, { useState } from 'react'
import HeaderWithBack from '../../../components/layout/HeaderWithBack'
import Button from '../../../components/ui/Button'
import { TextareaInput } from '../../../components/ui'

interface GoodlineFatigueStep1PageProps {
  onNext: (fitForWork: string, unreportedMedication: string, workFromHome: string, workFromHomeApproved: string, fitForWorkComment: string, unreportedMedicationComment: string) => void
  onBack: () => void
}

const GoodlineFatigueStep1Page: React.FC<GoodlineFatigueStep1PageProps> = ({
  onNext,
  onBack
}) => {
  const [fitForWork, setFitForWork] = useState<string>('')
  const [unreportedMedication, setUnreportedMedication] = useState<string>('')
  const [workFromHome, setWorkFromHome] = useState<string>('')
  const [workFromHomeApproved, setWorkFromHomeApproved] = useState<string>('')
  const [fitForWorkComment, setFitForWorkComment] = useState<string>('')
  const [unreportedMedicationComment, setUnreportedMedicationComment] = useState<string>('')

  const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]

  const handleNext = () => {
    if (fitForWork && unreportedMedication && workFromHome && (workFromHome === 'no' || workFromHomeApproved)) {
      onNext(fitForWork, unreportedMedication, workFromHome, workFromHomeApproved, fitForWorkComment, unreportedMedicationComment)
    }
  }

  const isFormValid = fitForWork && unreportedMedication && workFromHome && (workFromHome === 'no' || workFromHomeApproved)

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithBack
        title="Goodline Fatigue Form"
        onBack={onBack}
        progress="1/6"
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto">
          {/* Question 1: Are you ok to Work your shift? */}
          <div className="space-y-2">
            <div className="text-center">
              <h2 className="text-[#266273] text-lg font-bold leading-7">
                Are you ok to Work your shift?
              </h2>
            </div>
            
            <div className="space-y-2">
              {yesNoOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFitForWork(option.value)}
                  className={`w-full p-4 rounded-xl border text-center font-medium text-base leading-6 transition-all ${
                    fitForWork === option.value
                      ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            {/* Comment box and warning message for "No" */}
            {fitForWork === 'no' && (
              <div className="space-y-3">
                <TextareaInput
                  placeholder="Please provide details..."
                  value={fitForWorkComment}
                  onChange={(value) => setFitForWorkComment(value)}
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

          {/* Question 2: Are you taking any unreported medication? */}
          <div className="space-y-2">
            <div className="text-center">
              <h2 className="text-[#266273] text-lg font-bold leading-7">
                Are you taking any unreported medication?
              </h2>
            </div>
            
            <div className="space-y-2">
              {yesNoOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setUnreportedMedication(option.value)}
                  className={`w-full p-4 rounded-xl border text-center font-medium text-base leading-6 transition-all ${
                    unreportedMedication === option.value
                      ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            {/* Comment box for "Yes" */}
            {unreportedMedication === 'yes' && (
              <div className="space-y-2">
                <TextareaInput
                  placeholder="Please provide details..."
                  value={unreportedMedicationComment}
                  onChange={(value) => setUnreportedMedicationComment(value)}
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* Question 3: Are you working from home? */}
          <div className="space-y-2">
            <div className="text-center">
              <h2 className="text-[#266273] text-lg font-bold leading-7">
                Are you working from home?
              </h2>
            </div>
            
            <div className="space-y-2">
              {yesNoOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setWorkFromHome(option.value)}
                  className={`w-full p-4 rounded-xl border text-center font-medium text-base leading-6 transition-all ${
                    workFromHome === option.value
                      ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            {/* Follow-up question for "Yes" */}
            {workFromHome === 'yes' && (
              <div className="space-y-2">
                <div className="text-center">
                  <h2 className="text-[#266273] text-lg font-bold leading-7">
                    Are you approved to do so?
                  </h2>
                </div>
                
                <div className="space-y-2">
                  {yesNoOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setWorkFromHomeApproved(option.value)}
                      className={`w-full p-4 rounded-xl border text-center font-medium text-base leading-6 transition-all ${
                        workFromHomeApproved === option.value
                          ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                          : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                
                {/* Warning message for "No" approval */}
                {workFromHomeApproved === 'no' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                    <p className="text-red-800 text-sm font-medium text-center">
                      Stop work immediately and report to your supervisor
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
      </div>

      {/* Bottom Button - Fixed */}
      <div className="px-5 py-3 flex-shrink-0">
        <Button
          onClick={handleNext}
          disabled={!isFormValid}
          className="w-full"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default GoodlineFatigueStep1Page
