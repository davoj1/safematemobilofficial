import React, { useState } from 'react'
import { HeaderWithBack } from '../../../components/layout'
import GoodlineFatigueStep1Page from './GoodlineFatigueStep1Page'
import GoodlineFatigueStep2Page from './GoodlineFatigueStep2Page'
import GoodlineFatigueStep3Page from './GoodlineFatigueStep3Page'
import GoodlineFatigueStep4Page from './GoodlineFatigueStep4Page'
import GoodlineFatigueStep5Page from './GoodlineFatigueStep5Page'
import GoodlineFatigueSummaryPage from './GoodlineFatigueSummaryPage'

interface GoodlineFatigueFormData {
  // Step 1: Fitness for Duty
  fitForWork: string
  unreportedMedication: string
  workFromHome: string
  workFromHomeApproved: string
  fitForWorkComment: string
  unreportedMedicationComment: string
  
  // Step 2: Rest & Alertness
  hoursSlept: string
  feelingAlert: string
  feelingAlertComment: string
  
  // Step 3: Hydration & Alcohol
  waterIntake: string
  alcoholIntake: string
  breathTest: string
  
  // Step 4: Wellbeing
  stressedOrDistracted: string
  sickOrFlu: string
  stressedComment: string
  sickComment: string
  
  // Step 5: Submission
  firstName: string
  lastName: string
  signature: string
}

interface GoodlineFatigueFormPageProps {
  mineCompany?: 'bhp' | 'fmg'
  selectedSite?: {
    id: string
    name: string
    location: string
    image: string
  }
  onBack?: () => void
  onNext?: (formData: GoodlineFatigueFormData) => void
}

const GoodlineFatigueFormPage: React.FC<GoodlineFatigueFormPageProps> = ({
  mineCompany = 'fmg',
  selectedSite,
  onBack,
  onNext,
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<GoodlineFatigueFormData>({
    fitForWork: '',
    unreportedMedication: '',
    workFromHome: '',
    workFromHomeApproved: '',
    fitForWorkComment: '',
    unreportedMedicationComment: '',
    hoursSlept: '',
    feelingAlert: '',
    feelingAlertComment: '',
    waterIntake: '',
    alcoholIntake: '',
    breathTest: '',
    stressedOrDistracted: '',
    sickOrFlu: '',
    stressedComment: '',
    sickComment: '',
    firstName: '',
    lastName: '',
    signature: '',
  })

  const handleStep1Complete = (fitForWork: string, unreportedMedication: string, workFromHome: string, workFromHomeApproved: string, fitForWorkComment: string, unreportedMedicationComment: string) => {
    setFormData(prev => ({ ...prev, fitForWork, unreportedMedication, workFromHome, workFromHomeApproved, fitForWorkComment, unreportedMedicationComment }))
    setCurrentStep(2)
  }

  const handleStep2Complete = (hoursSlept: string, feelingAlert: string, feelingAlertComment: string) => {
    setFormData(prev => ({ ...prev, hoursSlept, feelingAlert, feelingAlertComment }))
    setCurrentStep(3)
  }

  const handleStep3Complete = (waterIntake: string, alcoholIntake: string, breathTest: string) => {
    setFormData(prev => ({ ...prev, waterIntake, alcoholIntake, breathTest }))
    setCurrentStep(4)
  }

  const handleStep4Complete = (stressedOrDistracted: string, sickOrFlu: string, stressedComment: string, sickComment: string) => {
    setFormData(prev => ({ ...prev, stressedOrDistracted, sickOrFlu, stressedComment, sickComment }))
    setCurrentStep(5)
  }

  const handleStep5Complete = () => {
    console.log('Goodline Fatigue form completed:', formData)
    setCurrentStep(6) // Navigate to summary page
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      console.log('Back to form selection')
      onBack?.()
    }
  }

  const handleClose = () => {
    console.log('Close form')
    onBack?.()
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Fitness for Duty'
      case 2: return 'Rest & Alertness'
      case 3: return 'Hydration & Alcohol'
      case 4: return 'Wellbeing'
      case 5: return 'Submission'
      case 6: return 'Summary'
      default: return 'Goodline Fatigue Form'
    }
  }

  const getProgress = () => {
    return `${currentStep}/6`
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <GoodlineFatigueStep1Page
            onNext={handleStep1Complete}
            onBack={handleBack}
          />
        )
      case 2:
        return (
          <GoodlineFatigueStep2Page
            onNext={handleStep2Complete}
            onBack={handleBack}
            onClose={handleClose}
          />
        )
      case 3:
        return (
          <GoodlineFatigueStep3Page
            onNext={handleStep3Complete}
            onBack={handleBack}
            onClose={handleClose}
          />
        )
      case 4:
        return (
          <GoodlineFatigueStep4Page
            onNext={handleStep4Complete}
            onBack={handleBack}
            onClose={handleClose}
          />
        )
      case 5:
        return (
          <GoodlineFatigueStep5Page
            onNext={handleStep5Complete}
            onBack={handleBack}
            onClose={handleClose}
          />
        )
      case 6:
        return (
          <GoodlineFatigueSummaryPage
            onBack={handleBack}
            onSubmit={() => onNext?.(formData)}
            mineCompany={mineCompany}
            selectedSite={selectedSite}
            formData={formData}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {renderCurrentStep()}
    </div>
  )
}

export default GoodlineFatigueFormPage
