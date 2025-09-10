import React, { useState } from 'react'
import Button from './Button'
import { cn } from '../../utils/cn'

interface RallyTheTroopsSlideUpProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (payload: { formId: string, formName: string, startDelay: number }) => void
}

const RallyTheTroopsSlideUp: React.FC<RallyTheTroopsSlideUpProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [selectedForm, setSelectedForm] = useState('')
  const [startDelay, setStartDelay] = useState(0)

  // Available forms for the competition
  const availableForms = [
    { id: 'take-control', name: 'Take Control (Warrikal FMG)' },
    { id: 'fatigue-management', name: 'Fatigue Management (Warrikal)' },
    { id: 'pace-cards', name: 'Pace Cards (Goodline)' },
    { id: 'safemate-take5', name: 'SafeMate Take 5' },
    { id: 'vehicle-prestart', name: 'Vehicle Prestart' },
    { id: 'hazard-report', name: 'Hazard Report' }
  ]

  // Start delay options (in seconds)
  const delayOptions = [
    { value: 0, label: 'Start immediately' },
    { value: 30, label: 'Start in 30 seconds' },
    { value: 60, label: 'Start in 1 minute' },
    { value: 300, label: 'Start in 5 minutes' },
    { value: 600, label: 'Start in 10 minutes' }
  ]

  const handleSubmit = () => {
    if (!selectedForm) return
    
    const form = availableForms.find(f => f.id === selectedForm)
    if (!form) return

    onSubmit({
      formId: selectedForm,
      formName: form.name,
      startDelay
    })
  }

  const canSubmit = selectedForm && startDelay >= 0

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full bg-white rounded-t-[24px] shadow-2xl h-[85vh] flex flex-col">
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[#d0d5dd] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4 border-b border-[#eaecf0]">
          <div>
            <h2 className="text-lg font-semibold text-[#101828]">Rally the Troops</h2>
            <p className="text-sm text-[#667085] mt-1">
              Start a mini-competition between teams
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f9fafb] transition-colors"
          >
            <svg className="w-5 h-5 text-[#667085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-4 overflow-y-auto min-h-0">
          <div className="space-y-6">
            {/* Competition Info */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#101828]">Competition Rules</h3>
                  <p className="text-xs text-[#667085]">First team to complete all forms wins!</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-[#667085]">
                <div className="flex items-center gap-2">
                  <span>🏆</span>
                  <span>All team members must submit the selected form</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>First team to complete all submissions wins 100 points</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>Only active team members can participate</span>
                </div>
              </div>
            </div>

            {/* Form Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-[#101828]">Select Form *</h3>
              <div className="grid grid-cols-1 gap-2">
                {availableForms.map((form) => (
                  <button
                    key={form.id}
                    onClick={() => setSelectedForm(form.id)}
                    className={cn(
                      'w-full p-3 rounded-xl border text-left transition-colors',
                      selectedForm === form.id
                        ? 'bg-[#ebfe5c] border-[#2a6c7e]'
                        : 'bg-white border-[#eaecf0] hover:border-[#266273]'
                    )}
                  >
                    <span className="text-sm font-medium text-[#101828]">{form.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Start Timer */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-[#101828]">Start Timer</h3>
              <div className="grid grid-cols-1 gap-2">
                {delayOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setStartDelay(option.value)}
                    className={cn(
                      'w-full p-3 rounded-xl border text-left transition-colors',
                      startDelay === option.value
                        ? 'bg-[#ebfe5c] border-[#2a6c7e]'
                        : 'bg-white border-[#eaecf0] hover:border-[#266273]'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-3 h-3 rounded-full border-2',
                        startDelay === option.value
                          ? 'bg-[#2a6c7e] border-[#2a6c7e]'
                          : 'border-[#d0d5dd]'
                      )} />
                      <span className="text-sm font-medium text-[#101828]">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Competition Preview */}
            {selectedForm && (
              <div className="bg-white rounded-xl border border-[#eaecf0] p-4">
                <h4 className="text-sm font-medium text-[#101828] mb-3">Competition Preview</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#667085]">Form:</span>
                    <span className="text-sm font-medium text-[#101828]">
                      {availableForms.find(f => f.id === selectedForm)?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#667085]">Start:</span>
                    <span className="text-sm font-medium text-[#101828]">
                      {startDelay === 0 ? 'Immediately' : delayOptions.find(d => d.value === startDelay)?.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#667085]">Prize:</span>
                    <span className="text-sm font-medium text-[#101828]">100 points</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#667085]">Teams:</span>
                    <span className="text-sm font-medium text-[#101828]">All active teams</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="px-6 py-4 flex-shrink-0 border-t border-[#eaecf0]">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full"
          >
            Start Competition
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RallyTheTroopsSlideUp
