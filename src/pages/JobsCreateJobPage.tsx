import React, { useState } from 'react'
import { HeaderWithBack } from '../components/layout'
import { Button, Input, TextareaInput, FileUpload, AddTeamMemberModal } from '../components/ui'
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
  jobLocation: {lat: number, lng: number, address?: string} | null
  locationDescription: string
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
    jobLocation: null,
    locationDescription: '',
    teamName: '',
    photos: [],
    teamMates: []
  })

  const [showAddTeamMemberModal, setShowAddTeamMemberModal] = useState(false)
  const [addedTeamMates, setAddedTeamMates] = useState<TeamMember[]>([])
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  const handleBack = () => {
    onNavigate?.('jobs-select-company')
  }

  const handleInputChange = (field: keyof JobData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.')
      return
    }

    setIsGettingLocation(true)
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setFormData(prev => ({
          ...prev,
          jobLocation: { lat: latitude, lng: longitude }
        }))
        setIsGettingLocation(false)
        
        console.log('Location obtained:', { latitude, longitude })
      },
      (error) => {
        console.error('Error getting location:', error)
        setIsGettingLocation(false)
        alert('Unable to get your location. Please check your location permissions.')
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000
      }
    )
  }

  const copyLocation = async () => {
    if (!formData.jobLocation) return
    
    const locationText = `${formData.jobLocation.lat.toFixed(6)}, ${formData.jobLocation.lng.toFixed(6)}`
    
    try {
      await navigator.clipboard.writeText(locationText)
      console.log('Location copied to clipboard')
    } catch (err) {
      console.error('Failed to copy location:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = locationText
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }

  const shareLocation = async () => {
    if (!formData.jobLocation) return
    
    const locationText = `Job Location: ${formData.jobLocation.lat.toFixed(6)}, ${formData.jobLocation.lng.toFixed(6)}`
    const mapsUrl = `https://www.google.com/maps?q=${formData.jobLocation.lat},${formData.jobLocation.lng}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Job Location',
          text: locationText,
          url: mapsUrl
        })
      } catch (err) {
        console.error('Error sharing location:', err)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${locationText}\n${mapsUrl}`)
        console.log('Location shared via clipboard')
      } catch (err) {
        console.error('Failed to share location:', err)
      }
    }
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

  const isFormValid = formData.jobName && formData.workOrderNumber && formData.jobDescription && formData.jobLocation && formData.teamName

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

          {/* Job Number */}
          <div className="space-y-1.5">
            <label className="font-medium text-[#344054] text-sm leading-5">
              Job Number
            </label>
            <Input
              placeholder="Enter job number"
              value={formData.workOrderNumber}
              onChange={(e) => handleInputChange('workOrderNumber', e.target.value)}
              icon={<img src={workOrderNumberIcon} alt="Job Number" className="w-5 h-5" />}
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

          {/* Job Location */}
          <div className="space-y-1.5">
            <label className="font-medium text-[#344054] text-sm leading-5">
              Choose Job Location *
            </label>
            <div className="relative">
              <div className="flex items-center gap-3 bg-white border border-[#d0d5dd] rounded-xl px-3.5 py-2.5 cursor-pointer hover:border-[#266273] transition-colors" onClick={getCurrentLocation}>
                <div className="w-5 h-5 flex items-center justify-center">
                  {isGettingLocation ? (
                    <div className="w-4 h-4 border-2 border-[#266273] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-4 h-4 text-[#266273]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-[#101828]">
                    {isGettingLocation ? 'Getting your location...' : 'Pin my location'}
                  </span>
                  {formData.jobLocation && (
                    <div className="mt-1">
                      <p className="text-xs text-[#667085]">
                        {formData.jobLocation.lat.toFixed(6)}, {formData.jobLocation.lng.toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Copy and Share buttons on the right side inside the button */}
                {formData.jobLocation && (
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        copyLocation()
                      }}
                      className="p-1.5 text-[#667085] hover:text-[#266273] hover:bg-[#f1f3f4] rounded-[12px] transition-colors"
                      title="Copy coordinates"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        shareLocation()
                      }}
                      className="p-1.5 text-[#667085] hover:text-[#266273] hover:bg-[#f1f3f4] rounded-[12px] transition-colors"
                      title="Share location"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367 2.684z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Map Display */}
          {formData.jobLocation && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-[#101828]">Map</h3>
              <div className="w-full h-80 bg-[#f8f9fa] border border-[#eaecf0] rounded-[12px] overflow-hidden relative">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${formData.jobLocation.lng-0.001},${formData.jobLocation.lat-0.001},${formData.jobLocation.lng+0.001},${formData.jobLocation.lat+0.001}&layer=mapnik&marker=${formData.jobLocation.lat},${formData.jobLocation.lng}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  title="Job Location Map"
                />
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-[6px] text-xs text-[#667085]">
                  📍 Job Location
                </div>
                <div className="absolute bottom-2 left-2">
                  <a
                    href={`https://www.google.com/maps?q=${formData.jobLocation.lat},${formData.jobLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#266273] text-white px-2 py-1 rounded-[6px] text-xs hover:bg-[#1e4f5a] transition-colors"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Location Description */}
          <div className="space-y-1.5">
            <label className="font-medium text-[#344054] text-sm leading-5">
              Location Description (Optional)
            </label>
            <textarea
              value={formData.locationDescription}
              onChange={(e) => handleInputChange('locationDescription', e.target.value)}
              placeholder="Describe the specific location of the job (e.g., 'Near the main entrance', 'On the second floor', 'In the equipment room')"
              className="w-full p-3 border border-[#eaecf0] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent"
              rows={3}
            />
            <p className="text-[#667085] text-sm leading-5">
              Optionally provide additional details to help locate the job quickly
            </p>
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
              🔒 Only users with Leading Hand, Supervisor, HSE, or Admin roles can add team mates via QR code.
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