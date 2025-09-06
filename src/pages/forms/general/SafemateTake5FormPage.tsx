import React, { useState } from 'react'
import { HeaderWithClose } from '../../../components/layout'
import { Button } from '../../../components/ui'

import SafemateTake5Step1 from './SafemateTake5Step1'
import SafemateTake5Step2 from './SafemateTake5Step2'
import SafemateTake5Step3 from './SafemateTake5Step3'
import SafemateTake5Step5 from './SafemateTake5Step5'

interface SafemateTake5FormPageProps {
  selectedSite?: {
    id: string
    name: string
    location: string
    image: string
  }
  onBack?: () => void
  onNext?: (formData: SafemateTake5FormData) => void
}

interface SafemateTake5FormData {
  taskToday: string
  whyWorkSafe: string
  photos: File[]
  hazardsAndControls: Array<{ 
    hazard: string, 
    control: string, 
    implemented: 'yes' | 'no' | 'na' | null,
    comment?: string,
    photo?: File | null
  }>
  exposureAnswers: { [key: string]: 'yes' | 'no' | 'na' }
  exposureComments: { [key: string]: string }
  exposurePhotos: { [key: string]: File | null }
  selectedCompany: string
  otherCompany: string
  firstName: string
  lastName: string
  signature: string
}

const SafemateTake5FormPage: React.FC<SafemateTake5FormPageProps> = ({
  selectedSite,
  onBack,
  onNext,
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<SafemateTake5FormData>({
    taskToday: '',
    whyWorkSafe: '',
    photos: [],
    hazardsAndControls: [{ hazard: '', control: '', implemented: null, comment: '', photo: null }],
    exposureAnswers: {},
    exposureComments: {},
    exposurePhotos: {},
    selectedCompany: '',
    otherCompany: '',
    firstName: '',
    lastName: '',
    signature: '',
  })

  const handleStep1Complete = (task: string, photos: File[], whyWorkSafe: string) => {
    setFormData(prev => ({ ...prev, taskToday: task, photos, whyWorkSafe }))
    setCurrentStep(2)
  }

  const handleStep2Complete = (exposureAnswers: { [key: string]: 'yes' | 'no' | 'na' }, exposureComments: { [key: string]: string }, exposurePhotos: { [key: string]: File | null }) => {
    setFormData(prev => ({ ...prev, exposureAnswers, exposureComments, exposurePhotos }))
    setCurrentStep(3)
  }

  const handleStep3Complete = (hazardsAndControls: Array<{ hazard: string, control: string, implemented: 'yes' | 'no' | 'na' | null, comment?: string, photo?: File | null }>) => {
    setFormData(prev => ({ ...prev, hazardsAndControls }))
    setCurrentStep(4)
  }

  const handleStep4Complete = (selectedCompany: string, otherCompany: string, firstName: string, lastName: string, signature: string) => {
    setFormData(prev => ({ ...prev, selectedCompany, otherCompany, firstName, lastName, signature }))
    console.log('Safemate Take 5 form completed:', formData)
    onNext?.(formData)
  }

  const handleClose = () => {
    console.log('Close form')
    onBack?.()
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Take 5'
      case 2: return 'My Exposures'
      case 3: return 'Control Hazards'
      case 4: return 'Submit'
      default: return 'Take 5'
    }
  }

  const getProgress = () => {
    return `${currentStep}/4`
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SafemateTake5Step1
            task={formData.taskToday}
            photos={formData.photos}
            whyWorkSafe={formData.whyWorkSafe}
            onNext={handleStep1Complete}
            onBack={handleClose}
          />
        )
      case 2:
        return (
          <SafemateTake5Step3
            exposureAnswers={formData.exposureAnswers}
            exposureComments={formData.exposureComments}
            exposurePhotos={formData.exposurePhotos}
            onNext={handleStep2Complete}
            onBack={handlePrevious}
          />
        )
      case 3:
        return (
          <SafemateTake5Step2
            hazardsAndControls={formData.hazardsAndControls}
            onNext={handleStep3Complete}
            onBack={handlePrevious}
          />
        )
      case 4:
        return (
          <SafemateTake5Step5
            selectedCompany={formData.selectedCompany}
            otherCompany={formData.otherCompany}
            firstName={formData.firstName}
            lastName={formData.lastName}
            signature={formData.signature}
            onNext={handleStep4Complete}
            onBack={handlePrevious}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithClose
        title={`Take 5 - ${getStepTitle()}`}
        progress={getProgress()}
        onClose={handleClose}
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {renderCurrentStep()}
      </div>
    </div>
  )
}

export default SafemateTake5FormPage
