import React, { useState } from 'react'
import { HeaderWithClose } from '../../components/layout'
import { Button, Input, TextareaInput } from '../../components/ui'

interface HazardData {
  id: string
  hazard: string
  control: string
}

interface HazardIdentificationData {
  hazards: HazardData[]
}

interface HazardIdentificationPageProps {
  onBack?: () => void
  onNext?: (data: HazardIdentificationData) => void
  onClose?: () => void
  selectedSite?: any
}

const HazardIdentificationPage: React.FC<HazardIdentificationPageProps> = ({
  onBack,
  onNext,
  onClose,
  selectedSite
}) => {
  const [hazards, setHazards] = useState<HazardData[]>([
    { id: '1', hazard: '', control: '' }
  ])

  const handleHazardChange = (id: string, field: 'hazard' | 'control', value: string) => {
    setHazards(prev => prev.map(h => 
      h.id === id ? { ...h, [field]: value } : h
    ))
  }

  const addAnotherHazard = () => {
    const newId = (hazards.length + 1).toString()
    setHazards(prev => [...prev, { id: newId, hazard: '', control: '' }])
  }

  const removeHazard = (id: string) => {
    if (hazards.length > 1) {
      setHazards(prev => prev.filter(h => h.id !== id))
    }
  }

  const isFormValid = hazards.every(h => h.hazard.trim() && h.control.trim())

  const handleNext = () => {
    if (isFormValid) {
      const formData: HazardIdentificationData = {
        hazards: hazards.filter(h => h.hazard.trim() && h.control.trim())
      }
      onNext?.(formData)
    }
  }

  const handleClose = () => {
    onClose?.()
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header */}
      <HeaderWithClose 
        title="Take 5" 
        onClose={handleClose}
        progress="3/4"
        className="flex-shrink-0"
      />

      {/* Content */}
      <div className="flex-1 flex flex-col px-5 py-3 gap-5 overflow-y-auto">
        {/* Title */}
        <div className="flex justify-center">
          <h1 className="text-[#266273] text-lg font-bold leading-7">
            Hazard Identification
          </h1>
        </div>

        {/* Hazards List */}
        <div className="flex-1 flex flex-col gap-3">
          {hazards.map((hazard, index) => (
            <div key={hazard.id} className="bg-white rounded-[20px] border border-[#d0d5dd] p-5">
              <div className="flex flex-col gap-4">
                {/* Hazard Input */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1">
                    <label className="text-[#344054] text-sm font-medium leading-5">
                      Hazard
                    </label>
                    <span className="text-[#d92d20] text-sm font-medium leading-5">*</span>
                  </div>
                  <Input
                    placeholder="Input your hazard"
                    value={hazard.hazard}
                    onChange={(e) => handleHazardChange(hazard.id, 'hazard', e.target.value)}
                    className="bg-white border-[#d0d5dd] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                  />
                </div>

                {/* Control Input */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-0.5">
                    <label className="text-[#414651] text-sm font-medium leading-5">
                      Control
                    </label>
                    <span className="text-[#f04438] text-sm font-medium leading-5">*</span>
                  </div>
                  <textarea
                    placeholder="Input your control here..."
                    value={hazard.control}
                    onChange={(e) => handleHazardChange(hazard.id, 'control', e.target.value)}
                    rows={4}
                    className="w-full bg-white border border-[#d5d7da] rounded-xl px-3.5 py-3 text-[#101828] text-base placeholder-[#667085] focus:outline-none focus:border-[#266273] focus:ring-1 focus:ring-[#266273] transition-colors shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] min-h-[100px] resize-y"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Another Hazard Button */}
          <button
            onClick={addAnotherHazard}
            className="w-full border border-[#266273] rounded-2xl p-3 flex items-center justify-center gap-2 bg-transparent hover:bg-white/50 transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="#344054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[#344054] text-base font-semibold leading-6">
              Add another hazard
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="px-5 py-3 flex gap-4 flex-shrink-0">
        <Button
          onClick={onBack}
          variant="secondary"
          className="flex-1 bg-[#eaf0f2] border-[#eaf0f2] text-[#1e4d59] hover:bg-[#d4e3e6]"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isFormValid}
          className="flex-1"
          variant={isFormValid ? 'primary' : 'secondary'}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default HazardIdentificationPage