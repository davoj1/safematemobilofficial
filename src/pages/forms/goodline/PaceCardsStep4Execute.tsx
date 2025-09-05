import React, { useState } from 'react'
import { Button, ExposureQuestion } from '../../../components/ui'

interface PaceCardsStep4ExecuteProps {
  executeAnswers: { [key: string]: 'yes' | 'no' | 'na' }
  onNext: (executeAnswers: { [key: string]: 'yes' | 'no' | 'na' }) => void
  onBack: () => void
}

const PaceCardsStep4Execute: React.FC<PaceCardsStep4ExecuteProps> = ({
  executeAnswers,
  onNext,
  onBack,
}) => {
  const [answers, setAnswers] = useState<{ [key: string]: 'yes' | 'no' | 'na' }>(executeAnswers)

  const executeQuestions = [
    {
      id: 'job_safe',
      question: 'Can the job be done safely?'
    },
    {
      id: 'communicated_task',
      question: 'Have you communicated your task to others?'
    },
    {
      id: 'no_rush',
      question: 'The task can be completed without the need to rush?'
    },
    {
      id: 'external_pressures',
      question: 'All external pressures that could affect the task controlled?'
    },
    {
      id: 'supervisor_location',
      question: 'Does your supervisor know your work location?'
    }
  ]

  const handleAnswerChange = (questionId: string, answer: 'yes' | 'no' | 'na') => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    onNext(answers)
  }

  const isFormValid = executeQuestions.every(q => answers[q.id] && answers[q.id] !== undefined)

  const hasAnyNoAnswers = executeQuestions.some(q => answers[q.id] === 'no')

  return (
    <>
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto">
        {/* Step Title */}
        <div className="text-center space-y-2">
          <h1 className="font-bold text-[#266273] text-xl leading-7">
            Execute the Task
          </h1>
          <p className="text-[#667085] text-base font-normal leading-6">
            Final safety checks before proceeding
          </p>
        </div>

        {/* Execute Questions */}
        <div className="space-y-5">
          
          <div className="space-y-6">
            {executeQuestions.map((question) => (
              <ExposureQuestion
                key={question.id}
                question={question.question}
                value={answers[question.id] || null}
                onChange={(value) => handleAnswerChange(question.id, value)}
                showAlert={true}
                alertMessage="If you answered 'NO' to any question, contact your Supervisor before proceeding."
              />
            ))}
          </div>
        </div>
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
    </>
  )
}

export default PaceCardsStep4Execute
