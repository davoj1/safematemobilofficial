import React, { useState } from 'react'
import { HeaderWithBack } from '../../components/layout'
import { Button } from '../../components/ui'
import fmgLogo from '../../assets/companylogo/fmglogo.svg'
import bmaAustraliaImage from '../../assets/minesites/bhp/BMAaustralia.png'
import warrikalLogo from '../../assets/companylogo/warrikallogo.svg'
import photo1 from '../../assets/takecontrol/photo1.png'
import photo2 from '../../assets/takecontrol/photo2.png'

interface TakeControlReviewPageProps {
  onBack?: () => void
  onSubmit?: () => void
  formData?: {
    mineCompany: string
    site: string
    task: string
    control: string
    hazards: Array<{ hazard: string; control: string }>
    photos?: Array<string>
    company: string
    firstName: string
    lastName: string
    signature: string
  }
}

// Mock safety checklist data
const safetyChecklist = [
  { question: "Are barricades or signage in place where required?", answer: "YES" },
  { question: "Is there clear access to emergency exits and first aid equipment?", answer: "NO" },
  { question: "I have the correct tools and equipment", answer: "N/A" },
  { question: "Have you spoken to your team/supervisor if unsure about any part of the task?", answer: "YES" },
  { question: "Have you reviewed and understood the JSA (Job Safety Analysis) or SWMS (Safe Work Method Statement) for this task?", answer: "NO" },
  { question: "I commit to pausing if the task changes", answer: "N/A" },
  { question: "Have you completed a pre-start inspection of your equipment?", answer: "YES" },
  { question: "Is your PPE (Personal Protective Equipment) clean, intact, and worn correctly?", answer: "NO" },
  { question: "Have all safety guards and controls on your machinery been checked and are functional?", answer: "N/A" },
  { question: "Is your work area free of slip, trip, or fall hazards?", answer: "YES" },
  { question: "Is your work area free of slip, trip, or fall hazards?", answer: "NO" },
  { question: "Have all communication devices (radios, signals) been tested and are working?", answer: "N/A" }
]

const TakeControlReviewPage: React.FC<TakeControlReviewPageProps> = ({
  onBack,
  onSubmit,
  formData
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate form submission with a delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    onSubmit?.()
  }
  const getAnswerStyling = (answer: string) => {
    switch (answer) {
      case "YES":
        return "bg-[#ecfdf3] border-[#17b26a] text-[#344054]"
      case "NO":
        return "bg-[#fff9f5] border-[#ff4405] text-[#344054]"
      case "N/A":
        return "bg-[#f0fdf9] border-[#2a6c7e] text-[#344054]"
      default:
        return "bg-gray-100 border-gray-300 text-gray-600"
    }
  }

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
          {/* Form Detail Header */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h2 className="text-[#344054] text-sm font-medium leading-5">Form detail</h2>
              <span className="text-[#344054] text-sm font-medium leading-5">#FG0001</span>
            </div>

            {/* Mine Company Info */}
            <div className="bg-white rounded-xl border border-[#d0d5dd] p-3">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-[#266273] text-base font-bold leading-6">Mine Company Infor</h3>
                </div>
                
                <div className="flex flex-col gap-2">
                  {/* Mine Company */}
                  <div className="flex flex-col gap-1">
                    <div className="text-[#344054] text-sm font-medium leading-5">Mine Company</div>
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-md flex items-center justify-center">
                        <img src={fmgLogo} alt="FMG" className="w-full h-6" />
                      </div>
                      <span className="text-[#101828] text-sm font-medium leading-5">FMG</span>
                    </div>
                  </div>

                  {/* Site */}
                  <div className="flex flex-col gap-1">
                    <div className="text-[#344054] text-sm font-medium leading-5">Site</div>
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 overflow-hidden rounded-[4.6px]">
                        <img src={bmaAustraliaImage} alt="BMA Australia" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#101828] text-base font-semibold leading-6">BMA Australia</span>
                        <span className="text-[#667085] text-sm font-normal leading-5">Bowen Basin, QLD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Work Summary & Safety Plan */}
            <div className="bg-white rounded-xl border border-[#d0d5dd] p-3">
              <div className="flex flex-col gap-3">
                <h3 className="text-[#266273] text-base font-bold leading-6">Work Summary & Safety Plan</h3>
                
                <div className="flex flex-col gap-4">
                  {/* Your task today */}
                  <div className="flex flex-col gap-1">
                    <div className="text-[#344054] text-sm font-medium leading-5">Your task today</div>
                    <div className="text-[#667085] text-sm font-normal leading-5">
                      {formData?.task || "Lockout power, wear PPE, and use barricades around the work zone."}
                    </div>
                  </div>

                  {/* How I Will Take Control */}
                  <div className="flex flex-col gap-1">
                    <div className="text-[#344054] text-sm font-medium leading-5">How I Will Take Control</div>
                    <div className="text-[#667085] text-sm font-normal leading-5">
                      {formData?.control || "Check ground conditions, install mesh, and follow blasting procedures."}
                    </div>
                  </div>

                  {/* Photos */}
                  <div className="flex flex-col gap-1">
                    <div className="text-[#344054] text-sm font-medium leading-5">Photos</div>
                    <div className="flex gap-2">
                      {(formData?.photos && formData.photos.length > 0 ? formData.photos : [photo1, photo2]).slice(0, 2).map((photo, index) => (
                        <div key={index} className="relative w-20 h-20 rounded-xl overflow-hidden">
                          <img src={photo} alt={`Work site photo ${index + 1}`} className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 right-0 bg-black bg-opacity-60 rounded-tl-lg rounded-br-xl p-1">
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="text-white">
                              <path d="M8 12L12 8L16 12M12 8V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M20 16V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H8C7.46957 22 6.96086 21.7893 6.58579 21.4142C6.21071 21.0391 6 20.5304 6 20V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mine Safety Checklist */}
            <div className="bg-white rounded-xl border border-[#d0d5dd] p-3">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-[#266273] text-base font-bold leading-6">Mine Safey Checklist</h3>
                  <div className="text-[#667085] text-sm font-medium leading-5">24/24 (100%)</div>
                </div>
                
                <div className="flex flex-col gap-0 pl-1.5">
                  {safetyChecklist.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-[#eaecf0] last:border-b-0">
                      <div className="flex-1 text-[#101828] text-sm font-medium leading-5 pr-1.5">
                        1.{index + 1} {item.question}
                      </div>
                      <div className={`px-3 py-2 rounded-lg border-[1.2px] w-20 flex items-center justify-center ${getAnswerStyling(item.answer)}`}>
                        <span className="text-xs font-semibold leading-[18px]">{item.answer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hazard Identification */}
            <div className="bg-white rounded-xl border border-[#d0d5dd] p-3">
              <div className="flex flex-col gap-2.5">
                <h3 className="text-[#266273] text-base font-bold leading-6">Hazard Identification</h3>
                
                <div className="flex flex-col gap-2">
                  {/* Hazard */}
                  <div className="flex flex-col gap-1">
                    <div className="text-[#344054] text-sm font-medium leading-5">Hazard</div>
                    <div className="text-[#667085] text-sm font-normal leading-5">
                      {formData?.hazards?.[0]?.hazard || "Poor ventilation in the underground tunnel"}
                    </div>
                  </div>

                  {/* Control */}
                  <div className="flex flex-col gap-1">
                    <div className="text-[#344054] text-sm font-medium leading-5">Control</div>
                    <div className="text-[#667085] text-sm font-normal leading-5">
                      {formData?.hazards?.[0]?.control || "Turn on exhaust fans and check airflow before starting the task"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="bg-white rounded-xl border border-[#d0d5dd] p-3">
              <div className="flex flex-col gap-2.5">
                <h3 className="text-[#266273] text-base font-bold leading-6">Company Information</h3>
                
                <div className="flex flex-col gap-2">
                  {/* Company name */}
                  <div className="flex flex-col gap-1">
                    <div className="text-[#344054] text-sm font-medium leading-5">Company name</div>
                    <div className="flex items-center gap-1">
                      <div className="w-9 h-9 rounded-md flex items-center justify-center">
                        <img src={warrikalLogo} alt="Warrikal" className="w-full h-6" />
                      </div>
                      <span className="text-[#101828] text-sm font-medium leading-5">
                        {formData?.company || "Warrikal"}
                      </span>
                    </div>
                  </div>

                  {/* First name */}
                  <div className="flex flex-col gap-1">
                    <div className="text-[#344054] text-sm font-medium leading-5">First name</div>
                    <div className="text-[#667085] text-sm font-normal leading-5">
                      {formData?.firstName || "David"}
                    </div>
                  </div>

                  {/* Last name */}
                  <div className="flex flex-col gap-1">
                    <div className="text-[#344054] text-sm font-medium leading-5">Last name</div>
                    <div className="text-[#667085] text-sm font-normal leading-5">
                      {formData?.lastName || "Strike"}
                    </div>
                  </div>

                  {/* Worker's signature */}
                  <div className="flex flex-col gap-1">
                    <div className="text-[#344054] text-sm font-medium leading-5">Worker's signature</div>
                    <div className="w-[150px] h-[62px] bg-gray-100 rounded border border-dashed border-gray-300 flex items-center justify-center">
                      {formData?.signature ? (
                        <img src={formData.signature} alt="Signature" className="max-w-full max-h-full object-contain" />
                      ) : (
                        <div className="w-[150px] h-[62px] bg-bottom-left bg-no-repeat bg-contain" 
                             style={{ backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjYyIiB2aWV3Qm94PSIwIDAgMTUwIDYyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMjAgMzBRNDAgMjAgNjAgMzBUMTAwIDI1UTEyMCAzNSAxMzAgMjAiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo=')` }}>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="px-4 py-3 flex-shrink-0">
        <Button
          onClick={handleSubmit}
          className="w-full"
          variant="primary"
          loading={isSubmitting}
          loadingText="Submitting Form"
        >
          Submit Form
        </Button>
      </div>
    </div>
  )
}

export default TakeControlReviewPage