import React from 'react'
import FormHistoryList from './FormHistoryList'

interface FormHistoryData {
  id: string
  title: string
  description: string
  companyName: string
  companyLogo: string
  timestamp: string
  status: 'completed' | 'pending' | 'failed'
  icon: React.ReactNode
}

interface HistoryFormsStateProps {
  forms: FormHistoryData[]
  onFormClick?: (formId: string) => void
}

const HistoryFormsState: React.FC<HistoryFormsStateProps> = ({ forms, onFormClick }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <FormHistoryList forms={forms} onFormClick={onFormClick} />
    </div>
  )
}

export default HistoryFormsState 