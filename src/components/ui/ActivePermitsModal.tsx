import React, { useState } from 'react'
import { Button, Radio } from './index'

interface TeamMember {
  id: string
  name: string
  avatar?: string
}

interface Permit {
  id: string
  type: string
  createdAt: string
  signedOnMembers: string[]
}

interface ActivePermitsModalProps {
  isOpen: boolean
  onClose: () => void
  teamMembers: TeamMember[]
  onSubmit: (payload: { permitId: string; permitType: string; action: 'sign-on' | 'sign-off'; memberIds: string[] }) => void
}

// Hardcoded active permits
const activePermits: Permit[] = [
  {
    id: '1',
    type: 'Hot Works',
    createdAt: '2024-01-15 08:30',
    signedOnMembers: ['josh', 'david']
  },
  {
    id: '2',
    type: 'Working at Heights',
    createdAt: '2024-01-15 09:15',
    signedOnMembers: ['linda', 'jack']
  },
  {
    id: '3',
    type: 'Confined Spaces',
    createdAt: '2024-01-15 10:00',
    signedOnMembers: ['josh']
  }
]

const ActivePermitsModal: React.FC<ActivePermitsModalProps> = ({
  isOpen,
  onClose,
  teamMembers,
  onSubmit
}) => {
  const [step, setStep] = useState<1 | 2>(1)
  const [selectedPermitId, setSelectedPermitId] = useState<string>('')
  const [selectedAction, setSelectedAction] = useState<'sign-on' | 'sign-off'>('sign-on')
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([])

  const selectedPermit = activePermits.find(p => p.id === selectedPermitId)
  const selectedPermitType = selectedPermit?.type || ''

  const toggleMember = (id: string) => {
    setSelectedMemberIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const resetAndClose = () => {
    setStep(1)
    setSelectedPermitId('')
    setSelectedAction('sign-on')
    setSelectedMemberIds([])
    onClose()
  }

  const handleNext = () => {
    if (step === 1 && selectedPermitId) setStep(2)
  }

  const handleSubmit = () => {
    if (!selectedPermitId || selectedMemberIds.length === 0) return
    onSubmit({ 
      permitId: selectedPermitId, 
      permitType: selectedPermitType, 
      action: selectedAction, 
      memberIds: selectedMemberIds 
    })
    resetAndClose()
  }

  const getSignedOnMembers = (permit: Permit) => {
    return teamMembers.filter(m => permit.signedOnMembers.includes(m.id))
  }

  const getAvailableMembers = (permit: Permit) => {
    if (selectedAction === 'sign-on') {
      // For sign-on: show only members who are NOT already signed on
      return teamMembers.filter(m => !permit.signedOnMembers.includes(m.id))
    } else {
      // For sign-off: show only members who ARE already signed on
      return teamMembers.filter(m => permit.signedOnMembers.includes(m.id))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={resetAndClose} />

      {/* Panel */}
      <div className="relative bg-white rounded-t-[20px] w-full h-[85vh] flex flex-col pt-12 pb-6 px-4 shadow-xl">        
        {/* Drag handle + Title */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[54px] h-[5px] bg-[#d9d9d9] rounded-full" />
        <div className="absolute right-2 top-2 w-9 h-9 flex items-center justify-center">
          <button onClick={resetAndClose} className="w-8 h-8 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#667085]"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div className="text-center mb-2">
          <h2 className="font-bold text-[#000000] text-xl leading-[30px]">
            {step === 1 ? 'Active Permits' : 'Manage Permit'}
          </h2>
          <p className="text-sm text-[#667085] mt-0.5">
            {step === 1 ? 'Select a permit to manage' : `${selectedAction === 'sign-on' ? 'Sign On' : 'Sign Off'} • ${selectedPermitType}`}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-1 py-2 space-y-4">
          {step === 1 && (
            <div className="space-y-2">
              {activePermits.map((permit) => (
                <button
                  key={permit.id}
                  onClick={() => setSelectedPermitId(permit.id)}
                  className={`w-full p-4 rounded-[20px] border text-left transition-colors ${
                    selectedPermitId === permit.id 
                      ? 'bg-[#ebfe5c] border-[#2a6c7e]' 
                      : 'bg-white border-[#eaecf0] hover:border-[#266273]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Radio checked={selectedPermitId === permit.id} onChange={() => setSelectedPermitId(permit.id)} />
                    <div className="flex-1">
                      <h3 className="text-[#101828] text-sm font-medium">{permit.type}</h3>
                      <p className="text-xs text-[#667085] mt-1">Created: {permit.createdAt}</p>
                    </div>
                  </div>
                  
                  {/* Signed On Members */}
                  <div className="ml-6">
                    <p className="text-xs text-[#667085] mb-2">Signed On ({permit.signedOnMembers.length}):</p>
                    <div className="flex flex-wrap gap-2">
                      {getSignedOnMembers(permit).map((member) => (
                        <div key={member.id} className="flex items-center gap-1 bg-[#f0f9ff] border border-[#bfdbfe] px-2 py-1 rounded-full">
                          <div className="w-5 h-5 bg-[#266273] rounded-full flex items-center justify-center text-white overflow-hidden flex-shrink-0">
                            {member.avatar ? (
                              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xs font-medium">
                                {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#101828]">{member.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 2 && selectedPermit && (
            <div className="space-y-4">
              {/* Current Status */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-[#101828]">Current Status:</h3>
                <div className="p-3 bg-[#f8f9fa] rounded-[20px] border border-[#eaecf0]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#101828]">{selectedPermit.type}</span>
                    <span className="text-xs text-[#667085]">Created: {selectedPermit.createdAt}</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-[#667085]">Currently Signed On ({getSignedOnMembers(selectedPermit).length}):</p>
                    <div className="flex flex-wrap gap-2">
                      {getSignedOnMembers(selectedPermit).map((member) => (
                        <div key={member.id} className="flex items-center gap-1 bg-[#e0f2fe] border border-[#bfdbfe] px-2 py-1 rounded-full">
                          <div className="w-5 h-5 bg-[#266273] rounded-full flex items-center justify-center text-white overflow-hidden flex-shrink-0">
                            {member.avatar ? (
                              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xs font-medium">
                                {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#101828]">{member.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Selection */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-[#101828]">Select Action:</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedAction('sign-on')
                      setSelectedMemberIds([]) // Reset selection when changing action
                    }}
                    className={`w-full p-3 rounded-[20px] border text-left transition-colors ${
                      selectedAction === 'sign-on' 
                        ? 'bg-[#ebfe5c] border-[#2a6c7e]' 
                        : 'bg-white border-[#eaecf0] hover:border-[#266273]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Radio checked={selectedAction === 'sign-on'} onChange={() => {
                        setSelectedAction('sign-on')
                        setSelectedMemberIds([])
                      }} />
                      <div>
                        <span className="text-sm font-medium text-[#101828]">Sign On to Permit</span>
                        <p className="text-xs text-[#667085] mt-1">
                          Add team members to this permit ({getAvailableMembers(selectedPermit).length} available)
                        </p>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedAction('sign-off')
                      setSelectedMemberIds([]) // Reset selection when changing action
                    }}
                    className={`w-full p-3 rounded-[20px] border text-left transition-colors ${
                      selectedAction === 'sign-off' 
                        ? 'bg-[#ebfe5c] border-[#2a6c7e]' 
                        : 'bg-white border-[#eaecf0] hover:border-[#266273]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Radio checked={selectedAction === 'sign-off'} onChange={() => {
                        setSelectedAction('sign-off')
                        setSelectedMemberIds([])
                      }} />
                      <div>
                        <span className="text-sm font-medium text-[#101828]">Sign Off from Permit</span>
                        <p className="text-xs text-[#667085] mt-1">
                          Remove team members from this permit ({getAvailableMembers(selectedPermit).length} signed on)
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Team Member Selection */}
              {getAvailableMembers(selectedPermit).length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-[#101828]">
                    Select Team Members ({selectedAction === 'sign-on' ? 'Available to Sign On' : 'Currently Signed On'}):
                  </h3>
                  <div className="space-y-2">
                    {getAvailableMembers(selectedPermit).map((member) => (
                      <button
                        key={member.id}
                        onClick={() => toggleMember(member.id)}
                        className={`w-full p-3 rounded-[20px] border text-left transition-colors ${
                          selectedMemberIds.includes(member.id)
                            ? 'bg-[#ebfe5c] border-[#2a6c7e]'
                            : 'bg-white border-[#eaecf0] hover:border-[#266273]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Radio 
                            checked={selectedMemberIds.includes(member.id)} 
                            onChange={() => toggleMember(member.id)} 
                          />
                          <div className="w-8 h-8 bg-[#266273] rounded-full flex items-center justify-center text-white overflow-hidden flex-shrink-0">
                            {member.avatar ? (
                              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xs font-medium">
                                {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </span>
                            )}
                          </div>
                          <span className="text-sm font-medium text-[#101828]">{member.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No Available Members Message */}
              {getAvailableMembers(selectedPermit).length === 0 && (
                <div className="p-4 bg-[#fef3c7] border border-[#f59e0b] rounded-[20px]">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#d97706] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-[#92400e]">
                        {selectedAction === 'sign-on' ? 'All team members are already signed on' : 'No team members are currently signed on'}
                      </p>
                      <p className="text-xs text-[#92400e] mt-1">
                        {selectedAction === 'sign-on' 
                          ? 'Everyone is already working on this permit.' 
                          : 'No one is currently signed on to this permit.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-1 pt-4">
          <Button
            variant="outline"
            onClick={step === 1 ? resetAndClose : () => setStep(1)}
            className="flex-1"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            onClick={step === 1 ? handleNext : handleSubmit}
            disabled={step === 1 ? !selectedPermitId : selectedMemberIds.length === 0}
            className="flex-1"
          >
            {step === 1 ? 'Next' : 'Submit Request'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ActivePermitsModal
