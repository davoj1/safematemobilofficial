import React, { useState } from 'react'
import { Button } from './index'
import BatteryIcon from './BatteryIcon'

interface EnergyLevelsResponseSlideUpProps {
  isOpen: boolean
  onClose: () => void
  askerName: string
  onSubmit: (payload: { shift: string, energyLevel: number, comment: string }) => void
}

const EnergyLevelsResponseSlideUp: React.FC<EnergyLevelsResponseSlideUpProps> = ({
  isOpen,
  onClose,
  askerName,
  onSubmit
}) => {
  const [selectedShift, setSelectedShift] = useState<string>('')
  const [selectedEnergyLevel, setSelectedEnergyLevel] = useState<number>(-1)
  const [comment, setComment] = useState('')

  const shiftOptions = [
    { 
      value: 'day', 
      label: 'Day Shift',
      icon: '☀️',
      description: 'Daytime working hours'
    },
    { 
      value: 'night', 
      label: 'Night Shift',
      icon: '🌙',
      description: 'Nighttime working hours'
    }
  ]

  const energyLevelOptions = [
    { 
      level: 0, 
      label: 'Empty',
      description: 'Completely drained, need rest'
    },
    { 
      level: 1, 
      label: 'Very Low',
      description: 'Running on fumes, struggling'
    },
    { 
      level: 2, 
      label: 'Low',
      description: 'Getting tired, need a break'
    },
    { 
      level: 3, 
      label: 'Medium',
      description: 'Doing okay, manageable'
    },
    { 
      level: 4, 
      label: 'High',
      description: 'Feeling good, energized'
    },
    { 
      level: 5, 
      label: 'Full',
      description: 'Fully charged, ready to go'
    }
  ]

  const resetAndClose = () => {
    setSelectedShift('')
    setSelectedEnergyLevel(-1)
    setComment('')
    onClose()
  }

  const handleSubmit = () => {
    if (!selectedShift || selectedEnergyLevel === -1) return
    
    onSubmit({ 
      shift: selectedShift, 
      energyLevel: selectedEnergyLevel, 
      comment: comment.trim() 
    })
    resetAndClose()
  }

  const isFormValid = selectedShift && selectedEnergyLevel !== -1

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={resetAndClose} />

      {/* Panel */}
      <div className="relative bg-white rounded-t-[20px] w-full h-[85vh] flex flex-col pt-12 pb-6 px-4 shadow-xl">        
        {/* Drag handle + Title */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[54px] h-[5px] bg-[#d9d9d9] rounded-full" />
        <div className="absolute right-2 top-2 w-9 h-9 flex items-center justify-center">
          <button onClick={resetAndClose} className="w-8 h-8 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#667085]">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="text-center mb-6">
          <h2 className="font-bold text-[#000000] text-xl leading-[30px]">
            Energy Levels Check
          </h2>
          <p className="text-sm text-[#667085] mt-0.5">Responding to {askerName}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-1 py-2 space-y-6">
          {/* Shift Selection */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#101828]">What shift are you on?</h3>
            
            <div className="space-y-2">
              {shiftOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedShift(option.value)}
                  className={`w-full p-4 rounded-xl border text-left font-medium text-base leading-6 transition-all flex items-center gap-3 ${
                    selectedShift === option.value
                      ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{option.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-sm text-[#667085] font-normal">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Energy Level Selection */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#101828]">What's your energy level?</h3>
            
            <div className="space-y-2">
              {energyLevelOptions.map((option) => (
                <button
                  key={option.level}
                  onClick={() => setSelectedEnergyLevel(option.level)}
                  className={`w-full p-4 rounded-xl border text-left font-medium text-base leading-6 transition-all flex items-center gap-3 ${
                    selectedEnergyLevel === option.level
                      ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                >
                  <BatteryIcon 
                    level={option.level as 0 | 1 | 2 | 3 | 4 | 5} 
                    className="w-8 h-8 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-sm text-[#667085] font-normal">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Comment Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#101828]">Additional Comments</h3>
            <div className="space-y-2">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Any additional details about your energy or shift (optional)..."
                className="w-full p-3 border border-[#d0d5dd] rounded-xl text-sm text-[#101828] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent resize-none"
                rows={3}
                maxLength={200}
              />
              <div className="text-right text-xs text-[#667085]">
                {comment.length}/200 characters
              </div>
            </div>
            <p className="text-xs text-[#667085]">
              Your response is private - only {askerName} can see it
            </p>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-[#eaecf0] flex gap-3">
          <Button className="flex-1" variant="light-teal" onClick={resetAndClose}>
            Cancel
          </Button>
          <Button 
            className="flex-1" 
            onClick={handleSubmit} 
            disabled={!isFormValid}
          >
            Send Response
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EnergyLevelsResponseSlideUp
