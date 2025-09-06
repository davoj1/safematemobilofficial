import React, { useState } from 'react'
import { HeaderWithBack } from '../../../components/layout'
import { Button, TextareaInput } from '../../../components/ui'
import { cn } from '../../../utils/cn'

interface ReportHazardStep1Data {
  hazardPhotos: File[]
  hazardDescription: string
}

interface ReportHazardStep1PageProps {
  selectedSite?: {
    id: string
    name: string
    location: string
    image: string
  }
  onBack?: () => void
  onNext?: (data: ReportHazardStep1Data) => void
}

const ReportHazardStep1Page: React.FC<ReportHazardStep1PageProps> = ({
  selectedSite,
  onBack,
  onNext,
}) => {
  const [formData, setFormData] = useState<ReportHazardStep1Data>({
    hazardPhotos: [],
    hazardDescription: '',
  })
  const [showPhotoGallery, setShowPhotoGallery] = useState(false)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData(prev => ({ ...prev, hazardPhotos: [...prev.hazardPhotos, ...files] }))
  }

  const removePhoto = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      hazardPhotos: prev.hazardPhotos.filter((_, i) => i !== index) 
    }))
  }

  const openPhotoGallery = (index: number) => {
    setSelectedPhotoIndex(index)
    setShowPhotoGallery(true)
  }

  const closePhotoGallery = () => {
    setShowPhotoGallery(false)
  }

  const nextPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev + 1) % formData.hazardPhotos.length)
  }

  const prevPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev - 1 + formData.hazardPhotos.length) % formData.hazardPhotos.length)
  }

  const handleDescriptionChange = (value: string) => {
    setFormData(prev => ({ ...prev, hazardDescription: value }))
  }

  const handleNext = () => {
    console.log('Report Hazard Step 1 data:', formData)
    onNext?.(formData)
  }

  const handleBack = () => {
    console.log('Back to form selection')
    onBack?.()
  }

  const isFormValid = formData.hazardPhotos.length > 0 && formData.hazardDescription.trim() !== ''

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithBack
        title="Report a Hazard"
        progress="1/3"
        onBack={handleBack}
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto">
        {/* Step Title */}
        <div className="text-center space-y-2">
          <h1 className="font-bold text-[#266273] text-xl leading-7">
            Identify the Hazard
          </h1>
          <p className="text-[#667085] text-base font-normal leading-6">
            Take a photo and describe the hazard you've identified
          </p>
        </div>

        {/* Photo Upload */}
        <div className="space-y-3">
          <h2 className="font-semibold text-[#344054] text-base leading-6">
            Photos *
          </h2>
          
          {/* Upload Button */}
          <div className="relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-full p-4 border-2 border-dashed border-[#eaecf0] rounded-[20px] text-center hover:border-[#266273] transition-colors">
              <svg className="w-8 h-8 text-[#667085] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <p className="text-sm text-[#667085]">Tap to add photos</p>
              <p className="text-xs text-[#667085] mt-1">Upload multiple images</p>
            </div>
          </div>

          {/* Photo Preview */}
          {formData.hazardPhotos.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-[#667085]">Uploaded photos ({formData.hazardPhotos.length})</p>
              <div className="space-y-2">
                {formData.hazardPhotos.map((photo, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-[#f8f9fa] rounded-[12px] border border-[#eaecf0]">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Preview ${index + 1}`}
                      className="w-12 h-12 object-cover rounded-[8px] cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => openPhotoGallery(index)}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#101828] truncate">{photo.name}</p>
                      <p className="text-xs text-[#667085]">
                        {(photo.size / 1024 / 1024).toFixed(1)} MB
                      </p>
                    </div>
                    <button
                      onClick={() => removePhoto(index)}
                      className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-100 transition-colors"
                    >
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Description Section */}
        <div className="space-y-4">
          <h2 className="font-semibold text-[#344054] text-base leading-6">
            Hazard Information
          </h2>
          <TextareaInput
            placeholder="Describe the hazard you've identified"
            value={formData.hazardDescription}
            onChange={handleDescriptionChange}
            rows={4}
          />
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-[#ff692e] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-[#667085] text-sm leading-5">
              Be specific about the location, type of hazard, and potential risks to help others understand and address the issue.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Button - Fixed */}
      <div className="px-5 py-4 flex-shrink-0">
        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          disabled={!isFormValid}
          className="w-full"
        >
          Next
        </Button>
      </div>

      {/* Photo Gallery Modal */}
      {showPhotoGallery && formData.hazardPhotos.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close button */}
            <button
              onClick={closePhotoGallery}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation arrows */}
            {formData.hazardPhotos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 z-10 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 z-10 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Photo display */}
            <div className="max-w-full max-h-full flex items-center justify-center">
              <img
                src={URL.createObjectURL(formData.hazardPhotos[selectedPhotoIndex])}
                alt={`Photo ${selectedPhotoIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>

            {/* Photo counter */}
            {formData.hazardPhotos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {selectedPhotoIndex + 1} / {formData.hazardPhotos.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ReportHazardStep1Page 