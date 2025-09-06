import React, { useState } from 'react'
import { Button, ExposureQuestion } from '../../../components/ui'

interface SafemateTake5Step3Props {
  exposureAnswers: { [key: string]: 'yes' | 'no' | 'na' }
  exposureComments: { [key: string]: string }
  exposurePhotos: { [key: string]: File | null }
  onNext: (exposureAnswers: { [key: string]: 'yes' | 'no' | 'na' }, exposureComments: { [key: string]: string }, exposurePhotos: { [key: string]: File | null }) => void
  onBack: () => void
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

const SafemateTake5Step3: React.FC<SafemateTake5Step3Props> = ({
  exposureAnswers,
  exposureComments,
  exposurePhotos,
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState<MyExposuresFormData>({
    trainedAndCompetent: (exposureAnswers.trainedAndCompetent as 'na' | 'no' | 'yes') || null,
    workWillNotImpactOthers: (exposureAnswers.workWillNotImpactOthers as 'na' | 'no' | 'yes') || null,
    correctToolsAndEquipment: (exposureAnswers.correctToolsAndEquipment as 'na' | 'no' | 'yes') || null,
    identifiedLineOfFire: (exposureAnswers.identifiedLineOfFire as 'na' | 'no' | 'yes') || null,
    canCompleteWithoutClimbing: (exposureAnswers.canCompleteWithoutClimbing as 'na' | 'no' | 'yes') || null,
    commitToPausingIfTaskChanges: (exposureAnswers.commitToPausingIfTaskChanges as 'na' | 'no' | 'yes') || null,
    // Comments for each question
    trainedAndCompetentComment: exposureComments.trainedAndCompetentComment || '',
    workWillNotImpactOthersComment: exposureComments.workWillNotImpactOthersComment || '',
    correctToolsAndEquipmentComment: exposureComments.correctToolsAndEquipmentComment || '',
    identifiedLineOfFireComment: exposureComments.identifiedLineOfFireComment || '',
    canCompleteWithoutClimbingComment: exposureComments.canCompleteWithoutClimbingComment || '',
    commitToPausingIfTaskChangesComment: exposureComments.commitToPausingIfTaskChangesComment || '',
    // Photos for each question
    trainedAndCompetentPhoto: exposurePhotos.trainedAndCompetentPhoto || null,
    workWillNotImpactOthersPhoto: exposurePhotos.workWillNotImpactOthersPhoto || null,
    correctToolsAndEquipmentPhoto: exposurePhotos.correctToolsAndEquipmentPhoto || null,
    identifiedLineOfFirePhoto: exposurePhotos.identifiedLineOfFirePhoto || null,
    canCompleteWithoutClimbingPhoto: exposurePhotos.canCompleteWithoutClimbingPhoto || null,
    commitToPausingIfTaskChangesPhoto: exposurePhotos.commitToPausingIfTaskChangesPhoto || null,
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
    const answers = {
      trainedAndCompetent: formData.trainedAndCompetent || 'na',
      workWillNotImpactOthers: formData.workWillNotImpactOthers || 'na',
      correctToolsAndEquipment: formData.correctToolsAndEquipment || 'na',
      identifiedLineOfFire: formData.identifiedLineOfFire || 'na',
      canCompleteWithoutClimbing: formData.canCompleteWithoutClimbing || 'na',
      commitToPausingIfTaskChanges: formData.commitToPausingIfTaskChanges || 'na',
    }
    
    const comments = {
      trainedAndCompetentComment: formData.trainedAndCompetentComment,
      workWillNotImpactOthersComment: formData.workWillNotImpactOthersComment,
      correctToolsAndEquipmentComment: formData.correctToolsAndEquipmentComment,
      identifiedLineOfFireComment: formData.identifiedLineOfFireComment,
      canCompleteWithoutClimbingComment: formData.canCompleteWithoutClimbingComment,
      commitToPausingIfTaskChangesComment: formData.commitToPausingIfTaskChangesComment,
    }
    
    const photos = {
      trainedAndCompetentPhoto: formData.trainedAndCompetentPhoto,
      workWillNotImpactOthersPhoto: formData.workWillNotImpactOthersPhoto,
      correctToolsAndEquipmentPhoto: formData.correctToolsAndEquipmentPhoto,
      identifiedLineOfFirePhoto: formData.identifiedLineOfFirePhoto,
      canCompleteWithoutClimbingPhoto: formData.canCompleteWithoutClimbingPhoto,
      commitToPausingIfTaskChangesPhoto: formData.commitToPausingIfTaskChangesPhoto,
    }
    
    onNext(answers, comments, photos)
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
    <div className="h-full flex flex-col">
      {/* Content - Scrollable */}
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
            disabled={!allQuestionsAnswered}
            className="flex-1"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SafemateTake5Step3
