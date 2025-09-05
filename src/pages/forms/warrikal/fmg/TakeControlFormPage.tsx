import React, { useState } from 'react'
import { HeaderWithBack } from '../../../../components/layout'
import { TextareaInput, FileUpload, Button } from '../../../../components/ui'

interface TakeControlFormPageProps {
  selectedSite?: {
    id: string
    name: string
    location: string
    image: string
  }
  onBack?: () => void
  onNext?: (formData: TakeControlFormData) => void
}

interface TakeControlFormData {
  taskToday: string
  howWillTakeControl: string
  photos: File[]
}

const TakeControlFormPage: React.FC<TakeControlFormPageProps> = ({
  selectedSite,
  onBack,
  onNext,
}) => {
  const [formData, setFormData] = useState<TakeControlFormData>({
    taskToday: '',
    howWillTakeControl: '',
    photos: [],
  })

  const handleTaskTodayChange = (value: string) => {
    setFormData(prev => ({ ...prev, taskToday: value }))
  }

  const handleHowWillTakeControlChange = (value: string) => {
    setFormData(prev => ({ ...prev, howWillTakeControl: value }))
  }

  const handlePhotoUpload = (file: File) => {
    setFormData(prev => ({ ...prev, photos: [...prev.photos, file] }))
  }

  const handleNext = () => {
    console.log('Take Control form data:', formData)
    onNext?.(formData)
  }

  const handleBack = () => {
    console.log('Back to form selection')
    onBack?.()
  }

  const isFormValid = formData.taskToday.trim() !== '' && formData.howWillTakeControl.trim() !== ''

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithBack
        title="Take Control"
        progress="1/4"
        onBack={handleBack}
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-4 overflow-y-auto">
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

        {/* Add Photos */}
        <FileUpload
          onFileSelect={handlePhotoUpload}
        />
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
    </div>
  )
}

export default TakeControlFormPage 