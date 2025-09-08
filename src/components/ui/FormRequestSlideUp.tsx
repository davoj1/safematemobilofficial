import React, { useMemo, useState } from 'react'
import Button from './Button'
import Radio from './Radio'
import { cn } from '../../utils/cn'

export interface TeamMemberOption {
  id: string
  name: string
  avatar?: string
}

export interface FormOption {
  id: string
  name: string
}

interface FormRequestSlideUpProps {
  isOpen: boolean
  onClose: () => void
  formOptions: FormOption[]
  teamMembers: TeamMemberOption[]
  onSubmit: (payload: { formId: string, formName: string, memberIds: string[] }) => void
}

const FormRequestSlideUp: React.FC<FormRequestSlideUpProps> = ({
  isOpen,
  onClose,
  formOptions,
  teamMembers,
  onSubmit
}) => {
  const [step, setStep] = useState<1 | 2>(1)
  const [selectedFormId, setSelectedFormId] = useState<string>('')
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([])

  const selectedFormName = useMemo(() => formOptions.find(f => f.id === selectedFormId)?.name || '', [formOptions, selectedFormId])

  const toggleMember = (id: string) => {
    setSelectedMemberIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const resetAndClose = () => {
    setStep(1)
    setSelectedFormId('')
    setSelectedMemberIds([])
    onClose()
  }

  const handleNext = () => {
    if (step === 1 && selectedFormId) setStep(2)
  }

  const handleSubmit = () => {
    if (!selectedFormId || selectedMemberIds.length === 0) return
    onSubmit({ formId: selectedFormId, formName: selectedFormName, memberIds: selectedMemberIds })
    resetAndClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={resetAndClose} />

      {/* Panel */}
      <div className={cn("relative bg-white rounded-t-[20px] w-full h-[85vh] flex flex-col pt-12 pb-6 px-4 shadow-xl")}>        
        {/* Drag handle + Title */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[54px] h-[5px] bg-[#d9d9d9] rounded-full" />
        <div className="absolute right-2 top-2 w-9 h-9 flex items-center justify-center">
          <button onClick={resetAndClose} className="w-8 h-8 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#667085]"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div className="text-center mb-2">
          <h2 className="font-bold text-[#000000] text-xl leading-[30px]">
            {step === 1 ? 'Form Request' : 'Form Request'}
          </h2>
          <p className="text-sm text-[#667085] mt-0.5">{step === 1 ? 'Select form type' : `Select team members • ${selectedFormName}`}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-1 py-2 space-y-4">
          {step === 1 && (
            <div className="space-y-2">
              {formOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedFormId(opt.id)}
                  className={`w-full p-4 rounded-[20px] border text-left transition-colors ${selectedFormId === opt.id ? 'bg-[#ebfe5c] border-[#2a6c7e]' : 'bg-white border-[#eaecf0] hover:border-[#266273]'}`}
                >
                  <div className="flex items-center gap-3">
                    <Radio checked={selectedFormId === opt.id} onChange={() => setSelectedFormId(opt.id)} />
                    <span className="text-[#101828] text-sm font-medium">{opt.name}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2">
              {teamMembers.map(member => {
                const isSelected = selectedMemberIds.includes(member.id)
                return (
                  <div key={member.id} className="flex items-center gap-3 py-3 border-b border-[#eaecf0] last:border-b-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-[#266273] overflow-hidden">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white text-sm font-medium">{member.name.split(' ').map(n => n[0]).join('').slice(0,2)}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[#101828] text-base leading-6 truncate">{member.name}</div>
                    </div>
                    <button onClick={() => toggleMember(member.id)} className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors", isSelected ? "bg-[#ebfe5c]" : "bg-[#266273]")}> 
                      {isSelected ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#101828]"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-[#eaecf0] flex gap-3">
          {step === 1 ? (
            <>
              <Button className="flex-1" variant="light-teal" onClick={resetAndClose}>Cancel</Button>
              <Button className="flex-1" onClick={handleNext} disabled={!selectedFormId}>Next</Button>
            </>
          ) : (
            <>
              <Button className="flex-1" variant="light-teal" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1" onClick={handleSubmit} disabled={selectedMemberIds.length === 0}>Send Request</Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormRequestSlideUp


