import React from 'react'
import FormHistoryItem from './FormHistoryItem'

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

interface FormHistoryListProps {
  forms: FormHistoryData[]
  onFormClick?: (formId: string) => void
}

const FormHistoryList: React.FC<FormHistoryListProps> = ({ forms, onFormClick }) => {
  // Group forms by date
  const groupFormsByDate = (forms: FormHistoryData[]) => {
    const groups: { [key: string]: FormHistoryData[] } = {}
    
    forms.forEach(form => {
      const date = new Date(form.timestamp)
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      
      let dateKey: string
      if (date.toDateString() === today.toDateString()) {
        dateKey = 'Today'
      } else if (date.toDateString() === yesterday.toDateString()) {
        dateKey = 'Yesterday'
      } else {
        dateKey = date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      }
      
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(form)
    })
    
    return groups
  }

  const groupedForms = groupFormsByDate(forms)

  return (
    <div className="flex flex-col gap-2.5 px-4 py-2.5">
      {Object.entries(groupedForms).map(([dateKey, dateForms]) => (
        <div key={dateKey} className="flex flex-col gap-2">
          {/* Date Header */}
          <div className="font-medium text-[#475467] text-sm leading-5">
            {dateKey}
          </div>
          
          {/* Forms for this date */}
          <div className="flex flex-col gap-2.5">
            {dateForms.map((form) => (
              <FormHistoryItem
                key={form.id}
                title={form.title}
                description={form.description}
                companyName={form.companyName}
                companyLogo={form.companyLogo}
                timestamp={form.timestamp}
                status={form.status}
                icon={form.icon}
                onClick={() => onFormClick?.(form.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FormHistoryList 