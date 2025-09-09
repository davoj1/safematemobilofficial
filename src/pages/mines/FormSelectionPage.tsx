import React, { useState } from 'react'
import { HeaderWithClose } from '../../components/layout'
import { FormCard, SelectedSiteDisplay, RequestNewFormSlideUp } from '../../components/ui'
import takeFiveIcon from '../../assets/takefiveicon.svg'
import vehiclePreStartIcon from '../../assets/vehicleprestarticon.svg'
import reportHazardsIcon from '../../assets/reporthazardsicon.svg'
import fatigueManagementIcon from '../../assets/fatiguemanagementicon.svg'
import workOrderNumberIcon from '../../assets/jobs/workordernumbericon.svg'
import BMAaustralia from '../../assets/minesites/bhp/BMAaustralia.png'
import fmgPortHedland from '../../assets/minesites/fmg/fmgporthedland.png'

interface MineForm {
  id: string
  name: string
  icon: string
  status?: 'active' | 'coming-soon'
}

interface FormSelectionPageProps {
  company: 'bhp' | 'fmg'
  contractor?: 'warrikal' | 'linkforce' | 'monadelphous' | 'goodline'
  selectedSite?: {
    id: string
    name: string
    location: string
    image: string
  }
  onClose?: () => void
  onEditSite?: () => void
  onFormSelect?: (formId: string) => void
}

const FormSelectionPage: React.FC<FormSelectionPageProps> = ({
  company,
  contractor,
  selectedSite,
  onClose,
  onEditSite,
  onFormSelect,
}) => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null)
  const [showRequestNewForm, setShowRequestNewForm] = useState(false)

  // Define default sites for each company
  const defaultSites = {
    bhp: {
      id: 'bma-australia',
      name: 'BMA Australia',
      location: 'Bowen Basin, QLD',
      image: BMAaustralia,
    },
    fmg: {
      id: 'port-hedland',
      name: 'Port Hedland',
      location: 'Pilbara, WA',
      image: fmgPortHedland,
    },
  }

  // Use provided selectedSite or default for the company
  const currentSite = selectedSite || defaultSites[company]

  // Define contractor-specific forms based on mine company
  const contractorForms: { [key: string]: MineForm[] } = {
    warrikal: [
      // Take Control is only available for Warrikal on FMG
      ...(company === 'fmg' ? [{
        id: 'take-control',
        name: 'Take Control',
        icon: takeFiveIcon,
        status: 'active',
      }] : []),
      // Fatigue Management is available for Warrikal on all mine sites
      {
        id: 'fatigue-management',
        name: 'Fatigue Management',
        icon: fatigueManagementIcon,
        status: 'active',
      },
      // Report Hazard is available for all contractors on all mine sites
      {
        id: 'report-hazard-issue',
        name: 'Report Hazard / Issue',
        icon: reportHazardsIcon,
        status: 'active',
      },
    ],
    linkforce: [
      {
        id: 'report-hazard-issue',
        name: 'Report Hazard / Issue',
        icon: reportHazardsIcon,
        status: 'active',
      },
    ],
    monadelphous: [
      {
        id: 'report-hazard-issue',
        name: 'Report Hazard / Issue',
        icon: reportHazardsIcon,
        status: 'active',
      },
    ],
    goodline: [
      {
        id: 'pace-cards',
        name: 'Pace Cards',
        icon: takeFiveIcon,
        status: 'active',
      },
      {
        id: 'fatigue-management',
        name: 'Fatigue Management',
        icon: fatigueManagementIcon,
        status: 'active',
      },
      {
        id: 'report-hazard-issue',
        name: 'Report Hazard / Issue',
        icon: reportHazardsIcon,
        status: 'active',
      },
    ],
  }

  // Define forms for each company with company-specific naming (for direct mine company access)
  const mineForms: { [key: string]: MineForm[] } = {
    bhp: [
      {
        id: 'take-5',
        name: 'Take 5',
        icon: takeFiveIcon,
        status: 'active',
      },
      {
        id: 'vehicle-pre-start',
        name: 'Vehicle Pre Start',
        icon: vehiclePreStartIcon,
        status: 'coming-soon',
      },
      {
        id: 'report-hazard-issue',
        name: 'Report Hazard / Issue',
        icon: reportHazardsIcon,
        status: 'coming-soon',
      },
      {
        id: 'fatigue-management',
        name: 'Fatigue Management',
        icon: fatigueManagementIcon,
        status: 'active',
      },
      {
        id: 'jha-builder',
        name: 'JHA Builder',
        icon: takeFiveIcon,
        status: 'coming-soon',
      },
      {
        id: 'supervisor-checklist',
        name: 'Supervisor Checklist',
        icon: workOrderNumberIcon,
        status: 'coming-soon',
      },
    ],
    fmg: [
      {
        id: 'take-control',
        name: 'Take Control',
        icon: takeFiveIcon,
        status: 'active',
      },
      {
        id: 'vehicle-pre-start',
        name: 'Vehicle Pre Start',
        icon: vehiclePreStartIcon,
        status: 'coming-soon',
      },
      {
        id: 'report-hazard-issue',
        name: 'Report Hazard / Issue',
        icon: reportHazardsIcon,
        status: 'coming-soon',
      },
      {
        id: 'fatigue-management',
        name: 'Fatigue Management',
        icon: fatigueManagementIcon,
        status: 'active',
      },
      {
        id: 'jha-builder',
        name: 'JHA Builder',
        icon: takeFiveIcon,
        status: 'coming-soon',
      },
      {
        id: 'supervisor-checklist',
        name: 'Supervisor Checklist',
        icon: workOrderNumberIcon,
        status: 'coming-soon',
      },
    ],
  }

  // Use contractor forms if contractor is selected, otherwise use mine company forms
  const forms = contractor ? contractorForms[contractor] || [] : mineForms[company] || []
  // Order forms: active first, then coming-soon
  const orderedForms = [...forms].sort((a, b) => {
    const aComing = a.status === 'coming-soon'
    const bComing = b.status === 'coming-soon'
    if (aComing && !bComing) return 1
    if (!aComing && bComing) return -1
    return 0
  })

  const handleFormSelect = (formId: string) => {
    setSelectedForm(formId)
    console.log(`Selected ${company.toUpperCase()} form:`, formId)
    onFormSelect?.(formId)
  }

  const handleClose = () => {
    console.log('Close form selection')
    onClose?.()
  }

  const handleEditSite = () => {
    console.log('Edit site clicked')
    onEditSite?.()
  }

  const handleRequestNewForm = (payload: { formName: string, description: string, photos: File[] }) => {
    console.log('New form requested:', payload)
    // In a real app, this would submit the request to the backend
    alert(`Form request submitted: "${payload.formName}"\nOur team will review and create this form for you.`)
  }

  const getCompanyDisplayName = () => {
    if (contractor) {
      const contractorNames = {
        warrikal: 'Warrikal',
        linkforce: 'Linkforce',
        monadelphous: 'Monadelphous',
        goodline: 'Goodline'
      }
      return contractorNames[contractor]
    }
    return company === 'bhp' ? 'BHP' : 'Fortescue Metals Group'
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithClose
        title={`Choose a ${getCompanyDisplayName()} Form`}
        onClose={handleClose}
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 px-4 py-3 space-y-6 overflow-y-auto">
        {/* Selected Site Display */}
        <SelectedSiteDisplay
          name={currentSite.name}
          location={currentSite.location}
          image={currentSite.image}
          onEdit={handleEditSite}
        />

        {/* Forms Section */}
        <div className="space-y-2">
          <h2 className="font-semibold text-[#475467] text-base leading-6">
            Choose your Forms
          </h2>
          
          <div className="space-y-2">
            {orderedForms.map((form) => (
              <FormCard
                key={form.id}
                name={form.name}
                icon={form.icon}
                onClick={() => form.status !== 'coming-soon' && handleFormSelect(form.id)}
                status={form.status}
                disabled={form.status === 'coming-soon'}
                className={selectedForm === form.id ? 'bg-gray-50' : ''}
              />
            ))}
          </div>
        </div>

        {/* Missing a form section */}
        <div className="space-y-3">
          <div className="border-t border-[#eaecf0] pt-4">
            <div className="bg-white rounded-xl border border-[#eaecf0] p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#266273] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#101828] text-base leading-6">
                    Missing a form?
                  </h3>
                  <p className="text-sm text-[#667085] leading-5 mt-1">
                    Request a new form and our team will create it for you
                  </p>
                </div>
                <button
                  onClick={() => setShowRequestNewForm(true)}
                  className="px-4 py-2 bg-[#266273] text-white rounded-xl font-medium text-sm hover:bg-[#1e4f5a] transition-colors"
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request New Form Slide Up */}
      <RequestNewFormSlideUp
        isOpen={showRequestNewForm}
        onClose={() => setShowRequestNewForm(false)}
        onSubmit={handleRequestNewForm}
      />
    </div>
  )
}

export default FormSelectionPage 