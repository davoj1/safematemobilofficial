import React, { useState } from 'react'
import { HeaderWithClose } from '../../../components/layout'
import { FormCard, Input } from '../../../components/ui'
import take5Icon from '../../../assets/history/take5icon.svg'
import reportHazardIcon from '../../../assets/history/reporthazardicon.svg'
import fatigueManagementIcon from '../../../assets/fatiguemanagementicon.svg'
import vehiclePrestartIcon from '../../../assets/vehicleprestarticon.svg'

interface SafemateGeneralForm {
  id: string
  name: string
  description?: string
  icon: string
  status?: 'active' | 'coming-soon' | 'unavailable'
  disabled?: boolean
  note?: string
}

interface SafemateGeneralFormsSelectionPageProps {
  onNavigate?: (view: "forms-safemate-take5" | "forms-report-hazard-step1" | "forms-safemate-fatigue-management-step1" | "forms-safemate-vehicle-prestart-step1" | "home") => void
  onClose?: () => void
}

const SafemateGeneralFormsSelectionPage: React.FC<SafemateGeneralFormsSelectionPageProps> = ({
  onNavigate,
  onClose,
}) => {
  const [workSiteName, setWorkSiteName] = useState('')
  const safemateGeneralForms: SafemateGeneralForm[] = [
    {
      id: 'take5',
      name: 'Take 5',
      icon: take5Icon,
      status: 'active',
    },
    {
      id: 'fatigue-management',
      name: 'Fatigue Management',
      icon: fatigueManagementIcon,
      status: 'active',
    },
    {
      id: 'vehicle-prestart',
      name: 'Vehicle Pre-Start',
      icon: vehiclePrestartIcon,
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
    console.log('Selected Safemate general form:', formId)
    
    // Check if form is disabled
    const form = safemateGeneralForms.find(f => f.id === formId)
    if (form?.disabled || form?.status === 'coming-soon' || form?.status === 'unavailable') {
      return // Don't navigate if form is disabled
    }
    
    switch (formId) {
      case 'take5':
        onNavigate?.('forms-safemate-take5')
        break
      case 'fatigue-management':
        onNavigate?.('forms-safemate-fatigue-management-step1')
        break
      case 'vehicle-prestart':
        onNavigate?.('forms-safemate-vehicle-prestart-step1')
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

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithClose
        title="Choose a Safemate Form"
        onClose={handleClose}
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 px-4 py-3 space-y-6 overflow-y-auto">
        {/* Work Site Section */}
        <div className="space-y-1.5">
          <h2 className="font-semibold text-[#475467] text-base leading-6">
            Your Site (optional)
          </h2>
          
          <div className="py-2">
            <Input
              placeholder="Enter your work site name"
              value={workSiteName}
              onChange={(e) => setWorkSiteName(e.target.value)}
              className="bg-white border-[#eaecf0] rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Forms Section */}
        <div className="space-y-2">
          <h2 className="font-semibold text-[#475467] text-base leading-6">
            Choose your Forms
          </h2>
          
          <div className="space-y-2">
            {safemateGeneralForms.map((form) => (
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
    </div>
  )
}

export default SafemateGeneralFormsSelectionPage
