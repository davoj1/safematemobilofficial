import React, { useState } from 'react'
import HeaderWithBack from '../../../components/layout/HeaderWithBack'
import Button from '../../../components/ui/Button'
import goodlineLogo from '../../../assets/companylogo/goodlinelogo.svg'
import fmgLogo from '../../../assets/companylogo/fmglogo.svg'
import bhpLogo from '../../../assets/companylogo/bhplogo.svg'
import greenFace from '../../../assets/fatiguemanagement/greenface.svg'
import maleIcon from '../../../assets/fatiguemanagement/maleicon.svg'
import alertFaceIcon from '../../../assets/fatiguemanagement/face1.svg'
import goodSmileIcon from '../../../assets/takecontrol/goodsmileicon.svg'
import moderateIcon from '../../../assets/takecontrol/morerateicon.svg'
import flaggedIcon from '../../../assets/takecontrol/flaggedicon.svg'

// Risk Level SVG Component
const RiskLevelSVG: React.FC<{ riskScore: number }> = ({ riskScore }) => {
  // Determine which segments should be active based on risk score
  const getSegmentColor = (segmentIndex: number) => {
    let segmentsToFill = 0
    
    if (riskScore === 0) {
      segmentsToFill = 0
    } else if (riskScore <= 2) {
      segmentsToFill = 1
    } else if (riskScore <= 4) {
      segmentsToFill = 2
    } else if (riskScore <= 6) {
      segmentsToFill = 3
    } else if (riskScore <= 8) {
      segmentsToFill = 4
    } else {
      segmentsToFill = 5
    }
    
    if (segmentIndex < segmentsToFill) {
      if (riskScore <= 2) {
        return '#47CD89'
      } else if (riskScore <= 4) {
        return segmentIndex === 0 ? '#47CD89' : '#FFC107'
      } else {
        if (segmentIndex === 0) return '#47CD89'
        if (segmentIndex <= 1) return '#FFC107'
        return '#DC2626'
      }
    } else {
      return '#F0F1F1'
    }
  }

  return (
    <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.0298 53.3107C8.79644 75.5304 0.032648 102.328 9.09853e-05 129.846L41.6001 129.895C41.6222 111.183 47.5816 92.9607 58.6202 77.8513L25.0298 53.3107Z" fill={getSegmentColor(0)} />
      <path d="M90.6487 6.09892C64.4881 14.4076 41.6287 30.7835 25.3455 52.8804L58.835 77.5586C69.9075 62.5328 85.4519 51.3972 103.241 45.7473L90.6487 6.09892Z" fill={getSegmentColor(1)} />
      <path d="M171.343 6.74932C145.42 -1.94636 117.415 -2.24692 91.3115 5.89039L103.692 45.6055C121.442 40.0721 140.486 40.2765 158.113 46.1895L171.343 6.74932Z" fill={getSegmentColor(2)} />
      <path d="M234.556 52.7466C218.81 31.4357 196.928 15.4453 171.84 6.9172L158.452 46.3037C175.511 52.1028 190.391 62.9763 201.098 77.4677L234.556 52.7466Z" fill={getSegmentColor(3)} />
      <path d="M260 130C260 102.39 251.21 75.4974 234.902 53.2179L201.334 77.7882C212.423 92.9382 218.4 111.225 218.4 130H260Z" fill={getSegmentColor(4)} />
    </svg>
  )
}


interface GoodlineFatigueSummaryPageProps {
  onBack: () => void
  onSubmit: () => void
  mineCompany?: 'bhp' | 'fmg'
  selectedSite?: {
    id: string
    name: string
    location: string
    image: string
  } | null
  formData?: {
    // Step 1: Fitness for Duty
    fitForWork?: string
    unreportedMedication?: string
    workFromHome?: string
    workFromHomeApproved?: string
    fitForWorkComment?: string
    unreportedMedicationComment?: string
    
    // Step 2: Rest & Alertness
    hoursSlept?: string
    feelingAlert?: string
    feelingAlertComment?: string
    
    // Step 3: Hydration & Alcohol
    waterIntake?: string
    alcoholIntake?: string
    breathTest?: string
    
    // Step 4: Wellbeing
    stressedOrDistracted?: string
    sickOrFlu?: string
    stressedComment?: string
    sickComment?: string
    
    // Step 5: Submission
    firstName?: string
    lastName?: string
    signature?: string
  }
}

const GoodlineFatigueSummaryPage: React.FC<GoodlineFatigueSummaryPageProps> = ({
  onBack,
  onSubmit,
  mineCompany = 'fmg',
  selectedSite,
  formData = {}
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    onSubmit()
  }

  const getMineCompanyLogo = () => {
    return mineCompany === 'bhp' ? bhpLogo : fmgLogo
  }

  const getMineCompanyName = () => {
    return mineCompany === 'bhp' ? 'BHP' : 'FMG'
  }

  // Calculate form status based on critical conditions
  const getFormStatus = () => {
    // Check for critical conditions that require immediate supervisor contact
    const hasCriticalConditions = 
      formData.fitForWork === 'no' ||
      formData.breathTest === 'positive' ||
      formData.stressedOrDistracted === 'yes' ||
      formData.sickOrFlu === 'yes' ||
      (formData.workFromHome === 'yes' && formData.workFromHomeApproved === 'no')
    
    // Check for moderate risk conditions
    const hasModerateConditions = 
      formData.unreportedMedication === 'yes' ||
      formData.feelingAlert === 'no' ||
      (formData.hoursSlept === '0' || formData.hoursSlept === '1' || formData.hoursSlept === '2') ||
      (formData.alcoholIntake && ['3', '4', '5', '6', '7', '8', '9', '10+'].includes(formData.alcoholIntake))
    
    // If any critical conditions, form is flagged
    if (hasCriticalConditions) {
      return {
        type: 'flagged',
        title: 'Please speak with your supervisor',
        message: "This form has been flagged for safety concerns. Check the form again or report to your supervisor.",
        bgColor: 'bg-[#fef3f2]',
        borderColor: 'border-[#f97066]',
        tagColor: 'bg-[#d92d20]',
        icon: flaggedIcon
      }
    }
    
    // If moderate conditions but no critical, status is moderate
    if (hasModerateConditions) {
      return {
        type: 'moderate',
        title: 'Needs review',
        message: "Your form looks mostly good, but we suggest reviewing a few details before submission.",
        bgColor: 'bg-[#fefbe8]',
        borderColor: 'border-[#fde272]',
        tagColor: 'bg-[#eaaa08]',
        icon: moderateIcon
      }
    }
    
    // If no issues, status is good
    return {
      type: 'good',
      title: 'Everything looks great',
      message: "Your form has been reviewed and marked as safe. You're good to go! ✅",
      bgColor: 'bg-[#edfcf2]',
      borderColor: 'border-[#73e2a3]',
      tagColor: 'bg-[#17b26a]',
      icon: goodSmileIcon
    }
  }

  const formStatus = getFormStatus()

  const getRiskScore = () => {
    let score = 0
    
    // Step 1: Fitness for Duty
    if (formData.fitForWork === 'no') score += 3
    if (formData.unreportedMedication === 'yes') score += 2
    if (formData.workFromHome === 'yes' && formData.workFromHomeApproved === 'no') score += 3
    
    // Step 2: Rest & Alertness
    if (formData.hoursSlept === '0' || formData.hoursSlept === '1' || formData.hoursSlept === '2') score += 2
    else if (formData.hoursSlept === '3' || formData.hoursSlept === '4' || formData.hoursSlept === '5') score += 1
    if (formData.feelingAlert === 'no') score += 2
    
    // Step 3: Hydration & Alcohol
    if (formData.waterIntake === '0' || formData.waterIntake === '1' || formData.waterIntake === '2') score += 1
    if (formData.alcoholIntake === '3' || formData.alcoholIntake === '4' || formData.alcoholIntake === '5' || formData.alcoholIntake === '6' || formData.alcoholIntake === '7' || formData.alcoholIntake === '8' || formData.alcoholIntake === '9' || formData.alcoholIntake === '10+') score += 2
    if (formData.breathTest === 'positive') score += 5
    
    // Step 4: Wellbeing
    if (formData.stressedOrDistracted === 'yes') score += 2
    if (formData.sickOrFlu === 'yes') score += 2
    
    return score
  }

  const riskScore = getRiskScore()
  
  const getRiskLevel = () => {
    if (riskScore <= 2) return { level: 'LOW', color: 'bg-green-400', status: 'Safe to Start Work' }
    if (riskScore <= 4) return { level: 'MODERATE', color: 'bg-yellow-400', status: 'Review Work Activities' }
    return { level: 'HIGH', color: 'bg-red-400', status: 'Report to Supervisor Immediately' }
  }

  const riskLevel = getRiskLevel()

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header */}
      <HeaderWithBack
        title="Goodline Fatigue Form Summary"
        onBack={onBack}
        className="flex-shrink-0"
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="flex flex-col gap-5">
        {/* Form Detail Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm font-medium text-[#344054]">
            <span>Form detail</span>
            <span>#GL0001</span>
          </div>

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

          {/* Mine Company Info */}
          <div className="bg-white rounded-xl border border-[#d0d5dd] p-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[#266273] text-base font-bold">Mine Company Info</h3>
              <button className="text-[#558998] text-sm font-semibold px-1 py-0.5">Edit</button>
            </div>
            
            <div className="space-y-2">
              {/* Mine Company */}
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">Mine Company</div>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-md border border-[#eaecf0] p-1 flex items-center justify-center">
                    <img 
                      src={getMineCompanyLogo()} 
                      alt={getMineCompanyName()}
                      className="w-full h-6 object-contain"
                    />
                  </div>
                  <span className="text-[#101828] text-sm font-medium">{getMineCompanyName()}</span>
                </div>
              </div>
              
              {/* Site */}
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">Site</div>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-[4.6px] overflow-hidden">
                    {selectedSite ? (
                      <img 
                        src={selectedSite.image} 
                        alt={selectedSite.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200"></div>
                    )}
                  </div>
                  <div>
                    <div className="text-[#101828] text-base font-semibold">
                      {selectedSite?.name || (mineCompany === 'bhp' ? 'BMA Australia' : 'FMG Christmas Creek')}
                    </div>
                    <div className="text-[#667085] text-sm">
                      {selectedSite?.location || (mineCompany === 'bhp' ? 'Bowen Basin, QLD' : 'Pilbara, WA')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fitness for Duty */}
          <div className="bg-white rounded-xl border border-[#d0d5dd] p-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[#266273] text-base font-bold">Fitness for Duty</h3>
              <button className="text-[#558998] text-sm font-semibold px-1 py-0.5">Edit</button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">Are you ok to Work your shift?</div>
                <div className="text-[#667085] text-sm">{formData.fitForWork === 'yes' ? 'Yes' : 'No'}</div>
                {formData.fitForWorkComment && (
                  <div className="text-[#667085] text-sm italic">"{formData.fitForWorkComment}"</div>
                )}
              </div>
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">Are you taking any unreported medication?</div>
                <div className="text-[#667085] text-sm">{formData.unreportedMedication === 'yes' ? 'Yes' : 'No'}</div>
                {formData.unreportedMedicationComment && (
                  <div className="text-[#667085] text-sm italic">"{formData.unreportedMedicationComment}"</div>
                )}
              </div>
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">Are you working from home?</div>
                <div className="text-[#667085] text-sm">{formData.workFromHome === 'yes' ? 'Yes' : 'No'}</div>
                {formData.workFromHome === 'yes' && (
                  <div className="space-y-1">
                    <div className="text-[#344054] text-sm font-medium">Are you approved to do so?</div>
                    <div className="text-[#667085] text-sm">{formData.workFromHomeApproved === 'yes' ? 'Yes' : 'No'}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Rest & Alertness */}
          <div className="bg-white rounded-xl border border-[#d0d5dd] p-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[#266273] text-base font-bold">Rest & Alertness</h3>
              <button className="text-[#558998] text-sm font-semibold px-1 py-0.5">Edit</button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">Hours slept in last 24?</div>
                <div className="text-[#667085] text-sm">{formData.hoursSlept || '8 hours'}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">Feeling alert and focused?</div>
                <div className="text-[#667085] text-sm">{formData.feelingAlert === 'yes' ? 'Yes' : 'No'}</div>
                {formData.feelingAlertComment && (
                  <div className="text-[#667085] text-sm italic">"{formData.feelingAlertComment}"</div>
                )}
              </div>
            </div>
          </div>

          {/* Hydration & Alcohol */}
          <div className="bg-white rounded-xl border border-[#d0d5dd] p-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[#266273] text-base font-bold">Hydration & Alcohol</h3>
              <button className="text-[#558998] text-sm font-semibold px-1 py-0.5">Edit</button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">How many glasses of water have you drunk in the last 12 hours?</div>
                <div className="text-[#667085] text-sm">{formData.waterIntake || '5 glasses'}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">How many drinks of alcohol have you drunk in the last 12 hours?</div>
                <div className="text-[#667085] text-sm">{formData.alcoholIntake || '0 drinks'}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">Breath test result:</div>
                <div className="text-[#667085] text-sm">{formData.breathTest === 'positive' ? 'Positive' : formData.breathTest === 'negative' ? 'Negative' : 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* Wellbeing */}
          <div className="bg-white rounded-xl border border-[#d0d5dd] p-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[#266273] text-base font-bold">Wellbeing</h3>
              <button className="text-[#558998] text-sm font-semibold px-1 py-0.5">Edit</button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">Are you feeling stressed or distracted?</div>
                <div className="text-[#667085] text-sm">{formData.stressedOrDistracted === 'yes' ? 'Yes' : 'No'}</div>
                {formData.stressedComment && (
                  <div className="text-[#667085] text-sm italic">"{formData.stressedComment}"</div>
                )}
              </div>
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">Are you feeling unwell?</div>
                <div className="text-[#667085] text-sm">{formData.sickOrFlu === 'yes' ? 'Yes' : 'No'}</div>
                {formData.sickComment && (
                  <div className="text-[#667085] text-sm italic">"{formData.sickComment}"</div>
                )}
              </div>
            </div>
          </div>

          {/* Risk Score Bar */}
          <div className="bg-white rounded-xl border border-[#d0d5dd] p-3 space-y-3">
            <div className="text-[#344054] text-base font-semibold text-center">{riskLevel.status}</div>
            
            <div className="relative h-[179px] w-full">
              {/* Risk Level Indicator */}
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
                {/* Risk Level SVG */}
                <div className="relative w-[260px] h-[130px]">
                  <RiskLevelSVG riskScore={riskScore} />
                </div>
                
                {/* Labels */}
                <div className="absolute left-[20px] top-[141px] text-[#344054] text-xs font-medium text-center transform -translate-y-1/2">LOW</div>
                <div className="absolute right-[13px] top-[141px] text-[#344054] text-xs font-medium text-left transform -translate-y-1/2">CRITICAL</div>
                
                {/* Center Score Display */}
                <div className="absolute left-1/2 top-14 transform -translate-x-1/2 text-center w-[72px]">
                  <div className="text-[#101828] text-[60px] font-bold leading-[72px] tracking-[-1.2px]">{riskScore}</div>
                  <div className="text-[#344054] text-sm font-semibold">Risk Score</div>
                </div>
                
                {/* Bottom description */}
                <div className="absolute left-1/2 top-[165px] transform -translate-x-1/2 text-center">
                  <div className="text-[#101828] text-sm font-medium whitespace-nowrap">
                    {riskScore <= 2 ? '0-2 Points: Safe to Start work.' : 
                     riskScore <= 4 ? '3-4 Points: Review work activities.' :
                     '5+ Points: Report to Supervisor Immediately.'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="bg-white rounded-xl border border-[#d0d5dd] p-3 space-y-2.5">
            <div className="flex items-start justify-between">
              <h3 className="text-[#266273] text-base font-bold">Company Information</h3>
            </div>
            
            <div className="space-y-2">
              {/* Company name */}
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">Company name</div>
                <div className="flex items-center gap-1">
                  <div className="w-9 h-9 rounded-md border border-[#eaecf0] bg-white p-1 flex items-center justify-center">
                    <img 
                      src={goodlineLogo} 
                      alt="Goodline"
                      className="w-full h-6 object-contain"
                    />
                  </div>
                  <span className="text-[#101828] text-sm font-medium">Goodline</span>
                </div>
              </div>
              
              {/* First name */}
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">First name</div>
                <div className="text-[#667085] text-sm">{formData.firstName || 'John'}</div>
              </div>
              
              {/* Last name */}
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">Last name</div>
                <div className="text-[#667085] text-sm">{formData.lastName || 'Doe'}</div>
              </div>
              
              {/* Worker's signature */}
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">Worker's signature</div>
                {formData.signature ? (
                  <img 
                    src={formData.signature} 
                    alt="Signature" 
                    className="w-[150px] h-[62px] object-contain"
                  />
                ) : (
                  <div className="w-[150px] h-[62px] bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-[#667085] text-sm">No signature</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 w-full">
          <Button
            onClick={handleSubmit}
            loading={isSubmitting}
            loadingText="Submitting Form"
            className="flex-1"
          >
            Submit
          </Button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default GoodlineFatigueSummaryPage
