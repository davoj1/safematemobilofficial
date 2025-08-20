import React, { useState } from 'react'
import HeaderWithBack from '../../components/layout/HeaderWithBack'
import Button from '../../components/ui/Button'
import warrikalLogo from '../../assets/companylogo/warrikallogo.svg'
import bhpLogo from '../../assets/companylogo/bhplogo.svg'
import fmgLogo from '../../assets/companylogo/fmglogo.svg'
import greenFace from '../../assets/fatiguemanagement/greenface.svg'
import maleIcon from '../../assets/fatiguemanagement/maleicon.svg'
import alertFaceIcon from '../../assets/fatiguemanagement/face1.svg'

// Risk Level SVG Component
const RiskLevelSVG: React.FC<{ riskScore: number }> = ({ riskScore }) => {
  // Determine which segments should be active based on risk score
  // Progressive filling from left to right based on actual score
  const getSegmentColor = (segmentIndex: number) => {
    // Define how many segments should be filled based on score
    let segmentsToFill = 0
    
    if (riskScore === 0) {
      segmentsToFill = 0  // No segments filled for perfect score
    } else if (riskScore <= 2) {
      segmentsToFill = 1  // LOW risk: 1 green segment
    } else if (riskScore <= 4) {
      segmentsToFill = 2  // MODERATE risk: 2 segments (green + yellow)
    } else if (riskScore <= 6) {
      segmentsToFill = 3  // HIGH risk: 3 segments
    } else if (riskScore <= 8) {
      segmentsToFill = 4  // VERY HIGH risk: 4 segments
    } else {
      segmentsToFill = 5  // CRITICAL risk: All 5 segments
    }
    
    if (segmentIndex < segmentsToFill) {
      // Determine color based on risk level
      if (riskScore <= 2) {
        // LOW risk: All filled segments green
        return '#47CD89'
      } else if (riskScore <= 4) {
        // MODERATE risk: Mixed green and yellow
        return segmentIndex === 0 ? '#47CD89' : '#FFC107'
      } else {
        // HIGH risk: Green, yellow, then red segments
        if (segmentIndex === 0) return '#47CD89'
        if (segmentIndex <= 1) return '#FFC107'
        return '#DC2626'
      }
    } else {
      // Unfilled segments remain gray
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

interface FatigueManagementReviewPageProps {
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
    sleep24h?: string
    sleep48h?: string
    alertness?: string
    gender?: string
    alcoholIntake?: string
    medication?: string
    stress?: string
    wellbeingRating?: string
    firstName?: string
    lastName?: string
    signature?: string
  }
}

const FatigueManagementReviewPage: React.FC<FatigueManagementReviewPageProps> = ({
  onBack,
  onSubmit,
  mineCompany = 'bhp',
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

  const getRiskScore = () => {
    // Risk calculation based on Warrikal checklist scoring system
    let score = 0
    
    // Sleep 24h: 7+ hours (0 pts), 5-7 hours (1 pt), <5 hours (2 pts)
    if (formData.sleep24h === 'Less than 5') score += 2
    else if (formData.sleep24h === '5 to 7') score += 1
    // 7+ hours = 0 points (no addition)
    
    // Sleep 48h: 14+ hours (0 pts), 12-14 hours (1 pt), <12 hours (2 pts)
    if (formData.sleep48h === 'Less than 12') score += 2
    else if (formData.sleep48h === '12 to 14') score += 1
    // 14+ hours = 0 points (no addition)
    
    // Alertness: Ratings 1-2 (0 pts), Rating 3 (1 pt), Ratings 4-5 (2 pts)
    const alertnessMap: Record<string, number> = {
      'Feeling active, alert or wide awake.': 0,           // Rating 1
      'Functioning at a good level, but not at peak, able to concentrate.': 0, // Rating 2  
      'Not fully alert.': 1,                              // Rating 3
      'A bit groggy, hard to concentrate.': 2,            // Rating 4
      'Sleepy, groggy, hard to concentrate.': 2           // Rating 5
    }
    if (formData.alertness && alertnessMap[formData.alertness] !== undefined) {
      score += alertnessMap[formData.alertness]
    }
    
    // Alcohol - Male: 0-4 drinks (0 pts), 5-6 drinks (1 pt), 6+ drinks (2 pts)
    // Alcohol - Female: 0-2 drinks (0 pts), 3-4 drinks (1 pt), 5+ drinks (2 pts)
    if (formData.gender === 'male') {
      if (formData.alcoholIntake === 'More than 6') score += 2
      else if (formData.alcoholIntake === '1-5') score += 1
      // 0-1 = 0 points (no addition)
    } else if (formData.gender === 'female') {
      if (formData.alcoholIntake === 'More than 5') score += 2
      else if (formData.alcoholIntake === '3-4') score += 1
      // 0-2 = 0 points (no addition)
    }
    
    // Medication: No (0 pts), Yes (2 pts)
    if (formData.medication === 'Yes') score += 2
    
    // Stress: No (0 pts), Yes (2 pts)
    if (formData.stress === 'Yes') score += 2
    
    // Well-being: 7+ (0 pts), 5-6 (1 pt), 0-4 (2 pts)
    if (formData.wellbeingRating === '0-2') score += 2
    else if (formData.wellbeingRating === '2-4') score += 2
    else if (formData.wellbeingRating === '4-6') score += 1
    else if (formData.wellbeingRating === '6-8') score += 1
    // 8-10 = 0 points (no addition)
    
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
        title="Where are you working?"
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
            <span>#FG0001</span>
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
                      {selectedSite?.name || 'BMA Australia'}
                    </div>
                    <div className="text-[#667085] text-sm">
                      {selectedSite?.location || 'Bowen Basin, QLD'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sleep Duration Log */}
          <div className="bg-white rounded-xl border border-[#d0d5dd] p-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[#266273] text-base font-bold">Sleep Duration Log</h3>
              <button className="text-[#558998] text-sm font-semibold px-1 py-0.5">Edit</button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">How many hours of sleep have you had in the last 24 hours?</div>
                <div className="text-[#667085] text-sm">{formData.sleep24h || '7 or more'}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">How many hours of sleep have you had in the last 48 hours?</div>
                <div className="text-[#667085] text-sm">{formData.sleep48h || '14 or more'}</div>
              </div>
            </div>
          </div>

          {/* Alertness Status */}
          <div className="bg-white rounded-xl border border-[#d0d5dd] p-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[#266273] text-base font-bold">Alertness Status</h3>
              <button className="text-[#558998] text-sm font-semibold px-1 py-0.5">Edit</button>
            </div>
            
            <div className="space-y-1">
              <div className="text-[#344054] text-sm font-medium">How do you feel? Are you alert?</div>
              <div className="flex items-center gap-1.5">
                <img src={alertFaceIcon} alt="Alert" className="w-6 h-6" />
                <span className="text-[#667085] text-sm">Feeling active, alert or wide awake.</span>
              </div>
            </div>
          </div>

          {/* Gender & Alcohol Intake */}
          <div className="bg-white rounded-xl border border-[#d0d5dd] p-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[#266273] text-base font-bold">Gender & Alcohol Intake</h3>
              <button className="text-[#558998] text-sm font-semibold px-1 py-0.5">Edit</button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">Gender</div>
                <div className="flex items-center gap-1.5">
                  <img src={maleIcon} alt="Male" className="w-5 h-5" />
                  <span className="text-[#667085] text-sm">{formData.gender || 'Male'}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">How many alcoholic drinks did you have before your sleep?</div>
                <div className="text-[#667085] text-sm">{formData.alcoholIntake || 'More than 6'}</div>
              </div>
            </div>
          </div>

          {/* Health & Wellness Risk Factors */}
          <div className="bg-white rounded-xl border border-[#d0d5dd] p-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[#266273] text-base font-bold">Health & Wellness Risk Factors</h3>
              <button className="text-[#558998] text-sm font-semibold px-1 py-0.5">Edit</button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">Are you on any medication or other substances that could cause drowsiness or cause you to be unfit for work?</div>
                <div className="text-[#667085] text-sm">{formData.medication || 'Yes'}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">Do you have any stress or other personal problems that are significantly affecting your concentration or sleep?</div>
                <div className="text-[#667085] text-sm">{formData.stress || 'No'}</div>
              </div>
            </div>
          </div>

          {/* Overall Wellness Rating */}
          <div className="bg-white rounded-xl border border-[#d0d5dd] p-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[#266273] text-base font-bold">Overall Wellness Rating</h3>
              <button className="text-[#558998] text-sm font-semibold px-1 py-0.5">Edit</button>
            </div>
            
            <div className="space-y-1">
              <div className="text-[#344054] text-sm font-medium">On a scale of 1 to 10 (10 being the most positive) how would you rate your overall well-being levels today?</div>
              <div className="flex items-center gap-1.5">
                <img src={greenFace} alt="Rating" className="w-10 h-10" />
                <span className="text-[#101828] text-base font-normal">{formData.wellbeingRating || '8-10'}</span>
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
                      src={warrikalLogo} 
                      alt="Warrikal"
                      className="w-full h-6 object-contain"
                    />
                  </div>
                  <span className="text-[#101828] text-sm font-medium">Warrikal</span>
                </div>
              </div>
              
              {/* First name */}
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">First name</div>
                <div className="text-[#667085] text-sm">{formData.firstName || 'David'}</div>
              </div>
              
              {/* Last name */}
              <div className="space-y-1">
                <div className="text-[#344054] text-sm font-medium">Last name</div>
                <div className="text-[#667085] text-sm">{formData.lastName || 'Strike'}</div>
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

export default FatigueManagementReviewPage