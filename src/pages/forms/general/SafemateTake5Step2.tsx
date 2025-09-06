import React, { useState } from 'react'
import { Button, TextareaInput, FileUpload } from '../../../components/ui'

interface SafemateTake5Step2Props {
  hazardsAndControls: Array<{ 
    hazard: string, 
    control: string, 
    implemented: 'yes' | 'no' | 'na' | null,
    comment?: string,
    photo?: File | null
  }>
  onNext: (hazardsAndControls: Array<{ 
    hazard: string, 
    control: string, 
    implemented: 'yes' | 'no' | 'na' | null,
    comment?: string,
    photo?: File | null
  }>) => void
  onBack: () => void
}

const SafemateTake5Step2: React.FC<SafemateTake5Step2Props> = ({
  hazardsAndControls,
  onNext,
  onBack,
}) => {
  const [hazardsAndControlsData, setHazardsAndControlsData] = useState(hazardsAndControls)

  const updateHazard = (index: number, value: string) => {
    const newHazards = [...hazardsAndControlsData]
    newHazards[index].hazard = value
    setHazardsAndControlsData(newHazards)
  }

  const updateControl = (index: number, value: string) => {
    const newHazards = [...hazardsAndControlsData]
    newHazards[index].control = value
    setHazardsAndControlsData(newHazards)
  }

  const updateImplemented = (index: number, value: 'yes' | 'no' | 'na' | null) => {
    const newHazards = [...hazardsAndControlsData]
    newHazards[index].implemented = value
    setHazardsAndControlsData(newHazards)
  }

  const updateComment = (index: number, comment: string) => {
    const newHazards = [...hazardsAndControlsData]
    newHazards[index].comment = comment
    setHazardsAndControlsData(newHazards)
  }

  const updatePhoto = (index: number, photo: File | null) => {
    const newHazards = [...hazardsAndControlsData]
    newHazards[index].photo = photo
    setHazardsAndControlsData(newHazards)
  }

  const addNewRow = () => {
    setHazardsAndControlsData(prev => [...prev, { hazard: '', control: '', implemented: null, comment: '', photo: null }])
  }

  const removeRow = (index: number) => {
    setHazardsAndControlsData(prev => prev.filter((_, i) => i !== index))
  }

  const handleNext = () => {
    onNext(hazardsAndControlsData)
  }

  const isFormValid = hazardsAndControlsData.every(item =>
    item.hazard.trim() !== '' &&
    item.control.trim() !== '' &&
    item.implemented !== null && item.implemented !== undefined
  )

  return (
    <div className="h-full flex flex-col">
      {/* Content - Scrollable */}
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
                      className="w-full"
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
                      className="w-full"
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

                  {/* Comment and Photo Section (show if answered "no") */}
                  {item.implemented === 'no' && (
                    <div className="space-y-3 pt-3 border-t border-[#eaecf0]">
                      <div>
                        <label className="block text-sm font-medium text-[#344054] mb-2">
                          Additional details
                        </label>
                        <TextareaInput
                          placeholder="Provide additional details about why this control cannot be implemented..."
                          value={item.comment || ''}
                          onChange={(value) => updateComment(index, value)}
                          rows={2}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <FileUpload
                          onFileSelect={(file) => updatePhoto(index, file)}
                          accept="image/*"
                          className="w-full"
                        />
                        
                        {/* Display uploaded photo */}
                        {item.photo && (
                          <div className="mt-2">
                            <div className="relative inline-block">
                              <img
                                src={URL.createObjectURL(item.photo)}
                                alt={`Photo for hazard ${index + 1}`}
                                className="w-24 h-24 object-cover rounded-lg border border-[#d0d5dd]"
                              />
                              <button
                                onClick={() => updatePhoto(index, null)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Alert message for unimplemented controls */}
                      <div className="bg-[#fff9f5] border border-[#ff4405] rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-[#ff4405] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          <div>
                            <h4 className="font-medium text-[#ff4405] text-sm mb-1">Control Not Implemented</h4>
                            <p className="text-[#ff4405] text-sm leading-5">
                              This control measure has not been implemented. Please ensure appropriate alternative measures are in place or re-evaluate the task safety.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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

      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="px-5 py-4 flex-shrink-0">
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

export default SafemateTake5Step2
