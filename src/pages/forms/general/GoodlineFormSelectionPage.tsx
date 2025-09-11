import React, { useState } from 'react'
import { HeaderWithClose } from '../../../components/layout'
import { FormCard, FormTemplateSwitchModal } from '../../../components/ui'
import paceCardsIcon from '../../../assets/history/take5icon.svg'
import fatigueManagementIcon from '../../../assets/fatiguemanagementicon.svg'
import reportHazardIcon from '../../../assets/history/reporthazardicon.svg'
import goodlineIcon from '../../../assets/companylogo/goodlinelogo.svg'
import safemateShieldLogo from '../../../assets/safemateshieldlogo.svg'

interface GoodlineForm {
  id: string
  name: string
  description?: string
  icon: string
  status?: 'active' | 'coming-soon' | 'unavailable'
  disabled?: boolean
  note?: string
}

interface GoodlineFormSelectionPageProps {
  onNavigate?: (view: "forms-goodline-pace-cards" | "forms-goodline-fatigue" | "forms-report-hazard-step1" | "forms-safemate-general-selection" | "home", siteData?: {id: string, name: string, location: string, image: string}) => void
  onClose?: () => void
}

const GoodlineFormSelectionPage: React.FC<GoodlineFormSelectionPageProps> = ({
  onNavigate,
  onClose,
}) => {
  const [showTemplateSwitch, setShowTemplateSwitch] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState<'goodline' | 'safemate'>('goodline')

  const goodlineForms: GoodlineForm[] = [
    {
      id: 'pace-cards',
      name: 'Pace Cards',
      icon: paceCardsIcon,
      status: 'active',
    },
    {
      id: 'fatigue-management',
      name: 'Fatigue Management',
      icon: fatigueManagementIcon,
      status: 'active',
    },
    {
      id: 'report-hazard',
      name: 'Report a Hazard',
      icon: reportHazardIcon,
      status: 'unavailable',
      note: 'This form can only be submitted to registered companies.',
    },
  ]

  const handleFormSelect = (formId: string) => {
    console.log('Selected Goodline form:', formId)
    
    // Check if form is disabled
    const form = goodlineForms.find(f => f.id === formId)
    if (form?.disabled || form?.status === 'coming-soon' || form?.status === 'unavailable') {
      return // Don't navigate if form is disabled
    }
    
    switch (formId) {
      case 'pace-cards':
        onNavigate?.('forms-goodline-pace-cards')
        break
      case 'fatigue-management':
        onNavigate?.('forms-goodline-fatigue')
        break
      case 'report-hazard':
        onNavigate?.('forms-report-hazard-step1')
        break
      default:
        console.log('Unknown form selected:', formId)
    }
  }

  const handleClose = () => {
    onClose?.()
  }

  const handleTemplateSwitch = () => {
    setShowTemplateSwitch(true)
  }

  const handleTemplateSelect = (template: 'goodline' | 'safemate') => {
    setCurrentTemplate(template)
    // If switching to SafeMate, navigate to SafeMate form selection
    if (template === 'safemate') {
      onNavigate?.('forms-safemate-general-selection')
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithClose
        title="Choose a Goodline Form"
        onClose={handleClose}
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 px-4 py-3 space-y-6 overflow-y-auto">
        {/* Form Template Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#475467] text-base leading-6">
              Form Template
            </h2>
            <button
              onClick={handleTemplateSwitch}
              className="flex items-center gap-1 text-[#266273] font-medium text-sm"
            >
              <span>Switch</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
          
          {/* Current Template Display */}
          <div className="bg-[#f0ff70] border border-[#266273] rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src={currentTemplate === 'goodline' ? goodlineIcon : safemateShieldLogo}
                  alt={currentTemplate === 'goodline' ? 'Goodline' : 'SafeMate'}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-semibold text-[#101828] text-base">
                  {currentTemplate === 'goodline' ? 'Goodline' : 'SafeMate'}
                </div>
                <div className="text-sm text-[#667085]">
                  Template
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Removed site entry field as per requirements */}

        {/* Forms Section */}
        <div className="space-y-2">
          <h2 className="font-semibold text-[#475467] text-base leading-6">
            Choose your Forms
          </h2>
          
          <div className="space-y-2">
            {goodlineForms.map((form) => (
              <FormCard
                key={form.id}
                name={form.name}
                icon={form.icon}
                onClick={() => form.status === 'active' && handleFormSelect(form.id)}
                status={form.status}
                disabled={form.status === 'coming-soon' || form.status === 'unavailable'}
                note={form.note}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Template Switch Modal */}
      <FormTemplateSwitchModal
        isOpen={showTemplateSwitch}
        onClose={() => setShowTemplateSwitch(false)}
        currentTemplate={currentTemplate}
        onTemplateSelect={handleTemplateSelect}
      />
    </div>
  )
}

export default GoodlineFormSelectionPage
