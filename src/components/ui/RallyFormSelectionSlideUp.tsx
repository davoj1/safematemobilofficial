import React, { useState } from 'react'
import Button from './Button'
import { cn } from '../../utils/cn'

interface RallyFormSelectionSlideUpProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formId: string, formName: string) => void
  competitionData: {
    id: string
    formName: string
    formId: string
    teams: Array<{
      teamId: string
      teamName: string
      members: Array<{
        id: string
        name: string
        avatar?: string
        status: 'pending' | 'submitted'
        submittedAt?: string
      }>
      completedCount: number
      totalCount: number
    }>
  }
}

const RallyFormSelectionSlideUp: React.FC<RallyFormSelectionSlideUpProps> = ({
  isOpen,
  onClose,
  onSubmit,
  competitionData
}) => {
  const [selectedFormId, setSelectedFormId] = useState<string>('')

  // Mock completed forms for the current user
  const availableForms = [
    {
      id: 'form_1',
      name: 'SafeMate Take 5',
      type: 'Safety Check',
      completedAt: '2024-01-15T10:30:00Z',
      status: 'completed'
    },
    {
      id: 'form_2', 
      name: 'Vehicle Prestart',
      type: 'Equipment Check',
      completedAt: '2024-01-15T09:15:00Z',
      status: 'completed'
    },
    {
      id: 'form_3',
      name: 'Hazard Report',
      type: 'Incident Report',
      completedAt: '2024-01-14T16:45:00Z',
      status: 'completed'
    }
  ]

  // Mock submitted forms from other team members
  const submittedForms = [
    {
      id: 'submission_1',
      formName: 'SafeMate Take 5',
      submittedBy: 'Linda',
      submittedAt: '2024-01-15T11:20:00Z',
      teamName: 'Alpha Team'
    },
    {
      id: 'submission_2',
      formName: 'Vehicle Prestart', 
      submittedBy: 'Marvin',
      submittedAt: '2024-01-15T11:15:00Z',
      teamName: 'Alpha Team'
    }
  ]

  const handleSubmit = () => {
    if (selectedFormId) {
      const selectedForm = availableForms.find(form => form.id === selectedFormId)
      if (selectedForm) {
        onSubmit(selectedFormId, selectedForm.name)
        onClose()
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white rounded-t-3xl w-full h-[85vh] flex flex-col">
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-[#101828]">Add Your Form</h2>
            <p className="text-sm text-[#667085]">Select a completed form to submit</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {/* Competition Request */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#101828]">Competition Request</h3>
                <p className="text-xs text-[#667085]">Rally the Troops Competition</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#667085]">Required Form:</span>
                <span className="text-sm font-medium text-[#101828]">{competitionData.formName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#667085]">Prize:</span>
                <span className="text-sm font-medium text-[#101828]">100 points</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#667085]">Teams:</span>
                <span className="text-sm font-medium text-[#101828]">{competitionData.teams.length} teams</span>
              </div>
            </div>
          </div>

          {/* Submitted Forms */}
          <div>
            <h3 className="text-sm font-semibold text-[#101828] mb-3">Team Submissions</h3>
            <div className="space-y-2">
              {submittedForms.map((submission) => (
                <div key={submission.id} className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#101828]">{submission.formName}</div>
                        <div className="text-xs text-[#667085]">Submitted by {submission.submittedBy}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#667085]">{submission.teamName}</div>
                      <div className="text-xs text-[#667085]">
                        {new Date(submission.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Forms */}
          <div>
            <h3 className="text-sm font-semibold text-[#101828] mb-3">Your Completed Forms</h3>
            <div className="space-y-2">
              {availableForms.map((form) => (
                <div
                  key={form.id}
                  className={cn(
                    "border rounded-lg p-3 cursor-pointer transition-colors",
                    selectedFormId === form.id
                      ? "border-[#266273] bg-[#266273]/5"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => setSelectedFormId(form.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        selectedFormId === form.id
                          ? "bg-[#266273]"
                          : "bg-gray-100"
                      )}>
                        {selectedFormId === form.id ? (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#101828]">{form.name}</div>
                        <div className="text-xs text-[#667085]">{form.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#667085]">
                        Completed {new Date(form.completedAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-green-600 font-medium">Ready to submit</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <Button
            onClick={handleSubmit}
            disabled={!selectedFormId}
            className="w-full"
          >
            Submit Selected Form
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RallyFormSelectionSlideUp


