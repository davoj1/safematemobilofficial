import React, { useState } from 'react'
import HeaderWithClose from '../../../components/layout/HeaderWithClose'
import Button from '../../../components/ui/Button'
import { Select } from '../../../components/ui'

interface GoodlineFatigueStep3PageProps {
  onNext: (waterIntake: string, alcoholIntake: string, breathTest: string) => void
  onBack: () => void
  onClose: () => void
}

const GoodlineFatigueStep3Page: React.FC<GoodlineFatigueStep3PageProps> = ({
  onNext,
  onBack,
  onClose
}) => {
  const [waterIntake, setWaterIntake] = useState<string>('')
  const [alcoholIntake, setAlcoholIntake] = useState<string>('')
  const [breathTest, setBreathTest] = useState<string>('')

  const waterOptions = [
    { value: '0', label: '0 glasses' },
    { value: '1', label: '1 glass' },
    { value: '2', label: '2 glasses' },
    { value: '3', label: '3 glasses' },
    { value: '4', label: '4 glasses' },
    { value: '5', label: '5 glasses' },
    { value: '6', label: '6 glasses' },
    { value: '7', label: '7 glasses' },
    { value: '8', label: '8 glasses' },
    { value: '9', label: '9 glasses' },
    { value: '10+', label: '10+ glasses' }
  ]

  const alcoholOptions = [
    { value: '0', label: '0 drinks' },
    { value: '1', label: '1 drink' },
    { value: '2', label: '2 drinks' },
    { value: '3', label: '3 drinks' },
    { value: '4', label: '4 drinks' },
    { value: '5', label: '5 drinks' },
    { value: '6', label: '6 drinks' },
    { value: '7', label: '7 drinks' },
    { value: '8', label: '8 drinks' },
    { value: '9', label: '9 drinks' },
    { value: '10+', label: '10+ drinks' }
  ]

  const breathTestOptions = [
    { value: 'negative', label: 'Negative' },
    { value: 'positive', label: 'Positive' },
    { value: 'na', label: 'N/A' }
  ]

  const handleNext = () => {
    if (waterIntake && alcoholIntake && breathTest) {
      onNext(waterIntake, alcoholIntake, breathTest)
    }
  }

  const isFormValid = waterIntake && alcoholIntake && breathTest

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithClose
        title="Goodline Fatigue Form"
        onClose={onClose}
        progress="3/6"
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto">
          {/* Question 1: Water intake */}
          <div className="space-y-2">
            <div className="text-center">
              <h2 className="text-[#266273] text-lg font-bold leading-7">
                How many glasses of water have you drunk in the last 12 hours?
              </h2>
            </div>
            
            <Select
              placeholder="- [Choose Option] -"
              value={waterIntake}
              onChange={(value) => setWaterIntake(value)}
              options={waterOptions}
            />
          </div>

          {/* Question 2: Alcohol intake */}
          <div className="space-y-2">
            <div className="text-center">
              <h2 className="text-[#266273] text-lg font-bold leading-7">
                How many drinks of alcohol have you drunk in the last 12 hours?
              </h2>
            </div>
            
            <Select
              placeholder="- [Choose Option] -"
              value={alcoholIntake}
              onChange={(value) => setAlcoholIntake(value)}
              options={alcoholOptions}
            />
          </div>

          {/* Question 3: Breath test */}
          <div className="space-y-2">
            <div className="text-center">
              <h2 className="text-[#266273] text-lg font-bold leading-7">
                Breath test result:
              </h2>
            </div>
            
            <div className="space-y-2">
              {breathTestOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setBreathTest(option.value)}
                  className={`w-full p-4 rounded-xl border text-center font-medium text-base leading-6 transition-all ${
                    breathTest === option.value
                      ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            {/* Warning message for "Positive" */}
            {breathTest === 'positive' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-red-800 text-sm font-medium text-center">
                  Report to your supervisor immediately
                </p>
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

export default GoodlineFatigueStep3Page
