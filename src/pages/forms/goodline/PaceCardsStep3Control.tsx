import React, { useState } from 'react'
import { Button, TextareaInput } from '../../../components/ui'

interface PaceCardsStep3ControlProps {
  hazardsAndControls: Array<{ hazard: string, control: string, implemented: 'yes' | 'no' | 'na' }>
  onNext: (hazardsAndControls: Array<{ hazard: string, control: string, implemented: 'yes' | 'no' | 'na' }>) => void
  onBack: () => void
}

const PaceCardsStep3Control: React.FC<PaceCardsStep3ControlProps> = ({
  hazardsAndControls,
  onNext,
  onBack,
}) => {
  const [hazardsAndControlsData, setHazardsAndControlsData] = useState<Array<{ hazard: string, control: string, implemented: 'yes' | 'no' | 'na' }>>(hazardsAndControls)

  const addNewRow = () => {
    setHazardsAndControlsData(prev => [...prev, { hazard: '', control: '', implemented: 'na' }])
  }

  const removeRow = (index: number) => {
    if (hazardsAndControlsData.length > 1) {
      setHazardsAndControlsData(prev => prev.filter((_, i) => i !== index))
    }
  }

  const updateHazard = (index: number, value: string) => {
    setHazardsAndControlsData(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, hazard: value } : item
      )
    )
  }

  const updateControl = (index: number, value: string) => {
    setHazardsAndControlsData(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, control: value } : item
      )
    )
  }

  const updateImplemented = (index: number, value: 'yes' | 'no' | 'na') => {
    setHazardsAndControlsData(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, implemented: value } : item
      )
    )
  }

  const handleNext = () => {
    onNext(hazardsAndControlsData)
  }

  const isFormValid = hazardsAndControlsData.every(item => 
    item.hazard.trim() !== '' && 
    item.control.trim() !== '' && 
    item.implemented !== undefined
  )

  return (
    <>
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto">
        {/* Step Title */}
        <div className="text-center space-y-2">
          <h1 className="font-bold text-[#266273] text-xl leading-7">
            Control the Hazards
          </h1>
          <p className="text-[#667085] text-base font-normal leading-6">
            Identify hazards and their control measures
          </p>
        </div>

        {/* Hazards and Controls Table */}
        <div className="space-y-4">
          
          <div className="space-y-4">
            {hazardsAndControlsData.map((item, index) => (
              <div key={index} className="bg-white border border-[#d0d5dd] rounded-xl p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-[#344054] text-sm leading-5">
                    Hazard {index + 1}
                  </h3>
                  {hazardsAndControlsData.length > 1 && (
                    <button
                      onClick={() => removeRow(index)}
                      className="text-[#dc2626] text-sm font-medium hover:text-[#b91c1c]"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-[#344054] mb-2">
                      Identified Hazard
                    </label>
                    <TextareaInput
                      placeholder="Describe the hazard..."
                      value={item.hazard}
                      onChange={(value) => updateHazard(index, value)}
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#344054] mb-2">
                      Control Measure
                    </label>
                    <TextareaInput
                      placeholder="Describe the control measure..."
                      value={item.control}
                      onChange={(value) => updateControl(index, value)}
                      rows={2}
                    />
                  </div>

                  {/* Implemented Section */}
                  <div>
                    <label className="block text-sm font-medium text-[#344054] mb-2">
                      Has this control been implemented?
                    </label>
                    <div className="flex gap-[9px]">
                      {/* NA Button */}
                      <button
                        onClick={() => updateImplemented(index, 'na')}
                        className={`flex-1 h-11 px-3 py-2.5 rounded-xl font-semibold text-base transition-colors ${
                          item.implemented === 'na'
                            ? 'bg-[#f0fdf9] border border-[#2a6c7e] text-[#266273]'
                            : 'bg-[#f2f4f7] text-[#98a2b3]'
                        }`}
                      >
                        NA
                      </button>
                      
                      {/* NO Button */}
                      <button
                        onClick={() => updateImplemented(index, 'no')}
                        className={`flex-1 h-11 px-3 py-2.5 rounded-xl flex items-center justify-center transition-colors ${
                          item.implemented === 'no'
                            ? 'bg-[#fff9f5] border border-[#ff4405]'
                            : 'bg-[#f2f4f7]'
                        }`}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18M6 6L18 18" stroke={item.implemented === 'no' ? '#ff4405' : '#98a2b3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      
                      {/* YES Button */}
                      <button
                        onClick={() => updateImplemented(index, 'yes')}
                        className={`flex-1 h-11 px-3 py-2.5 rounded-xl flex items-center justify-center transition-colors ${
                          item.implemented === 'yes'
                            ? 'bg-[#ecfdf3] border border-[#17b26a]'
                            : 'bg-[#f2f4f7]'
                        }`}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke={item.implemented === 'yes' ? '#17b26a' : '#98a2b3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              onClick={addNewRow}
              className="w-full p-4 border-2 border-dashed border-[#d0d5dd] rounded-xl text-[#667085] text-base font-medium hover:border-[#266273] hover:text-[#266273] transition-colors"
            >
              + Add Another Hazard
            </button>
          </div>
        </div>



        {/* Note */}
        <div className="bg-[#f8f7f2] border border-[#eaf0f2] rounded-xl p-4">
          <p className="text-[#667085] text-sm leading-5 text-center">
            Step 3 continued on back of this form
          </p>
        </div>
      </div>

      {/* Bottom Button - Fixed */}
      <div className="px-5 py-3 flex-shrink-0">
        <Button
          onClick={handleNext}
          disabled={!isFormValid}
          className="w-full"
          variant={isFormValid ? 'primary' : 'secondary'}
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default PaceCardsStep3Control
