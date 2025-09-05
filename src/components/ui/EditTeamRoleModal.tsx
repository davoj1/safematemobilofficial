import React, { useState } from 'react'
import { Button } from './index'

interface TeamMember {
  id: string
  name: string
  avatar?: string
  currentRole?: string
}

interface EditTeamRoleModalProps {
  isOpen: boolean
  onClose: () => void
  teamMembers: TeamMember[]
  onSubmit: (roleChanges: Array<{ memberId: string; memberName: string; newRole: string; oldRole?: string }>) => void
}

const roleOptions = [
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'worker', label: 'Worker' },
  { value: 'team-leader', label: 'Team Leader' },
]

const EditTeamRoleModal: React.FC<EditTeamRoleModalProps> = ({
  isOpen,
  onClose,
  teamMembers,
  onSubmit
}) => {
  const [roleChanges, setRoleChanges] = useState<Record<string, string>>({})
  const [expandedMember, setExpandedMember] = useState<string | null>(null)

  const handleRoleChange = (memberId: string, newRole: string) => {
    setRoleChanges(prev => ({
      ...prev,
      [memberId]: newRole
    }))
    // Collapse the card after selection
    setExpandedMember(null)
  }

  const toggleExpanded = (memberId: string) => {
    setExpandedMember(expandedMember === memberId ? null : memberId)
  }

  const handleSubmit = () => {
    const changes = Object.entries(roleChanges).map(([memberId, newRole]) => {
      const member = teamMembers.find(m => m.id === memberId)
      return {
        memberId,
        memberName: member?.name || '',
        newRole,
        oldRole: member?.currentRole
      }
    }).filter(change => change.newRole !== change.oldRole)

    if (changes.length > 0) {
      onSubmit(changes)
    }
    onClose()
  }

  const hasChanges = Object.keys(roleChanges).length > 0

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white rounded-t-[20px] w-full h-[640px] flex flex-col pt-12 pb-6 px-4 shadow-xl">        
        {/* Drag handle + Title */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[54px] h-[5px] bg-[#d9d9d9] rounded-full" />
        <div className="absolute right-2 top-2 w-9 h-9 flex items-center justify-center">
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#667085]"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div className="text-center mb-2">
          <h2 className="font-bold text-[#000000] text-xl leading-[30px]">
            Edit Team Roles
          </h2>
          <p className="text-sm text-[#667085] mt-0.5">Update team member roles and responsibilities</p>
        </div>

        <div className="flex-1 overflow-y-auto px-1 py-2 space-y-4">
          <div className="space-y-2">
            {teamMembers.map((member) => {
              const currentRole = roleChanges[member.id] || member.currentRole || ''
              const currentRoleLabel = roleOptions.find(r => r.value === currentRole)?.label || currentRole
              const isExpanded = expandedMember === member.id
              
              return (
                <div key={member.id} className="w-full rounded-[20px] border bg-white border-[#eaecf0] hover:border-[#266273] transition-colors overflow-hidden">
                  {/* Main Card Content */}
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => toggleExpanded(member.id)}
                  >
                    <div className="flex items-center gap-3">
                      {/* Member Avatar */}
                      <div className="w-10 h-10 bg-[#266273] rounded-full flex items-center justify-center text-white overflow-hidden flex-shrink-0">
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-sm font-medium">
                            {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        )}
                      </div>
                      
                      {/* Member Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-[#101828]">{member.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#101828] bg-[#f0f9ff] border border-[#bfdbfe] px-2 py-1 rounded-full">
                              {currentRoleLabel}
                            </span>
                            {/* Edit Icon */}
                            <div className="w-6 h-6 flex items-center justify-center">
                              <svg className="w-4 h-4 text-[#667085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Role Options */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-[#eaecf0] bg-[#f8f9fa]">
                      <div className="pt-3">
                        <div className="text-xs text-[#667085] mb-2">Select new role:</div>
                        <div className="space-y-1">
                          {roleOptions.map((role) => (
                            <button
                              key={role.value}
                              onClick={() => handleRoleChange(member.id, role.value)}
                              className={`w-full text-left p-2 rounded-lg transition-colors ${
                                currentRole === role.value 
                                  ? 'bg-[#266273] text-white' 
                                  : 'bg-white text-[#101828] hover:bg-[#f0f9ff] border border-[#eaecf0]'
                              }`}
                            >
                              <span className="text-sm font-medium">{role.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {hasChanges && (
            <div className="mt-4 p-3 bg-[#fef3c7] border border-[#f59e0b] rounded-xl">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[#d97706] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-[#92400e]">Role Changes Pending</p>
                  <p className="text-xs text-[#92400e] mt-1">
                    {Object.keys(roleChanges).length} team member{Object.keys(roleChanges).length !== 1 ? 's' : ''} will have their roles updated.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-1 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!hasChanges}
            className={`flex-1 ${!hasChanges ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {hasChanges ? 'Update Roles' : 'No Changes'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EditTeamRoleModal
