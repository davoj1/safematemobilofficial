import React, { useState } from 'react'
import { HeaderWithBack } from '../components/layout'
import { Button, Input, TextareaInput, FileUpload, MineCompanyModal, MineSiteModal, AddTeamMemberModal } from '../components/ui'
import addTeamMemberIcon from '../assets/jobs/addteammembericon.svg'
import qrCodeIcon from '../assets/jobs/QrCode.svg'
import workOrderNumberIcon from '../assets/jobs/workordernumbericon.svg'
import arleneIcon from '../assets/jobs/arlene.svg'
import bessieIcon from '../assets/jobs/besse.svg'
import marvinIcon from '../assets/jobs/marvin.svg'
import theresaIcon from '../assets/jobs/theresa.svg'

interface JobsCreateJobPageProps {
  onNavigate?: (view: "home" | "company" | "settings" | "onboarding" | "jobs-select-company" | "jobs-create-job" | "jobs-completed-review" | "job-team-chat" | "forms-select-mine-company" | "forms-bhp-site-selection" | "forms-warrikal-take-control" | "forms-warrikal-take-control-review" | "forms-warrikal-take-control-success" | "forms-warrikal-fatigue-management-step1" | "forms-warrikal-fatigue-management-step2" | "forms-warrikal-fatigue-management-step3" | "forms-warrikal-fatigue-management-step4" | "forms-warrikal-fatigue-management-step5" | "forms-warrikal-fatigue-management-step6" | "forms-warrikal-fatigue-management-success" | "forms-goodline-fatigue-form" | "forms-goodline-fatigue-step1" | "forms-goodline-fatigue-step2" | "forms-goodline-fatigue-step3" | "forms-goodline-fatigue-step4" | "forms-goodline-fatigue-step5" | "forms-goodline-fatigue-summary" | "forms-goodline-take-control-form" | "forms-goodline-take-control-review" | "forms-goodline-take-control-success" | "forms-goodline-pace-cards-form" | "forms-linkforce-take-control-form" | "forms-linkforce-take-control-review" | "forms-linkforce-take-control-success" | "forms-monadelphous-take-control-form" | "forms-monadelphous-take-control-review" | "forms-monadelphous-take-control-success" | "forms-rio-take5-control-selector" | "forms-rio-take5-step1" | "forms-rio-take5-step2" | "forms-rio-take5-step3" | "forms-rio-take5-step4" | "forms-rio-take5-step5" | "forms-rio-take5-step6" | "forms-rio-take5-success" | "forms-general-report-hazard-step1" | "forms-general-report-hazard-step2" | "forms-general-report-hazard-step3" | "forms-general-report-hazard-step4" | "forms-general-report-hazard-review" | "forms-hazard-identification" | "forms-company-worker-details" | "leaderboard" | "leaderboard-company-selection" | "leaderboard-team-selection" | "leaderboard-results" | "profile-enter-full-name" | "profile-created-success") => void
  onJobCreated?: (jobData: JobData) => void
}

interface TeamMember {
  id: string
  name: string
  email: string
  avatar?: string
  initials?: string
  color?: string
}

interface JobData {
  jobName: string
  workOrderNumber: string
  jobDescription: string
  mineCompany: string
  mineSite: string
  teamName: string
  photos: File[]
  teamMates: TeamMember[]
}

const JobsCreateJobPage: React.FC<JobsCreateJobPageProps> = ({ 
  onNavigate,
  onJobCreated 
}) => {
  const [formData, setFormData] = useState<JobData>({
    jobName: '',
    workOrderNumber: '',
    jobDescription: '',
    mineCompany: '',
    mineSite: '',
    teamName: '',
    photos: [],
    teamMates: []
  })

  const [showMineCompanyModal, setShowMineCompanyModal] = useState(false)
  const [showMineSiteModal, setShowMineSiteModal] = useState(false)
  const [showAddTeamMemberModal, setShowAddTeamMemberModal] = useState(false)
  const [selectedCompanyLogo, setSelectedCompanyLogo] = useState<string | null>(null)
  const [selectedSiteImage, setSelectedSiteImage] = useState<string | null>(null)
  const [addedTeamMates, setAddedTeamMates] = useState<TeamMember[]>([])

  const handleBack = () => {
    onNavigate?.('jobs-select-company')
  }

  const handleInputChange = (field: keyof JobData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleMineCompanySelect = (company: any, otherCompany?: { name: string; reason: string }) => {
    if (otherCompany) {
      setFormData(prev => ({
        ...prev,
        mineCompany: otherCompany.name,
        mineSite: '' // Reset mine site when company changes
      }))
      setSelectedCompanyLogo(null)
      setSelectedSiteImage(null)
    } else if (company) {
      setFormData(prev => ({
        ...prev,
        mineCompany: company.name,
        mineSite: '' // Reset mine site when company changes
      }))
      setSelectedCompanyLogo(company.logo)
      setSelectedSiteImage(null)
    }
  }

  const handleMineSiteSelect = (site: any) => {
    setFormData(prev => ({
      ...prev,
      mineSite: site.name
    }))
    setSelectedSiteImage(site.image)
  }

  const handlePhotoUpload = (files: File[]) => {
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files].slice(0, 10) // Max 10 photos
    }))
  }

  const handleCreateJob = () => {
    // TODO: Validate form data
    onJobCreated?.(formData)
    // TODO: Navigate to next step or job created success
  }

  const handleInviteTeamMates = () => {
    setShowAddTeamMemberModal(true)
  }

  const handleInviteWithEmail = () => {
    // TODO: Implement email invitation flow
    setShowAddTeamMemberModal(false)
  }

  const handleScanQRCode = () => {
    // TODO: Implement QR code scanner
    setShowAddTeamMemberModal(false)
  }

  const handleMatesAdded = (memberIds: string[]) => {
    // Convert member IDs to actual team member objects
    const allTeamMembers = [
      {
        id: '1',
        name: 'Arlene McCoy',
        email: 'arlene.mccoy@email.com',
        avatar: arleneIcon
      },
      {
        id: '2',
        name: 'Bessie Cooper',
        email: 'bessie.cooper@email.com',
        avatar: bessieIcon
      },
      {
        id: '3',
        name: 'Marvin McKinney',
        email: 'marvin.mckinney@email.com',
        avatar: marvinIcon
      },
      {
        id: '4',
        name: 'Theresa Webb',
        email: 'theresa.webb@email.com',
        avatar: theresaIcon
      },
      {
        id: '5',
        name: 'Cody Fisher',
        email: 'webdragon@msn.com',
        initials: 'CF',
        color: '#3b82f6'
      },
      {
        id: '6',
        name: 'Darlene Robertson',
        email: 'darlene.robertson@email.com',
        initials: 'DR',
        color: '#ff9500'
      }
    ]
    
    const selectedMates = allTeamMembers.filter(member => memberIds.includes(member.id))
    setAddedTeamMates(selectedMates)
  }

  const isFormValid = formData.jobName && formData.workOrderNumber && formData.jobDescription && formData.mineCompany && formData.teamName

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header */}
      <HeaderWithBack 
        title="Create New Job"
        onBack={handleBack}
      />

      {/* Main Content */}
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto overscroll-contain touch-pan-y">
        <div className="space-y-4">
          {/* Job Name */}
          <div className="space-y-1.5">
            <label className="font-medium text-[#344054] text-sm leading-5">
              Job Name
            </label>
            <Input
              placeholder="Enter job name"
              value={formData.jobName}
              onChange={(e) => handleInputChange('jobName', e.target.value)}
            />
          </div>

          {/* Work Order Number */}
          <div className="space-y-1.5">
            <label className="font-medium text-[#344054] text-sm leading-5">
              Work Order Number
            </label>
            <Input
              placeholder="Enter work order number"
              value={formData.workOrderNumber}
              onChange={(e) => handleInputChange('workOrderNumber', e.target.value)}
              icon={<img src={workOrderNumberIcon} alt="Work Order Number" className="w-5 h-5" />}
            />
          </div>

          {/* Job Description */}
          <div className="space-y-1.5">
            <label className="font-medium text-[#344054] text-sm leading-5">
              Job Description
            </label>
            <TextareaInput
              placeholder="Describe the job tasks and requirements"
              value={formData.jobDescription}
              onChange={(value) => handleInputChange('jobDescription', value)}
              rows={5}
            />
          </div>

          {/* Mine Company */}
          <div className="space-y-1.5">
            <label className="font-medium text-[#344054] text-sm leading-5">
              Select Mine Company
            </label>
            <div className="relative">
              <div className="flex items-center gap-3 bg-white border border-[#d0d5dd] rounded-xl px-3.5 py-2.5 cursor-pointer hover:border-[#266273] transition-colors" onClick={() => setShowMineCompanyModal(true)}>
                {selectedCompanyLogo && (
                  <div className="w-[54px] h-[54px] bg-white rounded-[10px] border border-[#eaecf0] flex items-center justify-center p-[5.5px] flex-shrink-0">
                    <img
                      src={selectedCompanyLogo}
                      alt="Company logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-normal text-[#667085] text-base leading-6">
                    {formData.mineCompany || 'Select mine company'}
                  </div>
                </div>
                <div className="w-4 h-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#98a2b3]">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Mine Site */}
          <div className="space-y-1.5">
            <label className="font-medium text-[#344054] text-sm leading-5">
              Mine Site
            </label>
            <div className="relative">
              <div 
                className={`flex items-center gap-3 border border-[#d0d5dd] rounded-xl px-3.5 py-2.5 cursor-pointer transition-colors ${
                  formData.mineCompany 
                    ? 'bg-white hover:border-[#266273]' 
                    : 'bg-gray-50 cursor-not-allowed'
                }`}
                onClick={() => formData.mineCompany && setShowMineSiteModal(true)}
              >
                {selectedSiteImage && (
                  <div className="w-[54px] h-[54px] rounded-[6.894px] overflow-hidden flex-shrink-0">
                    <img
                      src={selectedSiteImage}
                      alt="Site image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className={`font-normal text-base leading-6 ${
                    formData.mineCompany ? 'text-[#667085]' : 'text-[#667085]'
                  }`}>
                    {formData.mineSite || 'Select mine site'}
                  </div>
                </div>
                <div className="w-4 h-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#98a2b3]">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Add Photos */}
          <div className="space-y-1.5">
            <div className="space-y-0.5">
              <label className="font-medium text-[#344054] text-sm leading-5">
                Add Photos (Optional)
              </label>
              <p className="font-normal text-[#475467] text-xs leading-[18px]">
                A maximum of 10 photos is allowed. Photos have maximum size of 10Mb
              </p>
            </div>
            <FileUpload
              onFileSelect={handlePhotoUpload}
              maxFiles={10}
              maxSize={10 * 1024 * 1024} // 10MB
              acceptedTypes={['image/*']}
              placeholder={`Click to upload photo (${formData.photos.length}/10)`}
            />
          </div>

          {/* Team Name */}
          <div className="space-y-1.5">
            <label className="font-medium text-[#344054] text-sm leading-5">
              Team Name
            </label>
            <Input
              placeholder="Enter team name"
              value={formData.teamName}
              onChange={(e) => handleInputChange('teamName', e.target.value)}
            />
          </div>

          {/* Team Mates */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <label className="font-medium text-[#344054] text-sm leading-5">
                    Team Mates
                  </label>
                  <span className="bg-[#266273] text-[#ebfe5c] text-xs font-medium px-2 py-0.5 rounded-full">
                    {addedTeamMates.length}
                  </span>
                </div>
                <p className="font-normal text-[#475467] text-xs leading-[18px]">
                  Add team mates to join your job
                </p>
              </div>
              <button
                onClick={handleInviteTeamMates}
                className="flex items-center gap-1 text-[#266273] font-semibold text-base leading-6"
              >
                <span>Invite</span>
                <img src={qrCodeIcon} alt="QR Code" className="w-6 h-6" />
              </button>
            </div>

            {/* Team Mates Display */}
            <div className="flex items-center gap-2">
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
              
              {/* Add Team Mate Icon (always shown) */}
              <img 
                src={addTeamMemberIcon} 
                alt="Add team mate" 
                className="w-12 h-12 cursor-pointer" 
                onClick={() => setShowAddTeamMemberModal(true)}
              />
            </div>

            {/* Note about permissions */}
            <p className="font-normal italic text-[#667085] text-xs leading-5">
              🔒 Only users with Supervisor, HSE, or Admin roles can add team mates via QR code.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-5 py-4 flex-shrink-0">
        <Button
          variant="primary"
          size="lg"
          onClick={handleCreateJob}
          disabled={!isFormValid}
          className="w-full"
        >
          Create job
        </Button>
      </div>

      {/* Mine Company Modal */}
      <MineCompanyModal
        isOpen={showMineCompanyModal}
        onClose={() => setShowMineCompanyModal(false)}
        onSelect={handleMineCompanySelect}
      />

      {/* Mine Site Modal */}
      <MineSiteModal
        isOpen={showMineSiteModal}
        onClose={() => setShowMineSiteModal(false)}
        onSelect={handleMineSiteSelect}
      />

      {/* Add Team Member Modal */}
      <AddTeamMemberModal
        isOpen={showAddTeamMemberModal}
        onClose={() => setShowAddTeamMemberModal(false)}
        onInviteWithEmail={handleInviteWithEmail}
        onScanQRCode={handleScanQRCode}
        onMatesAdded={handleMatesAdded}
      />
    </div>
  )
}

export default JobsCreateJobPage 