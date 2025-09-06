import React, { useState } from 'react'
import { Button, AddTeamMemberModal, CompanySwitchModal, AddNewCompanyModal, InviteTeamMembersModal } from '../components/ui'
import { BottomNavigation } from '../components/layout'
import warrikalLogo from '../assets/companylogo/warrikallogo.svg'
import copyIcon from '../assets/companytab/copyicon.svg'
import registerCompanyIcon from '../assets/companytab/registercompany.svg'
import inviteIcon from '../assets/companytab/inviteicon.svg'
import addPersonAvatar from '../assets/companytab/addpersonavatar.svg'
import arrowsClockwiseIcon from '../assets/companytab/ArrowsClockwise.svg'

interface CompanyTabPageProps {
  onNavigateToHome?: (activeTab: 'forms' | 'jobs' | 'leaderboard' | 'profile' | 'home' | 'company' | 'settings') => void
}

const CompanyTabPage: React.FC<CompanyTabPageProps> = ({ onNavigateToHome }) => {
  const [showAddTeamMemberModal, setShowAddTeamMemberModal] = useState(false)
  const [showCompanySwitchModal, setShowCompanySwitchModal] = useState(false)
  const [showAddNewCompanyModal, setShowAddNewCompanyModal] = useState(false)
  const [showInviteTeamMembersModal, setShowInviteTeamMembersModal] = useState(false)
  const [addedTeamMates, setAddedTeamMates] = useState([])
  const [selectedCompany, setSelectedCompany] = useState('warrikal')

  const handleBottomTabChange = (tab: string) => {
    onNavigateToHome?.(tab as 'forms' | 'jobs' | 'leaderboard' | 'profile' | 'home' | 'company' | 'settings')
  }

  const handleSwitchCompany = () => {
    setShowCompanySwitchModal(true)
  }

  const handleCompanySelect = (company: any) => {
    setSelectedCompany(company.id)
    // TODO: Implement company switching logic
    console.log('Switched to company:', company.name)
  }

  const handleInviteMembers = () => {
    setShowAddTeamMemberModal(true)
  }

  const handleInviteWithEmail = () => {
    // TODO: Implement email invite logic
    console.log('Inviting member via email')
  }

  const handleScanQRCode = () => {
    // TODO: Implement QR invite logic
    console.log('Scanning QR code')
  }

  const handleMatesAdded = (memberIds: string[]) => {
    // Convert member IDs to actual team member objects
    const allTeamMembers = [
      {
        id: '1',
        name: 'Arlene McCoy',
        email: 'arlene.mccoy@email.com',
        avatar: null,
        initials: 'AM',
        color: '#3b82f6'
      },
      {
        id: '2',
        name: 'Bessie Cooper',
        email: 'bessie.cooper@email.com',
        avatar: null,
        initials: 'BC',
        color: '#ff9500'
      },
      {
        id: '3',
        name: 'Marvin McKinney',
        email: 'marvin.mckinney@email.com',
        avatar: null,
        initials: 'MM',
        color: '#10b981'
      },
      {
        id: '4',
        name: 'Theresa Webb',
        email: 'theresa.webb@email.com',
        avatar: null,
        initials: 'TW',
        color: '#8b5cf6'
      },
      {
        id: '5',
        name: 'Cody Fisher',
        email: 'webdragon@msn.com',
        avatar: null,
        initials: 'CF',
        color: '#3b82f6'
      },
      {
        id: '6',
        name: 'Darlene Robertson',
        email: 'darlene.robertson@email.com',
        avatar: null,
        initials: 'DR',
        color: '#ff9500'
      }
    ]

    // Filter to only include selected members
    const selectedMembers = allTeamMembers.filter(member => memberIds.includes(member.id))
    setAddedTeamMates(selectedMembers)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText('EX16 9QT')
    // TODO: Show success toast
    console.log('Company code copied')
  }

  const handleAddByCode = (code: string) => {
    // TODO: Implement join request logic
    console.log('Sending join request for:', code)
  }

  const handleScanQRForCompany = () => {
    // TODO: Implement QR scan logic for company
    console.log('Scanning QR code for company')
  }

  const handleGoToDashboard = () => {
    // TODO: Navigate to dashboard
    console.log('Go to dashboard clicked')
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 h-[72px] relative flex items-center justify-center flex-shrink-0">
        <h1 className="text-[#000000] text-base font-semibold leading-6">Company</h1>
        <button
          onClick={() => setShowAddNewCompanyModal(true)}
          className="absolute right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Add new company"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-[#2a6c7e]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="flex flex-col gap-5">
          {/* Your Company Section */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <h2 className="text-[#344054] text-sm font-medium leading-5">Your Company</h2>
                              <button 
                  onClick={handleSwitchCompany}
                  className="flex items-center gap-0.5 text-[#266273] text-base font-semibold leading-6"
                >
                  Switch
                  <img src={arrowsClockwiseIcon} alt="Switch" className="w-6 h-6" />
                </button>
            </div>
            
            {/* Selected Company Card */}
            <div className="bg-[#ebfe5c] border border-[#2a6c7e] rounded-[20px] p-4 flex items-center gap-3">
              <div className="bg-white rounded-[10px] p-[5.5px] w-11 h-11 flex items-center justify-center">
                <img src={warrikalLogo} alt="Warrikal" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <div className="text-[#101828] text-base font-medium leading-6">
                  {selectedCompany === 'warrikal' ? 'Warrikal' : 
                   selectedCompany === 'linkforce' ? 'Linkforce' : 
                   selectedCompany === 'monadelphous' ? 'Monadelphous' : 'Warrikal'}
                </div>
                <div className="text-[#667085] text-sm font-normal leading-5">
                  {selectedCompany === 'warrikal' ? 'Supervisor' : 
                   selectedCompany === 'linkforce' ? 'Worker' : 
                   selectedCompany === 'monadelphous' ? 'Admin' : 'Supervisor'}
                </div>
              </div>
              <div className="bg-[#17b26a] border border-[#17b26a] rounded-full px-2 py-[3px]">
                <span className="text-white text-xs font-medium leading-[18px]">Selected</span>
              </div>
            </div>

            {/* Company Code */}
            <div className="bg-[#eaf0f2] rounded-lg p-2.5 flex items-center justify-between">
              <span className="text-[#667085] text-xs font-normal leading-5">Company Code</span>
              <div className="flex items-center gap-1">
                <span className="text-[#101828] text-sm font-medium leading-5">EX16 9QT</span>
                <button onClick={handleCopyCode} className="w-6 h-6">
                  <img src={copyIcon} alt="Copy" className="w-full h-full" />
                </button>
              </div>
            </div>
          </div>

          {/* Warrikal Members Section */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-[#344054] text-sm font-medium leading-5">Warrikal Members</h2>
                  <span className="bg-[#266273] text-[#ebfe5c] text-xs font-medium px-2 py-0.5 rounded-full">
                    {addedTeamMates.length}
                  </span>
                </div>
                <button 
                  onClick={() => setShowInviteTeamMembersModal(true)}
                  className="flex items-center gap-0.5 text-[#266273] text-base font-semibold leading-6"
                >
                  Invite
                  <img src={inviteIcon} alt="Invite" className="w-6 h-6" />
                </button>
              </div>
              <p className="text-[#475467] text-xs font-normal leading-[18px]">Add new members to join Warrikal</p>
            </div>

            {/* Team Members Display */}
            <div className="flex items-center gap-3">
              {/* Display up to 5 team mates */}
              {addedTeamMates.slice(0, 5).map((member) => (
                <div
                  key={member.id}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold"
                  style={{ backgroundColor: member.color }}
                >
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-white">{member.initials}</span>
                  )}
                </div>
              ))}
              
              {/* Show +X indicator if more than 5 mates */}
              {addedTeamMates.length > 5 && (
                <div className="w-12 h-12 rounded-full bg-[#266273] flex items-center justify-center text-white font-semibold text-sm">
                  +{addedTeamMates.length - 5}
                </div>
              )}
              
              {/* Add Team Member Icon (always shown) */}
              <img 
                src={addPersonAvatar} 
                alt="Add team member" 
                className="w-12 h-12 cursor-pointer" 
                onClick={() => setShowInviteTeamMembersModal(true)}
              />
            </div>

            {/* Security Notice */}
            <p className="text-[#667085] text-xs font-normal italic leading-5">
              🔒 Only users with Supervisor, HSE, or Admin roles can add team members via QR code.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center">
            <div className="flex-1 border-t border-[#eaecf0]"></div>
            <div className="px-4">
              <span className="text-[#667085] text-sm font-medium">or</span>
            </div>
            <div className="flex-1 border-t border-[#eaecf0]"></div>
          </div>

          {/* Register Your Company Section */}
          <div className="bg-[#f0fdf9] border border-[#709da9] rounded-xl p-4 flex items-center gap-1.5">
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h3 className="text-[#101828] text-base font-semibold leading-6">Register Your Company</h3>
                <p className="text-[#101828] text-sm font-normal leading-5">Manage your team and access insights with SafeMate.</p>
              </div>
              
              <button 
                onClick={handleGoToDashboard}
                className="flex items-center gap-2 self-start"
              >
                <span className="text-[#2a6c7e] text-sm font-semibold leading-5">Go to Dashboard</span>
                <svg className="w-5 h-5 text-[#2a6c7e]" viewBox="0 0 20 20" fill="none">
                  <path d="M4.167 10H15.833M15.833 10L10.833 5M15.833 10L10.833 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="w-[100px] h-[100px] flex-shrink-0">
              <img src={registerCompanyIcon} alt="Register Company" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="company"
        onTabChange={handleBottomTabChange}
        className="flex-shrink-0"
      />

      {/* Add Team Member Modal */}
      <AddTeamMemberModal
        isOpen={showAddTeamMemberModal}
        onClose={() => setShowAddTeamMemberModal(false)}
        onInviteWithEmail={handleInviteWithEmail}
        onScanQRCode={handleScanQRCode}
        onMatesAdded={handleMatesAdded}
      />

      {/* Company Switch Modal */}
      <CompanySwitchModal
        isOpen={showCompanySwitchModal}
        onClose={() => setShowCompanySwitchModal(false)}
        onCompanySelect={handleCompanySelect}
        selectedCompany={selectedCompany}
      />

      {/* Add New Company Modal */}
      <AddNewCompanyModal
        isOpen={showAddNewCompanyModal}
        onClose={() => setShowAddNewCompanyModal(false)}
        onAddByCode={handleAddByCode}
        onScanQRCode={handleScanQRForCompany}
      />

      {/* Invite Team Members Modal */}
      <InviteTeamMembersModal
        isOpen={showInviteTeamMembersModal}
        onClose={() => setShowInviteTeamMembersModal(false)}
        companyCode="EX16 9QT"
      />
    </div>
  )
}

export default CompanyTabPage