import React, { useState } from 'react'
import { HeaderWithBack } from '../../components/layout'
import { Button, FileUpload, TextareaInput } from '../../components/ui'

interface ReportHazardStep1Data {
  hazardPhoto: File | null
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
    hazardPhoto: null,
    hazardDescription: '',
  })

  const handlePhotoUpload = (file: File) => {
    setFormData(prev => ({ ...prev, hazardPhoto: file }))
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

  const isFormValid = formData.hazardPhoto && formData.hazardDescription.trim() !== ''

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

        {/* Add Photos */}
        <FileUpload
          onFileSelect={handlePhotoUpload}
        />

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
    </div>
  )
}

export default ReportHazardStep1Page 