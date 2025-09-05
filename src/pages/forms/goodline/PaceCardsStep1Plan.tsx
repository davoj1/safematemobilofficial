import React, { useState } from 'react'
import { Button, TextareaInput, ExposureQuestion } from '../../../components/ui'

interface PaceCardsStep1PlanProps {
  task: string
  planAnswers: { [key: string]: 'yes' | 'no' | 'na' }
  onNext: (task: string, planAnswers: { [key: string]: 'yes' | 'no' | 'na' }) => void
  onBack: () => void
}

const PaceCardsStep1Plan: React.FC<PaceCardsStep1PlanProps> = ({
  task,
  planAnswers,
  onNext,
  onBack,
}) => {
  const [currentTask, setCurrentTask] = useState(task)
  const [answers, setAnswers] = useState<{ [key: string]: 'yes' | 'no' | 'na' }>(planAnswers)

  const planQuestions = [
    {
      id: 'understand_scope',
      question: 'Do I understand the work scope and method?'
    },
    {
      id: 'qualifications',
      question: 'Do you have the qualifications, license and or VOC for the task?'
    },
    {
      id: 'jha_swms',
      question: 'Have you read and signed onto the JHA or SWMS?'
    },
    {
      id: 'correct_ppe',
      question: 'Do you have the correct PPE for the task?'
    },
    {
      id: 'tools_equipment',
      question: 'Are tools and equipment tagged in date and fit for purpose?'
    },
    {
      id: 'work_permit',
      question: 'Is a work permit or authority to work required?'
    },
    {
      id: 'communicated_task',
      question: 'Have you communicated your task with other workers in the work area?'
    }
  ]

  const handleAnswerChange = (questionId: string, answer: 'yes' | 'no' | 'na') => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    onNext(currentTask, answers)
  }

  const isFormValid = currentTask.trim() !== '' && 
    planQuestions.every(q => answers[q.id] && answers[q.id] !== undefined)

  const hasAnyNoAnswers = planQuestions.some(q => answers[q.id] === 'no')

  return (
    <>
      <div className="flex-1 px-5 py-3 space-y-4 overflow-y-auto">
        {/* Task Description */}
        <div className="space-y-2">
          <h2 className="font-bold text-[#266273] text-lg leading-7 text-center">
            What is your task?
          </h2>
          <TextareaInput
            placeholder="Describe your task..."
            value={currentTask}
            onChange={setCurrentTask}
            rows={3}
          />
        </div>

        {/* Plan Your Task */}
        <div className="space-y-5">
          <div className="text-center">
            <h2 className="font-bold text-[#266273] text-lg leading-7">
              Plan Your Task
            </h2>
          </div>
          
          <div className="space-y-6">
            {planQuestions.map((question) => (
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

export default PaceCardsStep1Plan
