import React, { useState } from 'react'
import HeaderWithClose from '../../components/layout/HeaderWithClose'
import Button from '../../components/ui/Button'
import redFace from '../../assets/fatiguemanagement/redface.svg'
import orangeFace from '../../assets/fatiguemanagement/orangeface.svg'
import yellowFace from '../../assets/fatiguemanagement/yellowface.svg'
import lightGreenFace from '../../assets/fatiguemanagement/lightgreenface.svg'
import greenFace from '../../assets/fatiguemanagement/greenface.svg'

interface FatigueManagementStep5PageProps {
  onNext: () => void
  onBack: () => void
  onClose: () => void
}

const FatigueManagementStep5Page: React.FC<FatigueManagementStep5PageProps> = ({
  onNext,
  onBack,
  onClose
}) => {
  const [selectedRating, setSelectedRating] = useState<string>('')

  const wellBeingOptions = [
    { 
      value: '0-2', 
      label: '0-2',
      icon: redFace
    },
    { 
      value: '2-4', 
      label: '2-4',
      icon: orangeFace
    },
    { 
      value: '4-6', 
      label: '4-6',
      icon: yellowFace
    },
    { 
      value: '6-8', 
      label: '6-8',
      icon: lightGreenFace
    },
    { 
      value: '8-10', 
      label: '8-10',
      icon: greenFace
    }
  ]

  const handleNext = () => {
    if (selectedRating) {
      onNext()
    }
  }

  const isFormValid = selectedRating

  return (
    <div className="min-h-screen bg-[#f8f7f2] flex flex-col">
      {/* Header */}
      <HeaderWithClose
        title="Fatigue Management"
        onClose={onClose}
        progress="5/6"
      />

      {/* Content */}
      <div className="flex-1 px-5 py-3 flex flex-col justify-between">
        <div className="flex-1 space-y-8">
          {/* Question */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-[#266273] text-lg font-bold leading-7">
                On a scale of 1 to 10 (10 being the most positive) how would you rate your overall well-being levels today?
              </h2>
            </div>
            
            {/* Rating Scale */}
            <div className="flex justify-center gap-4">
              {wellBeingOptions.map((option) => {
                const isSelected = selectedRating === option.value
                const hasSelection = selectedRating !== ''
                const shouldFade = hasSelection && !isSelected
                
                return (
                  <button
                    key={option.value}
                    onClick={() => setSelectedRating(option.value)}
                    className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                      isSelected ? 'scale-110' : 'hover:scale-105'
                    } ${shouldFade ? 'opacity-30' : 'opacity-100'}`}
                  >
                    {/* Colored Face Icon */}
                    <div className="w-[50px] h-[50px] flex items-center justify-center">
                      <img 
                        src={option.icon} 
                        alt={`Rating ${option.label}`}
                        className="w-[50px] h-[50px]"
                      />
                    </div>
                    
                    {/* Label */}
                    <span className={`text-base font-normal transition-colors duration-300 ${
                      isSelected 
                        ? 'text-[#266273] font-semibold' 
                        : shouldFade 
                        ? 'text-[#667085] opacity-50'
                        : 'text-[#667085]'
                    }`}>
                      {option.label}
                    </span>
                  </button>
                )
              })}
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

export default FatigueManagementStep5Page