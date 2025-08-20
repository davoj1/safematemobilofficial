import React, { useState, useEffect } from 'react'
import { Button } from './index'
import { cn } from '../../utils/cn'

interface Supervisor {
  id: string
  name: string
  company: string
  role: string
  avatar?: string
  initials?: string
  color?: string
}

interface SelectSupervisorModalProps {
  isOpen: boolean
  onClose: () => void
  onSupervisorSelect?: (supervisor: Supervisor) => void
  allSupervisors?: Supervisor[]
  selectedSupervisor?: Supervisor | null
}

type ModalView = 'supervisors'

const SelectSupervisorModal: React.FC<SelectSupervisorModalProps> = ({
  isOpen,
  onClose,
  onSupervisorSelect,
  allSupervisors = [],
  selectedSupervisor
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentView, setCurrentView] = useState<ModalView>('supervisors')
  const [activeTab, setActiveTab] = useState<'company' | 'team'>('company')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSupervisorId, setSelectedSupervisorId] = useState<string | null>(
    selectedSupervisor?.id || null
  )

  // Mock supervisor data - in real app this would come from API
  const supervisors: Supervisor[] = allSupervisors.length > 0 ? allSupervisors : [
    { id: '1', name: 'John Smith', company: 'Warrikal', role: 'Supervisor', avatar: 'JS' },
    { id: '2', name: 'Sarah Johnson', company: 'Warrikal', role: 'Supervisor', avatar: 'SJ' },
    { id: '3', name: 'Mike Wilson', company: 'Warrikal', role: 'Supervisor', avatar: 'MW' },
    { id: '4', name: 'Lisa Brown', company: 'Warrikal', role: 'Supervisor', avatar: 'LB' },
    { id: '5', name: 'David Lee', company: 'Warrikal', role: 'Supervisor', avatar: 'DL' }
  ]

  const filteredSupervisors = supervisors.filter(supervisor =>
    supervisor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supervisor.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedSupervisors = [...filteredSupervisors].sort((a, b) => {
    const aSelected = selectedSupervisorId === a.id
    const bSelected = selectedSupervisorId === b.id
    if (aSelected && !bSelected) return -1
    if (!aSelected && bSelected) return 1
    return 0
  })

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setCurrentView('supervisors')
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleSupervisorSelect = (supervisor: Supervisor) => {
    setSelectedSupervisorId(supervisor.id)
    onSupervisorSelect?.(supervisor)
    handleClose()
  }

  const handleTabChange = (tab: 'company' | 'team') => {
    setActiveTab(tab)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${isVisible ? 'bg-black/50' : 'bg-black/0'}`}
        onClick={handleClose}
      />

      <div className={`relative bg-white rounded-t-[20px] w-full h-[600px] flex flex-col pt-12 pb-6 px-4 transform transition-transform duration-300 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[54px] h-[5px] bg-[#d9d9d9] rounded-full" />

        {/* Title */}
        <div className="relative mb-4">
          <h2 className="font-bold text-[#000000] text-xl leading-[30px] text-center whitespace-nowrap">Select your supervisor</h2>
          <button onClick={handleClose} className="absolute right-0 top-0 w-8 h-8 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#667085]"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#667085]"><path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <input
            type="text"
            placeholder="Search for your supervisor"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#eaecf0] rounded-xl text-[#101828] placeholder-[#667085] focus:outline-none focus:border-[#266273]"
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#eaecf0] mb-4">
          <button onClick={() => handleTabChange('company')} className={cn("flex-1 py-3 text-base font-medium border-b-2 transition-colors", activeTab === 'company' ? "text-[#266273] border-[#266273]" : "text-[#667085] border-transparent")}>Your Company</button>
          <button onClick={() => handleTabChange('team')} className={cn("flex-1 py-3 text-base font-medium border-b-2 transition-colors", activeTab === 'team' ? "text-[#266273] border-[#266273]" : "text-[#667085] border-transparent")}>Team</button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {sortedSupervisors.length > 0 ? (
            sortedSupervisors.map(supervisor => (
              <div key={supervisor.id} className="flex items-center gap-3 py-3 border-b border-[#eaecf0] last:border-b-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#266273' }}>
                  <span className="text-white font-medium text-sm">{(supervisor.initials || supervisor.avatar || supervisor.name.split(' ').map(n => n[0]).join('').slice(0, 2))}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[#101828] text-base leading-6 truncate">{supervisor.name}</div>
                  <div className="text-[#667085] text-sm leading-5 truncate">{supervisor.company} • {supervisor.role}</div>
                </div>
                <button onClick={() => handleSupervisorSelect(supervisor)} className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors", selectedSupervisorId === supervisor.id ? "bg-[#ebfe5c]" : "bg-[#266273]")}> 
                  {selectedSupervisorId === supervisor.id ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#101828]"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-[#667085] text-sm">No supervisors found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SelectSupervisorModal 