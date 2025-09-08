import React, { useState, useEffect } from 'react'
import { Button } from './index'
import { cn } from '../../utils/cn'
import yourQrCodeIcon from '../../assets/jobs/yourqrcodeicon.svg'
import inviteWithEmailIcon from '../../assets/jobs/invitewithemailicon.svg'
import scanOrangeIcon from '../../assets/jobs/Scanorangeicon.svg'
import emailIcon from '../../assets/jobs/emailicon.svg'
import yourQrCode from '../../assets/jobs/yourqrcode.svg'
import shareIcon from '../../assets/jobs/shareicon.svg'
import saveIcon from '../../assets/jobs/saveicon.svg'
import copyLinkIcon from '../../assets/jobs/copylinkicon.svg'
import qrCodeScanIcon from '../../assets/jobs/QrCode.svg'
import arleneIcon from '../../assets/jobs/arlene.svg'
import bessieIcon from '../../assets/jobs/besse.svg'
import marvinIcon from '../../assets/jobs/marvin.svg'
import theresaIcon from '../../assets/jobs/theresa.svg'

interface TeamMember {
  id: string
  name: string
  email: string
  avatar?: string
  initials?: string
  color?: string
}

interface AddTeamMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onInviteWithEmail: () => void
  onScanQRCode: () => void
  onMatesAdded?: (memberIds: string[]) => void
}

type ModalView = 'team-mates' | 'email-invite' | 'qr-code'

const AddTeamMemberModal: React.FC<AddTeamMemberModalProps> = ({
  isOpen,
  onClose,
  onInviteWithEmail,
  onScanQRCode,
  onMatesAdded
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentView, setCurrentView] = useState<ModalView>('team-mates')
  const [activeTab, setActiveTab] = useState<'company' | 'team'>('company')
  const [searchQuery, setSearchQuery] = useState('')
  const [addedMembers, setAddedMembers] = useState<string[]>([])
  const [emailAddresses, setEmailAddresses] = useState<string[]>([''])
  const [invitedMembers, setInvitedMembers] = useState<string[]>([])
  const [hasSentInvites, setHasSentInvites] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [inviteSuccess, setInviteSuccess] = useState(false)

  const teamMembers: TeamMember[] = [
    { id: '1', name: 'Arlene McCoy', email: 'arlene.mccoy@email.com', avatar: arleneIcon },
    { id: '2', name: 'Bessie Cooper', email: 'bessie.cooper@email.com', avatar: bessieIcon },
    { id: '3', name: 'Marvin McKinney', email: 'marvin.mckinney@email.com', avatar: marvinIcon },
    { id: '4', name: 'Theresa Webb', email: 'theresa.webb@email.com', avatar: theresaIcon },
    { id: '5', name: 'Cody Fisher', email: 'webdragon@msn.com', initials: 'CF', color: '#3b82f6' },
    { id: '6', name: 'Darlene Robertson', email: 'darlene.robertson@email.com', initials: 'DR', color: '#ff9500' }
  ]

  const filteredTeamMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedTeamMembers = [...filteredTeamMembers].sort((a, b) => {
    const aSelected = addedMembers.includes(a.id)
    const bSelected = addedMembers.includes(b.id)
    if (aSelected && !bSelected) return -1
    if (!aSelected && bSelected) return 1
    return 0
  })

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setCurrentView('team-mates')
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onMatesAdded?.(addedMembers)
      onClose()
    }, 300)
  }

  const handleAddMember = (memberId: string) => {
    setAddedMembers(prev => prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId])
  }

  const handleEmailInvite = () => setCurrentView('email-invite')
  const handleBackToTeamMates = () => setCurrentView('team-mates')
  const handleQRCode = () => setCurrentView('qr-code')

  const handleAddEmailField = () => setEmailAddresses(prev => [...prev, ''])
  const handleEmailChange = (index: number, value: string) => {
    setEmailAddresses(prev => {
      const newEmails = [...prev]
      newEmails[index] = value
      return newEmails
    })
  }

  const handleSendInvite = () => {
    const validEmails = emailAddresses.filter(email => email.trim())
    if (validEmails.length === 0) return
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      setInviteSuccess(true)
      setInvitedMembers(prev => [...prev, ...validEmails])
      setEmailAddresses([''])
      setHasSentInvites(true)
              setTimeout(() => {
          setInviteSuccess(false)
          setCurrentView('team-mates')
        }, 2000)
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${isVisible ? 'bg-black/50' : 'bg-black/0'}`}
        onClick={handleClose}
      />

      <div className={`relative bg-white rounded-t-[20px] w-full h-[85vh] flex flex-col pt-12 pb-6 px-4 transform transition-transform duration-300 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[54px] h-[5px] bg-[#d9d9d9] rounded-full" />

        <div className="relative mb-4">
          {(currentView === 'email-invite' || currentView === 'qr-code') && (
            <button onClick={handleBackToTeamMates} className="absolute left-0 top-0 w-8 h-8 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#667085]"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}
          <h2 className="font-bold text-[#000000] text-xl leading-[30px] text-center whitespace-nowrap">
            {currentView === 'email-invite' ? 'Invite with Email' : currentView === 'qr-code' ? 'Your QR Code' : 'Add Team Mates'}
          </h2>
          {currentView === 'team-mates' && (
            <button onClick={handleClose} className="absolute right-0 top-0 w-8 h-8 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#667085]"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}
        </div>

        {currentView === 'email-invite' ? (
          <div className="flex-1 flex flex-col gap-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-medium text-[#344054] text-sm leading-5">Invite with Email</label>
                <div className="space-y-2">
                  {emailAddresses.map((email, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center gap-2 bg-white border border-[#d0d5dd] rounded-xl px-3.5 py-2.5">
                        <img src={emailIcon} alt="Email" className="w-6 h-6 text-[#2a6c7e]" />
                        <input type="email" placeholder="Email address" value={email} onChange={(e) => handleEmailChange(index, e.target.value)} className="flex-1 bg-transparent text-[#101828] placeholder-[#667085] focus:outline-none" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={handleAddEmailField} className="text-[#2a6c7e] font-semibold text-sm leading-5">Add another email address</button>
            </div>

            <div className="space-y-1.5">
              <label className="font-medium text-[#344054] text-sm leading-5">Invited Mates</label>
              <div className="bg-[#f9fafb] border border-[#d0d5dd] rounded-xl px-3.5 py-2.5 min-h-[44px]">
                {hasSentInvites && invitedMembers.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {invitedMembers.map((email, index) => (
                      <div key={index} className="bg-[#266273] text-white text-sm px-2 py-1 rounded-lg flex items-center gap-1">
                        <span>{email}</span>
                        <button onClick={() => setInvitedMembers(invitedMembers.filter((_, i) => i !== index))} className="ml-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-[#667085] text-sm">{hasSentInvites ? 'No members invited yet' : 'Invites will appear here after sending'}</span>
                )}
              </div>
            </div>

            <div className="mt-auto">
              <button onClick={handleSendInvite} disabled={isSending || emailAddresses.filter(email => email.trim()).length === 0} className={cn("w-full font-semibold text-base leading-6 py-2.5 px-3 rounded-xl transition-all duration-200", isSending ? "bg-[#266273]/50 text-white cursor-not-allowed" : inviteSuccess ? "bg-green-600 text-white" : "bg-[#266273] text-white hover:bg-[#266273]/90")}> 
                {isSending ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Sending...</span>
                  </div>
                ) : inviteSuccess ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>Successfully Sent Invite</span>
                  </div>
                ) : (
                  'Send Invite'
                )}
              </button>
            </div>
          </div>
        ) : currentView === 'qr-code' ? (
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
              <div className="inline-block">
                <img src={yourQrCode} alt="QR Code" className="w-[200px] h-[200px]" />
              </div>
              <p className="text-[#667085] text-sm leading-5 max-w-[262px]">Show this QR Code to your work mates so they can be added to your team</p>
            </div>

            {/* Divider with "or" */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#eaecf0]"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-[#667085]">or</span>
              </div>
            </div>

            <div className="mt-auto">
              <button className="w-full flex items-center justify-center gap-2 p-3 bg-white rounded-2xl border border-[#d0d5dd]">
                <img src={qrCodeScanIcon} alt="Scan" className="w-6 h-6" />
                <span className="text-[#344054] font-semibold text-[16px] leading-6">Scan QR Code</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="relative mb-4">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#667085]"><path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <input type="text" placeholder="Search for your team mates" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-12 py-3 bg-white border border-[#eaecf0] rounded-xl text-[#101828] placeholder-[#667085] focus:outline-none focus:border-[#266273]" />
              <button onClick={onScanQRCode} className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center">
                <img src={scanOrangeIcon} alt="Scan QR Code" className="w-5 h-5" />
              </button>
            </div>

            <div className="flex border-b border-[#eaecf0] mb-4">
              <button onClick={() => setActiveTab('company')} className={cn("flex-1 py-3 text-base font-medium border-b-2 transition-colors", activeTab === 'company' ? "text-[#266273] border-[#266273]" : "text-[#667085] border-transparent")}>Your Company</button>
              <button onClick={() => setActiveTab('team')} className={cn("flex-1 py-3 text-base font-medium border-b-2 transition-colors", activeTab === 'team' ? "text-[#266273] border-[#266273]" : "text-[#667085] border-transparent")}>Team Mates ({addedMembers.length})</button>
            </div>

            <div className="flex gap-3 mb-4">
              <button onClick={handleEmailInvite} className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#eaf0f2] text-[#266273] rounded-xl font-medium">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#266273]"><path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/><path d="M22 21V19C21.9993 18.1137 21.7044 17.2528 21.1614 16.5523C20.6184 15.8519 19.8581 15.3516 19 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>+</span>
                Invite with Email
              </button>
              <button onClick={handleQRCode} className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#f8f9fa] text-[#667085] rounded-xl font-medium">
                <img src={yourQrCodeIcon} alt="QR Code" className="w-5 h-5" />
                Your QR Code
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {activeTab === 'company' ? (
                sortedTeamMembers.map(member => (
                  <div key={member.id} className="flex items-center gap-3 py-3 border-b border-[#eaecf0] last:border-b-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      {member.avatar ? (<img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />) : (
                        <div className="w-full h-full rounded-full flex items-center justify-center text-white font-medium text-sm" style={{ backgroundColor: member.color }}>{member.initials}</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[#101828] text-base leading-6 truncate">{member.name}</div>
                      <div className="text-[#667085] text-sm leading-5 truncate">{member.email}</div>
                    </div>
                    <button onClick={() => handleAddMember(member.id)} className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors", addedMembers.includes(member.id) ? "bg-[#ebfe5c]" : "bg-[#266273]")}> 
                      {addedMembers.includes(member.id) ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#101828]"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      )}
                    </button>
                  </div>
                ))
              ) : (
                teamMembers.filter(member => addedMembers.includes(member.id)).map(member => (
                  <div key={member.id} className="flex items-center gap-3 py-3 border-b border-[#eaecf0] last:border-b-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      {member.avatar ? (<img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />) : (
                        <div className="w-full h-full rounded-full flex items-center justify-center text-white font-medium text-sm" style={{ backgroundColor: member.color }}>{member.initials}</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[#101828] text-base leading-6 truncate">{member.name}</div>
                      <div className="text-[#667085] text-sm leading-5 truncate">{member.email}</div>
                    </div>
                    <button onClick={() => handleAddMember(member.id)} className="w-8 h-8 rounded-full bg-[#dc2626] flex items-center justify-center flex-shrink-0 transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AddTeamMemberModal 