import React, { useState } from 'react'
import HeaderWithBack from '../../components/layout/HeaderWithBack'
import Button from '../../components/ui/Button'
import warrikalLogo from '../../assets/companylogo/warrikallogo.svg'
import flaggedIcon from '../../assets/takecontrol/flaggedicon.svg'
import moderateIcon from '../../assets/takecontrol/morerateicon.svg'
import goodSmileIcon from '../../assets/takecontrol/goodsmileicon.svg'

interface ReportHazardReviewPageProps {
  onBack: () => void
  onSubmit: () => void
  selectedSite?: {
    id: string
    name: string
    location: string
    image: string
  } | null
  formData?: {
    // Step 1: Hazard Identification
    hazardType?: string
    hazardDescription?: string
    photos?: string[]
    
    // Step 2: Hazard Location
    location?: {
      lat: number
      lng: number
      address: string
    }
    locationDescription?: string
    
    // Step 3: Hazard Classification
    severity?: string
    urgency?: string
    category?: string
    
    // Step 4: Submit Report
    selectedCompany?: string
    selectedSupervisor?: string
    firstName?: string
    lastName?: string
    signature?: string
  }
}

const ReportHazardReviewPage: React.FC<ReportHazardReviewPageProps> = ({
  onBack,
  onSubmit,
  selectedSite,
  formData = {}
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate form submission with a delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    onSubmit()
  }

  // Calculate status based on hazard severity and urgency
  const getFormStatus = () => {
    const severity = formData.severity || ''
    const urgency = formData.urgency || ''
    
    // If severity is "Critical" or urgency is "Immediate", form is flagged
    if (severity === 'Critical' || urgency === 'Immediate') {
      return {
        type: 'flagged',
        title: 'Critical hazard detected',
        message: "This hazard requires immediate attention. Please contact your supervisor immediately.",
        bgColor: 'bg-[#fef3f2]',
        borderColor: 'border-[#f97066]',
        tagColor: 'bg-[#d92d20]',
        icon: flaggedIcon
      }
    }
    
    // If severity is "High" or urgency is "High", status is moderate
    if (severity === 'High' || urgency === 'High') {
      return {
        type: 'moderate',
        title: 'High priority hazard',
        message: "This hazard requires prompt attention. Review the details and submit for immediate action.",
        bgColor: 'bg-[#fefbe8]',
        borderColor: 'border-[#fde272]',
        tagColor: 'bg-[#eaaa08]',
        icon: moderateIcon
      }
    }
    
    // Default: status is good
    return {
      type: 'good',
      title: 'Hazard report ready',
      message: "Your hazard report has been reviewed and is ready for submission. All details look complete.",
      bgColor: 'bg-[#edfcf2]',
      borderColor: 'border-[#73e2a3]',
      tagColor: 'bg-[#17b26a]',
      icon: goodSmileIcon
    }
  }

  const formStatus = getFormStatus()

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header */}
      <HeaderWithBack 
        title="Form detail" 
        onBack={isSubmitting ? undefined : onBack}
        className="flex-shrink-0"
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="flex flex-col gap-5">
          {/* Status Section */}
          <div className={`${formStatus.bgColor} border ${formStatus.borderColor} rounded-xl p-3 flex flex-col gap-2`}>
            {/* Status Tag */}
            <div className={`${formStatus.tagColor} border ${formStatus.tagColor} rounded-md px-2 py-0.5 flex items-center gap-0.5 self-start`}>
              <img src={formStatus.icon} alt={`${formStatus.type} status`} className="w-5 h-5" />
              <span className="text-white text-sm font-medium leading-5 capitalize">{formStatus.type}</span>
            </div>
            
            {/* Status Content */}
            <div className="flex flex-col gap-0.5">
              <h3 className="text-[#101828] text-base font-medium leading-6">{formStatus.title}</h3>
              <p className="text-[#475467] text-sm font-normal leading-5">
                {formStatus.message}
              </p>
            </div>
          </div>

          {/* Form Detail Header */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h2 className="text-[#344054] text-sm font-medium leading-5">Form detail</h2>
              <span className="text-[#344054] text-sm font-medium leading-5">#RH0001</span>
            </div>

            {/* Site Information */}
            <div className="bg-white rounded-xl border border-[#d0d5dd] p-3">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-[#266273] text-base font-bold leading-6">Site Information</h3>
                </div>
                
                <div className="flex flex-col gap-2">
                  {/* Company */}
                  <div className="flex flex-col gap-1">
                    <div className="text-[#344054] text-sm font-medium leading-5">Company</div>
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-md flex items-center justify-center">
                        <img src={warrikalLogo} alt="Warrikal" className="w-full h-6" />
                      </div>
                      <span className="text-[#101828] text-sm font-medium leading-5">Warrikal</span>
                    </div>
                  </div>

                  {/* Site */}
                  {selectedSite && (
                    <div className="flex flex-col gap-1">
                      <div className="text-[#344054] text-sm font-medium leading-5">Site</div>
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 overflow-hidden rounded-[4.6px]">
                          <img src={selectedSite.image} alt={selectedSite.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#101828] text-base font-semibold leading-6">{selectedSite.name}</span>
                          <span className="text-[#667085] text-sm font-normal leading-5">{selectedSite.location}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Hazard Details */}
            <div className="bg-white rounded-xl border border-[#d0d5dd] p-3">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-[#266273] text-base font-bold leading-6">Hazard Details</h3>
                </div>
                
                <div className="flex flex-col gap-3">
                  {/* Hazard Type */}
                  {formData.hazardType && (
                    <div className="flex flex-col gap-1">
                      <div className="text-[#344054] text-sm font-medium leading-5">Hazard Type</div>
                      <div className="text-[#101828] text-sm font-normal leading-5">{formData.hazardType}</div>
                    </div>
                  )}

                  {/* Hazard Description */}
                  {formData.hazardDescription && (
                    <div className="flex flex-col gap-1">
                      <div className="text-[#344054] text-sm font-medium leading-5">Description</div>
                      <div className="text-[#101828] text-sm font-normal leading-5">{formData.hazardDescription}</div>
                    </div>
                  )}

                  {/* Photos */}
                  {formData.photos && formData.photos.length > 0 && (
                    <div className="flex flex-col gap-1">
                      <div className="text-[#344054] text-sm font-medium leading-5">Photos</div>
                      <div className="flex gap-2">
                        {formData.photos.map((photo, index) => (
                          <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                            <img src={photo} alt={`Hazard photo ${index + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Location Information */}
            {formData.location && (
              <div className="bg-white rounded-xl border border-[#d0d5dd] p-3">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[#266273] text-base font-bold leading-6">Location</h3>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {/* Location Address */}
                    <div className="flex flex-col gap-1">
                      <div className="text-[#344054] text-sm font-medium leading-5">Address</div>
                      <div className="text-[#101828] text-sm font-normal leading-5">{formData.location.address}</div>
                    </div>

                    {/* Location Description */}
                    {formData.locationDescription && (
                      <div className="flex flex-col gap-1">
                        <div className="text-[#344054] text-sm font-medium leading-5">Description</div>
                        <div className="text-[#101828] text-sm font-normal leading-5">{formData.locationDescription}</div>
                      </div>
                    )}

                    {/* Coordinates */}
                    <div className="flex flex-col gap-1">
                      <div className="text-[#344054] text-sm font-medium leading-5">Coordinates</div>
                      <div className="text-[#101828] text-sm font-normal leading-5">
                        {formData.location.lat.toFixed(6)}, {formData.location.lng.toFixed(6)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hazard Classification */}
            {(formData.severity || formData.urgency || formData.category) && (
              <div className="bg-white rounded-xl border border-[#d0d5dd] p-3">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[#266273] text-base font-bold leading-6">Classification</h3>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {/* Severity */}
                    {formData.severity && (
                      <div className="flex flex-col gap-1">
                        <div className="text-[#344054] text-sm font-medium leading-5">Severity</div>
                        <div className="text-[#101828] text-sm font-normal leading-5">{formData.severity}</div>
                      </div>
                    )}

                    {/* Urgency */}
                    {formData.urgency && (
                      <div className="flex flex-col gap-1">
                        <div className="text-[#344054] text-sm font-medium leading-5">Urgency</div>
                        <div className="text-[#101828] text-sm font-normal leading-5">{formData.urgency}</div>
                      </div>
                    )}

                    {/* Category */}
                    {formData.category && (
                      <div className="flex flex-col gap-1">
                        <div className="text-[#344054] text-sm font-medium leading-5">Category</div>
                        <div className="text-[#101828] text-sm font-normal leading-5">{formData.category}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Worker Information */}
            {(formData.firstName || formData.lastName || formData.selectedSupervisor) && (
              <div className="bg-white rounded-xl border border-[#d0d5dd] p-3">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[#266273] text-base font-bold leading-6">Worker Information</h3>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {/* Worker Name */}
                    {(formData.firstName || formData.lastName) && (
                      <div className="flex flex-col gap-1">
                        <div className="text-[#344054] text-sm font-medium leading-5">Worker Name</div>
                        <div className="text-[#101828] text-sm font-normal leading-5">
                          {formData.firstName} {formData.lastName}
                        </div>
                      </div>
                    )}

                    {/* Supervisor */}
                    {formData.selectedSupervisor && (
                      <div className="flex flex-col gap-1">
                        <div className="text-[#344054] text-sm font-medium leading-5">Supervisor</div>
                        <div className="text-[#101828] text-sm font-normal leading-5">Selected</div>
                      </div>
                    )}

                    {/* Signature */}
                    {formData.signature && (
                      <div className="flex flex-col gap-1">
                        <div className="text-[#344054] text-sm font-medium leading-5">Signature</div>
                        <div className="w-32 h-16 rounded-lg overflow-hidden">
                          <img src={formData.signature} alt="Worker signature" className="w-full h-full object-contain" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="px-4 py-3 flex gap-4 flex-shrink-0">
        <Button
          onClick={onBack}
          variant="light-teal"
          className="flex-1"
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </Button>
      </div>
    </div>
  )
}

export default ReportHazardReviewPage 