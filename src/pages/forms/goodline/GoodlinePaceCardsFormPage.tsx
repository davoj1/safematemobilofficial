import React, { useState } from 'react'
import { HeaderWithBack } from '../../../components/layout'

import PaceCardsStep1Plan from './PaceCardsStep1Plan'
import PaceCardsStep2Assess from './PaceCardsStep2Assess'
import PaceCardsStep3Control from './PaceCardsStep3Control'
import PaceCardsStep4Execute from './PaceCardsStep4Execute'
import PaceCardsSubmission from './PaceCardsSubmission'

interface PaceCardsFormData {
  // Step 1: Plan
  task: string
  planAnswers: {
    [key: string]: 'yes' | 'no' | 'na'
  }
  
  // Step 2: Assess
  selectedHazards: string[]
  likelihood: string
  consequence: string
  riskRating: string
  
  // Step 3: Control
  hazardsAndControls: Array<{
    hazard: string
    control: string
    implemented: 'yes' | 'no' | 'na'
  }>
  
  // Step 4: Execute
  executeAnswers: {
    [key: string]: 'yes' | 'no' | 'na'
  }
}

interface PaceCardsSubmissionData {
  selectedCompany: string
  selectedSupervisor: string
  firstName: string
  lastName: string
  signature: string
}

interface GoodlinePaceCardsFormPageProps {
  selectedSite?: {
    id: string
    name: string
    location: string
    image: string
  }
  onBack?: () => void
  onNext?: (formData: PaceCardsFormData, submissionData: PaceCardsSubmissionData) => void
}

const GoodlinePaceCardsFormPage: React.FC<GoodlinePaceCardsFormPageProps> = ({
  selectedSite,
  onBack,
  onNext,
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<PaceCardsFormData>({
    task: '',
    planAnswers: {},
    selectedHazards: [],
    likelihood: '',
    consequence: '',
    riskRating: '',
    hazardsAndControls: [{ hazard: '', control: '', implemented: 'na' }],
    executeAnswers: {},
  })

  const handleStep1Complete = (task: string, planAnswers: { [key: string]: 'yes' | 'no' | 'na' }) => {
    setFormData(prev => ({ ...prev, task, planAnswers }))
    setCurrentStep(2)
  }

  const handleStep2Complete = (selectedHazards: string[], likelihood: string, consequence: string, riskRating: string) => {
    setFormData(prev => ({ ...prev, selectedHazards, likelihood, consequence, riskRating }))
    setCurrentStep(3)
  }

  const handleStep3Complete = (hazardsAndControls: Array<{ hazard: string, control: string, implemented: 'yes' | 'no' | 'na' }>) => {
    setFormData(prev => ({ ...prev, hazardsAndControls }))
    setCurrentStep(4)
  }

  const handleStep4Complete = (executeAnswers: { [key: string]: 'yes' | 'no' | 'na' }) => {
    setFormData(prev => ({ ...prev, executeAnswers }))
    setCurrentStep(5)
  }

  const handleSubmissionComplete = (submissionData: PaceCardsSubmissionData) => {
    console.log('Pace Cards form completed:', formData)
    console.log('Pace Cards submission data:', submissionData)
    onNext?.(formData, submissionData)
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      console.log('Back to form selection')
      onBack?.()
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Plan'
      case 2: return 'Assess'
      case 3: return 'Control'
      case 4: return 'Execute'
      case 5: return 'Submit'
      default: return 'Pace Cards'
    }
  }

  const getProgress = () => {
    return `${currentStep}/5`
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PaceCardsStep1Plan
            task={formData.task}
            planAnswers={formData.planAnswers}
            onNext={handleStep1Complete}
            onBack={handleBack}
          />
        )
      case 2:
        return (
          <PaceCardsStep2Assess
            selectedHazards={formData.selectedHazards}
            likelihood={formData.likelihood}
            consequence={formData.consequence}
            riskRating={formData.riskRating}
            onNext={handleStep2Complete}
            onBack={handleBack}
          />
        )
      case 3:
        return (
          <PaceCardsStep3Control
            hazardsAndControls={formData.hazardsAndControls}
            onNext={handleStep3Complete}
            onBack={handleBack}
          />
        )
      case 4:
        return (
          <PaceCardsStep4Execute
            executeAnswers={formData.executeAnswers}
            onNext={handleStep4Complete}
            onBack={handleBack}
          />
        )
      case 5:
        return (
          <PaceCardsSubmission
            selectedSite={selectedSite}
            onNext={handleSubmissionComplete}
            onBack={handleBack}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithBack
        title={`Pace Cards - ${getStepTitle()}`}
        progress={getProgress()}
        onBack={handleBack}
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {renderCurrentStep()}
      </div>
    </div>
  )
}

export default GoodlinePaceCardsFormPage
