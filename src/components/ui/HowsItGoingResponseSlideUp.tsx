import React, { useState } from 'react'
import { Button } from './index'

// Import the face icons from the fatigue management form
import face1Icon from '../../assets/fatiguemanagement/face1.svg'
import face2Icon from '../../assets/fatiguemanagement/face2.svg'
import face3Icon from '../../assets/fatiguemanagement/face3.svg'
import face4Icon from '../../assets/fatiguemanagement/face4.svg'
import face5Icon from '../../assets/fatiguemanagement/face5.svg'

interface HowsItGoingResponseSlideUpProps {
  isOpen: boolean
  onClose: () => void
  askerName: string
  onSubmit: (payload: { feeling: string, comment: string }) => void
}

const HowsItGoingResponseSlideUp: React.FC<HowsItGoingResponseSlideUpProps> = ({
  isOpen,
  onClose,
  askerName,
  onSubmit
}) => {
  const [selectedFeeling, setSelectedFeeling] = useState<string>('')
  const [comment, setComment] = useState('')

  const feelingOptions = [
    { 
      value: 'excellent', 
      label: 'Excellent - Feeling great and energized',
      icon: face1Icon,
      color: '#16a34a' // Green
    },
    { 
      value: 'good', 
      label: 'Good - Doing well and focused',
      icon: face2Icon,
      color: '#65a30d' // Light green
    },
    { 
      value: 'okay', 
      label: 'Okay - Getting by, manageable',
      icon: face3Icon,
      color: '#eab308' // Yellow
    },
    { 
      value: 'struggling', 
      label: 'Struggling - Having some difficulties',
      icon: face4Icon,
      color: '#f97316' // Orange
    },
    { 
      value: 'rough', 
      label: 'Rough - Having a tough time',
      icon: face5Icon,
      color: '#ef4444' // Red
    }
  ]

  const resetAndClose = () => {
    setSelectedFeeling('')
    setComment('')
    onClose()
  }

  const handleSubmit = () => {
    if (!selectedFeeling) return
    
    onSubmit({ feeling: selectedFeeling, comment: comment.trim() })
    resetAndClose()
  }

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
            How's It Going?
          </h2>
          <p className="text-sm text-[#667085] mt-0.5">Responding to {askerName}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-1 py-2 space-y-6">
          {/* Feeling Selection */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#101828]">How are you feeling?</h3>
            
            <div className="space-y-2">
              {feelingOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedFeeling(option.value)}
                  className={`w-full p-4 rounded-xl border text-left font-medium text-base leading-6 transition-all flex items-center gap-3 ${
                    selectedFeeling === option.value
                      ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                >
                  <img 
                    src={option.icon} 
                    alt={`Feeling ${option.value}`}
                    className="w-8 h-8 flex-shrink-0"
                  />
                  <span className="flex-1">{option.label}</span>
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
                placeholder="Share more details about how you're doing (optional)..."
                className="w-full p-3 border border-[#d0d5dd] rounded-xl text-sm text-[#101828] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent resize-none"
                rows={3}
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
            disabled={!selectedFeeling}
          >
            Send Response
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HowsItGoingResponseSlideUp
