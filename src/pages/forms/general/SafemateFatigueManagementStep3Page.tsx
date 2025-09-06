import React, { useState } from 'react'
import HeaderWithClose from '../../../components/layout/HeaderWithClose'
import Button from '../../../components/ui/Button'
import maleIcon from '../../../assets/fatiguemanagement/maleicon.svg'
import femaleIcon from '../../../assets/fatiguemanagement/femaleicon.svg'

interface SafemateFatigueManagementStep3PageProps {
  onNext: () => void
  onBack: () => void
  onClose: () => void
}

const SafemateFatigueManagementStep3Page: React.FC<SafemateFatigueManagementStep3PageProps> = ({
  onNext,
  onBack,
  onClose
}) => {
  const [selectedGender, setSelectedGender] = useState<string>('male') // Male selected by default
  const [selectedDrinks, setSelectedDrinks] = useState<string>('')

  const genderOptions = [
    { value: 'male', label: 'Male', icon: maleIcon },
    { value: 'female', label: 'Female', icon: femaleIcon }
  ]

  // Dynamic drink options based on selected gender
  const getDrinkOptions = () => {
    if (selectedGender === 'female') {
      return [
        { value: '0-2', label: '0-2' },
        { value: '3-4', label: '3-4' },
        { value: 'more-than-5', label: 'More than 5' }
      ]
    } else {
      // Male options (default)
      return [
        { value: '0-1', label: '0-1' },
        { value: '1-5', label: '1-5' },
        { value: 'more-than-6', label: 'More than 6' }
      ]
    }
  }

  const drinkOptions = getDrinkOptions()

  // Reset drink selection when gender changes
  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender)
    setSelectedDrinks('') // Clear drink selection when gender changes
  }

  const handleNext = () => {
    if (selectedGender && selectedDrinks) {
      onNext()
    }
  }

  const isFormValid = selectedGender && selectedDrinks

  return (
    <div className="min-h-screen bg-[#f8f7f2] flex flex-col">
      {/* Header */}
      <HeaderWithClose
        title="Fatigue Management"
        onClose={onClose}
        progress="3/6"
      />

      {/* Content */}
      <div className="flex-1 px-5 py-3 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Question */}
          <div className="space-y-2">
            <div className="text-center">
              <h2 className="text-[#266273] text-lg font-bold leading-7">
                How many alcoholic drinks did you have before your sleep?
              </h2>
            </div>
            
            {/* Gender Selection */}
            <div className="flex gap-2">
              {genderOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleGenderChange(option.value)}
                  className={`flex-1 p-4 rounded-xl border text-center font-medium text-base leading-6 transition-all flex items-center justify-center gap-1.5 ${
                    selectedGender === option.value
                      ? 'bg-[#eaf0f2] border-[#266273] text-[#101828]'
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                >
                  <img 
                    src={option.icon} 
                    alt={option.label}
                    className="w-6 h-6 flex-shrink-0"
                  />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Divider with explanation */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-[#d0d5dd]"></div>
            <div className="text-center text-[#667085] text-sm leading-5 px-2">
              <p>
                Limits vary by gender.<br />
                Select yours to see the correct range.
              </p>
            </div>
            <div className="flex-1 h-px bg-[#d0d5dd]"></div>
          </div>

          {/* Drink Options */}
          <div className="space-y-2">
            {drinkOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedDrinks(option.value)}
                className={`w-full p-4 rounded-xl border text-center font-medium text-base leading-6 transition-all ${
                  selectedDrinks === option.value
                    ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                    : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                }`}
              >
                {option.label}
              </button>
            ))}
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

export default SafemateFatigueManagementStep3Page
