import React, { useState } from 'react'
import { HeaderWithClose } from '../../components/layout'
import { ExposureQuestion, WarningMessage, Button, TextareaInput, FileUpload } from '../../components/ui'

interface MyExposuresFormPageProps {
  selectedSite?: {
    id: string
    name: string
    location: string
    image: string
  }
  onBack?: () => void
  onNext?: (formData: MyExposuresFormData) => void
}

interface MyExposuresFormData {
  trainedAndCompetent: 'na' | 'no' | 'yes' | null
  workWillNotImpactOthers: 'na' | 'no' | 'yes' | null
  correctToolsAndEquipment: 'na' | 'no' | 'yes' | null
  identifiedLineOfFire: 'na' | 'no' | 'yes' | null
  canCompleteWithoutClimbing: 'na' | 'no' | 'yes' | null
  commitToPausingIfTaskChanges: 'na' | 'no' | 'yes' | null
  // Comments for each question
  trainedAndCompetentComment: string
  workWillNotImpactOthersComment: string
  correctToolsAndEquipmentComment: string
  identifiedLineOfFireComment: string
  canCompleteWithoutClimbingComment: string
  commitToPausingIfTaskChangesComment: string
  // Photos for each question
  trainedAndCompetentPhoto: File | null
  workWillNotImpactOthersPhoto: File | null
  correctToolsAndEquipmentPhoto: File | null
  identifiedLineOfFirePhoto: File | null
  canCompleteWithoutClimbingPhoto: File | null
  commitToPausingIfTaskChangesPhoto: File | null
}

const MyExposuresFormPage: React.FC<MyExposuresFormPageProps> = ({
  selectedSite,
  onBack,
  onNext,
}) => {
  const [formData, setFormData] = useState<MyExposuresFormData>({
    trainedAndCompetent: null,
    workWillNotImpactOthers: null,
    correctToolsAndEquipment: null,
    identifiedLineOfFire: null,
    canCompleteWithoutClimbing: null,
    commitToPausingIfTaskChanges: null,
    // Comments for each question
    trainedAndCompetentComment: '',
    workWillNotImpactOthersComment: '',
    correctToolsAndEquipmentComment: '',
    identifiedLineOfFireComment: '',
    canCompleteWithoutClimbingComment: '',
    commitToPausingIfTaskChangesComment: '',
    // Photos for each question
    trainedAndCompetentPhoto: null,
    workWillNotImpactOthersPhoto: null,
    correctToolsAndEquipmentPhoto: null,
    identifiedLineOfFirePhoto: null,
    canCompleteWithoutClimbingPhoto: null,
    commitToPausingIfTaskChangesPhoto: null,
  })

  const handleQuestionChange = (questionKey: keyof MyExposuresFormData, value: 'na' | 'no' | 'yes') => {
    setFormData(prev => ({ ...prev, [questionKey]: value }))
  }

  const handleCommentChange = (commentKey: keyof MyExposuresFormData, value: string) => {
    setFormData(prev => ({ ...prev, [commentKey]: value }))
  }

  const handlePhotoChange = (photoKey: keyof MyExposuresFormData, file: File) => {
    setFormData(prev => ({ ...prev, [photoKey]: file }))
  }

  const handleNext = () => {
    console.log('My Exposures form data:', formData)
    onNext?.(formData)
  }

  const handleBack = () => {
    console.log('Back to previous step')
    onBack?.()
  }

  // Check if all questions are answered (only the main question fields)
  const allQuestionsAnswered = Object.values({
    trainedAndCompetent: formData.trainedAndCompetent,
    workWillNotImpactOthers: formData.workWillNotImpactOthers,
    correctToolsAndEquipment: formData.correctToolsAndEquipment,
    identifiedLineOfFire: formData.identifiedLineOfFire,
    canCompleteWithoutClimbing: formData.canCompleteWithoutClimbing,
    commitToPausingIfTaskChanges: formData.commitToPausingIfTaskChanges,
  }).every(value => value !== null)

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithClose
        title="Take Control"
        progress="2/4"
        onClose={onBack}
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-5 overflow-y-auto">
        {/* My Exposures Title */}
        <div className="text-center">
          <h2 className="font-bold text-[#266273] text-lg leading-7">
            My Exposures
          </h2>
        </div>

        {/* Exposure Questions */}
        <div className="space-y-6">
          {/* Question 1: Just comment and alert */}
          <ExposureQuestion
            question="I am trained and competent for this task"
            value={formData.trainedAndCompetent}
            onChange={(value) => handleQuestionChange('trainedAndCompetent', value)}
            showComment={true}
            showAlert={true}
            commentValue={formData.trainedAndCompetentComment}
            onCommentChange={(value) => handleCommentChange('trainedAndCompetentComment', value)}
          />

          {/* Question 2: Photo and comment and alert */}
          <ExposureQuestion
            question="I have made sure my work will not impact upon others"
            value={formData.workWillNotImpactOthers}
            onChange={(value) => handleQuestionChange('workWillNotImpactOthers', value)}
            showPhoto={true}
            showComment={true}
            showAlert={true}
            commentValue={formData.workWillNotImpactOthersComment}
            onCommentChange={(value) => handleCommentChange('workWillNotImpactOthersComment', value)}
            onPhotoSelect={(file) => handlePhotoChange('workWillNotImpactOthersPhoto', file)}
          />

          {/* Question 3: Photo and comment and alert */}
          <ExposureQuestion
            question="I have the correct tools and equipment"
            value={formData.correctToolsAndEquipment}
            onChange={(value) => handleQuestionChange('correctToolsAndEquipment', value)}
            showPhoto={true}
            showComment={true}
            showAlert={true}
            commentValue={formData.correctToolsAndEquipmentComment}
            onCommentChange={(value) => handleCommentChange('correctToolsAndEquipmentComment', value)}
            onPhotoSelect={(file) => handlePhotoChange('correctToolsAndEquipmentPhoto', file)}
          />

          {/* Question 4: Photo and comment and alert */}
          <ExposureQuestion
            question="I have identified my line of fire exposures"
            value={formData.identifiedLineOfFire}
            onChange={(value) => handleQuestionChange('identifiedLineOfFire', value)}
            showPhoto={true}
            showComment={true}
            showAlert={true}
            commentValue={formData.identifiedLineOfFireComment}
            onCommentChange={(value) => handleCommentChange('identifiedLineOfFireComment', value)}
            onPhotoSelect={(file) => handlePhotoChange('identifiedLineOfFirePhoto', file)}
          />

          {/* Question 5: Photo and comment and alert */}
          <ExposureQuestion
            question="I can complete this task without climbing"
            value={formData.canCompleteWithoutClimbing}
            onChange={(value) => handleQuestionChange('canCompleteWithoutClimbing', value)}
            showPhoto={true}
            showComment={true}
            showAlert={true}
            commentValue={formData.canCompleteWithoutClimbingComment}
            onCommentChange={(value) => handleCommentChange('canCompleteWithoutClimbingComment', value)}
            onPhotoSelect={(file) => handlePhotoChange('canCompleteWithoutClimbingPhoto', file)}
          />

          {/* Question 6: Just comment and alert */}
          <ExposureQuestion
            question="I commit to pausing if the task changes"
            value={formData.commitToPausingIfTaskChanges}
            onChange={(value) => handleQuestionChange('commitToPausingIfTaskChanges', value)}
            showComment={true}
            showAlert={true}
            commentValue={formData.commitToPausingIfTaskChangesComment}
            onCommentChange={(value) => handleCommentChange('commitToPausingIfTaskChangesComment', value)}
          />
        </div>
      </div>

      {/* Bottom Buttons - Fixed */}
      <div className="px-5 py-3 flex-shrink-0">
        <div className="flex gap-4">
          <Button
            onClick={handleBack}
            variant="secondary"
            className="flex-1"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!allQuestionsAnswered}
            className="flex-1"
            variant={allQuestionsAnswered ? 'primary' : 'secondary'}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MyExposuresFormPage 