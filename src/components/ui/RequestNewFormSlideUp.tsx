import React, { useState } from 'react'
import { Button } from './index'

interface RequestNewFormSlideUpProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (payload: { formName: string, description: string, photos: File[] }) => void
}

const RequestNewFormSlideUp: React.FC<RequestNewFormSlideUpProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formName, setFormName] = useState('')
  const [description, setDescription] = useState('')
  const [photos, setPhotos] = useState<File[]>([])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setPhotos(prev => [...prev, ...files].slice(0, 5)) // Limit to 5 photos
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const resetAndClose = () => {
    setFormName('')
    setDescription('')
    setPhotos([])
    onClose()
  }

  const handleSubmit = () => {
    if (!formName.trim()) return
    
    onSubmit({ 
      formName: formName.trim(),
      description: description.trim(),
      photos
    })
    resetAndClose()
  }

  const isFormValid = formName.trim().length > 0

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
            Request New Form
          </h2>
          <p className="text-sm text-[#667085] mt-0.5">Tell us what form you need and we'll create it</p>
        </div>

        <div className="flex-1 overflow-y-auto px-1 py-2 space-y-6">
          {/* Form Name Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#101828]">Form Name *</h3>
            <div className="space-y-2">
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Enter the name of the form you need..."
                className="w-full p-3 border border-[#d0d5dd] rounded-xl text-sm text-[#101828] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent"
                maxLength={100}
              />
              <div className="text-right text-xs text-[#667085]">
                {formName.length}/100 characters
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#101828]">Description & Requirements</h3>
            <div className="space-y-2">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this form should capture, what fields are needed, how it will be used, etc..."
                className="w-full p-3 border border-[#d0d5dd] rounded-xl text-sm text-[#101828] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent resize-none"
                rows={4}
                maxLength={500}
              />
              <div className="text-right text-xs text-[#667085]">
                {description.length}/500 characters
              </div>
            </div>
          </div>

          {/* Photo Upload Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#101828]">Reference Photos (Optional)</h3>
            <p className="text-xs text-[#667085]">
              Upload examples of existing forms, sketches, or reference materials
            </p>
            
            {/* Upload Button */}
            <div className="space-y-3">
              <label className="block">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={photos.length >= 5}
                />
                <div className={`w-full p-4 border-2 border-dashed rounded-xl text-center transition-colors cursor-pointer ${
                  photos.length >= 5 
                    ? 'border-[#d0d5dd] bg-[#f8f9fa] text-[#667085] cursor-not-allowed'
                    : 'border-[#266273] bg-[#f0f9ff] text-[#266273] hover:bg-[#e0f2fe]'
                }`}>
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <div className="text-sm font-medium">
                      {photos.length >= 5 ? 'Maximum 5 photos' : 'Add Reference Photos'}
                    </div>
                    {photos.length < 5 && (
                      <div className="text-xs text-[#667085]">
                        Tap to upload examples or sketches
                      </div>
                    )}
                  </div>
                </div>
              </label>

              {/* Photo Previews */}
              {photos.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-[#667085]">Uploaded photos ({photos.length}/5)</p>
                  <div className="grid grid-cols-2 gap-2">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Reference ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-[#eaecf0]"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Help Text */}
          <div className="bg-[#f0f9ff] border border-[#bfdbfe] rounded-xl p-3">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-[#266273] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-[#101828] mb-1">How it works</h4>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Our team will review your request and create a custom form based on your requirements. 
                  You'll be notified once the new form is available in your forms list.
                </p>
              </div>
            </div>
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
            Submit Request
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RequestNewFormSlideUp

