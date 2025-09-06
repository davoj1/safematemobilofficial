import React from 'react'
import { HeaderWithBack } from '../../../components/layout'
import { CompanyCard } from '../../../components/ui'
import take5Icon from '../../../assets/history/take5icon.svg'
import reportHazardIcon from '../../../assets/history/reporthazardicon.svg'
import fatigueManagementIcon from '../../../assets/fatiguemanagementicon.svg'

interface SafemateGeneralForm {
  id: string
  name: string
  description: string
  icon: string
  status: 'active' | 'pending' | 'inactive'
  disabled?: boolean
  disabledReason?: string
}

interface SafemateGeneralFormsSelectionPageProps {
  onNavigate?: (view: "forms-safemate-take5" | "forms-report-hazard-step1" | "forms-safemate-fatigue-management-step1" | "home") => void
  onBack?: () => void
}

const SafemateGeneralFormsSelectionPage: React.FC<SafemateGeneralFormsSelectionPageProps> = ({
  onNavigate,
  onBack,
}) => {
  const safemateGeneralForms: SafemateGeneralForm[] = [
    {
      id: 'take5',
      name: 'Take 5',
      description: 'Quick 5-step safety check before starting work',
      icon: take5Icon,
      status: 'active',
    },
    {
      id: 'fatigue-management',
      name: 'Fatigue Management',
      description: 'Assess your fatigue levels and wellbeing before work',
      icon: fatigueManagementIcon,
      status: 'active',
    },
    {
      id: 'report-hazard',
      name: 'Report a Hazard',
      description: 'Report safety hazards or issues on site',
      icon: reportHazardIcon,
      status: 'active',
      disabled: true,
      disabledReason: 'This form can only be submitted to a Registered Company and can only be used on the company form templates.',
    },
  ]

  const handleFormSelect = (formId: string) => {
    console.log('Selected Safemate general form:', formId)
    
    // Check if form is disabled
    const form = safemateGeneralForms.find(f => f.id === formId)
    if (form?.disabled) {
      return // Don't navigate if form is disabled
    }
    
    switch (formId) {
      case 'take5':
        onNavigate?.('forms-safemate-take5')
        break
      case 'fatigue-management':
        onNavigate?.('forms-safemate-fatigue-management-step1')
        break
      case 'report-hazard':
        onNavigate?.('forms-report-hazard-step1')
        break
      default:
        console.log('Unknown form selected:', formId)
    }
  }

  const handleBack = () => {
    onBack?.()
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header */}
      <HeaderWithBack 
        title="Choose your form"
        onBack={handleBack}
      />

      {/* Main Content */}
      <div className="flex-1 px-5 py-5 space-y-5 overflow-y-auto overscroll-contain touch-pan-y">
        {/* Title and Description */}
        <div className="flex flex-col gap-1.5 items-center text-center">
          <h1 className="font-bold text-[#24262d] text-2xl leading-[32px]">
            Choose your form
          </h1>
          <p className="font-normal text-[#667085] text-sm leading-5 max-w-[350px]">
            Select a Safemate general form to get started.
          </p>
        </div>


        {/* Forms List */}
        <div className="flex flex-col gap-1.5">
          {safemateGeneralForms.map((form) => (
            <div key={form.id}>
              <button
                onClick={() => handleFormSelect(form.id)}
                disabled={form.disabled}
                className={`w-full rounded-[20px] border p-4 flex items-center gap-3 transition-all duration-200 ${
                  form.disabled 
                    ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60' 
                    : 'bg-white border-[#eaecf0] hover:border-[#266273] hover:shadow-sm'
                }`}
              >
                {/* Form Icon */}
                <div className="w-11 h-11 flex items-center justify-center flex-shrink-0">
                  <img
                    src={form.icon}
                    alt={form.name}
                    className={`w-full h-full object-contain ${form.disabled ? 'grayscale' : ''}`}
                  />
                </div>

                {/* Form Details */}
                <div className="flex-1 text-left">
                  <h3 className={`font-semibold text-base leading-6 mb-1 ${
                    form.disabled ? 'text-gray-500' : 'text-[#101828]'
                  }`}>
                    {form.name}
                  </h3>
                  <p className={`text-sm leading-5 ${
                    form.disabled ? 'text-gray-400' : 'text-[#667085]'
                  }`}>
                    {form.description}
                  </p>
                  {form.disabled && form.disabledReason && (
                    <p className="text-xs text-gray-500 mt-2 italic">
                      {form.disabledReason}
                    </p>
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SafemateGeneralFormsSelectionPage
