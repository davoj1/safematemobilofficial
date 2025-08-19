import React, { useState } from 'react'
import HeaderWithClose from '../../components/layout/HeaderWithClose'
import Button from '../../components/ui/Button'
import face1Icon from '../../assets/fatiguemanagement/face1.svg'
import face2Icon from '../../assets/fatiguemanagement/face2.svg'
import face3Icon from '../../assets/fatiguemanagement/face3.svg'
import face4Icon from '../../assets/fatiguemanagement/face4.svg'
import face5Icon from '../../assets/fatiguemanagement/face5.svg'

interface FatigueManagementStep2PageProps {
  onNext: () => void
  onBack: () => void
  onClose: () => void
}

const FatigueManagementStep2Page: React.FC<FatigueManagementStep2PageProps> = ({
  onNext,
  onBack,
  onClose
}) => {
  const [selectedAlertness, setSelectedAlertness] = useState<string>('')

  const alertnessOptions = [
    { 
      value: 'active-alert', 
      label: 'Feeling active, alert or wide awake.',
      icon: face1Icon
    },
    { 
      value: 'functioning-good', 
      label: 'Functioning at a good level, but not at peak, able to concentrate.',
      icon: face2Icon
    },
    { 
      value: 'not-fully-alert', 
      label: 'Not fully alert.',
      icon: face3Icon
    },
    { 
      value: 'bit-groggy', 
      label: 'A bit groggy, hard to concentrate.',
      icon: face4Icon
    },
    { 
      value: 'sleepy-groggy', 
      label: 'Sleepy, groggy, hard to concentrate.',
      icon: face5Icon
    }
  ]

  const handleNext = () => {
    if (selectedAlertness) {
      onNext()
    }
  }

  const isFormValid = selectedAlertness

  return (
    <div className="min-h-screen bg-[#f8f7f2] flex flex-col">
      {/* Header */}
      <HeaderWithClose
        title="Fatigue Management"
        onClose={onClose}
        progress="2/6"
      />

      {/* Content */}
      <div className="flex-1 px-5 py-3 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Question */}
          <div className="space-y-2">
            <div className="text-center">
              <h2 className="text-[#266273] text-lg font-bold leading-7">
                How do you feel? Are you alert?
              </h2>
            </div>
            
            <div className="space-y-2">
              {alertnessOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedAlertness(option.value)}
                  className={`w-full p-4 rounded-xl border text-left font-medium text-base leading-6 transition-all flex items-center gap-2 ${
                    selectedAlertness === option.value
                      ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                >
                  <img 
                    src={option.icon} 
                    alt={`Face ${alertnessOptions.indexOf(option) + 1}`}
                    className="w-8 h-8 flex-shrink-0"
                  />
                  <span className="flex-1">{option.label}</span>
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

export default FatigueManagementStep2Page