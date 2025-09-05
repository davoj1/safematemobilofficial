import React, { useState } from 'react'
import { HeaderWithBack } from '../../../components/layout'
import { TextareaInput, FileUpload, Button } from '../../../components/ui'
import monaLogo from '../../../assets/companylogo/monalogo.svg'

interface MonadelphousTakeControlFormPageProps {
  selectedSite?: {
    id: string
    name: string
    location: string
    image: string
  }
  onBack?: () => void
  onNext?: (formData: MonadelphousTakeControlFormData) => void
}

interface MonadelphousTakeControlFormData {
  taskToday: string
  howWillTakeControl: string
  photos: File[]
  monadelphousSpecificField: string
}

const MonadelphousTakeControlFormPage: React.FC<MonadelphousTakeControlFormPageProps> = ({
  selectedSite,
  onBack,
  onNext,
}) => {
  const [formData, setFormData] = useState<MonadelphousTakeControlFormData>({
    taskToday: '',
    howWillTakeControl: '',
    photos: [],
    monadelphousSpecificField: '',
  })

  const handleTaskTodayChange = (value: string) => {
    setFormData(prev => ({ ...prev, taskToday: value }))
  }

  const handleHowWillTakeControlChange = (value: string) => {
    setFormData(prev => ({ ...prev, howWillTakeControl: value }))
  }

  const handleMonadelphousSpecificChange = (value: string) => {
    setFormData(prev => ({ ...prev, monadelphousSpecificField: value }))
  }

  const handlePhotoUpload = (file: File) => {
    setFormData(prev => ({ ...prev, photos: [...prev.photos, file] }))
  }

  const handleNext = () => {
    console.log('Monadelphous Take Control form data:', formData)
    onNext?.(formData)
  }

  const handleBack = () => {
    console.log('Back to form selection')
    onBack?.()
  }

  const isFormValid = formData.taskToday.trim() !== '' && 
                     formData.howWillTakeControl.trim() !== '' &&
                     formData.monadelphousSpecificField.trim() !== ''

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithBack
        title="Monadelphous Take Control"
        progress="1/4"
        onBack={handleBack}
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-4 overflow-y-auto">
        {/* Company Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={monaLogo}
            alt="Monadelphous"
            className="h-12 w-auto"
          />
        </div>

        {/* Your task Today */}
        <div className="space-y-2">
          <h2 className="font-bold text-[#266273] text-lg leading-7 text-center">
            Your task Today
          </h2>
          <TextareaInput
            placeholder="Describe your task today..."
            value={formData.taskToday}
            onChange={handleTaskTodayChange}
            rows={3}
          />
        </div>

        {/* How I Will Take Control */}
        <div className="space-y-2">
          <h2 className="font-bold text-[#266273] text-lg leading-7 text-center">
            How I Will Take Control
          </h2>
          <TextareaInput
            placeholder="Describe how you will ensure your task remains safe..."
            value={formData.howWillTakeControl}
            onChange={handleHowWillTakeControlChange}
            rows={3}
          />
        </div>

        {/* Monadelphous Specific Field */}
        <div className="space-y-2">
          <h2 className="font-bold text-[#266273] text-lg leading-7 text-center">
            Monadelphous Safety Standards
          </h2>
          <TextareaInput
            placeholder="Describe any Monadelphous-specific safety standards..."
            value={formData.monadelphousSpecificField}
            onChange={handleMonadelphousSpecificChange}
            rows={3}
          />
        </div>

        {/* Add Photos */}
        <FileUpload
          onFileSelect={handlePhotoUpload}
        />
      </div>

      {/* Footer - Fixed */}
      <div className="flex-shrink-0 px-5 py-4">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleNext}
          disabled={!isFormValid}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

export default MonadelphousTakeControlFormPage
