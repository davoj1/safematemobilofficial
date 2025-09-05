import React, { useState } from 'react'
import { HeaderWithClose } from '../../components/layout'
import { FormCard, SelectedSiteDisplay } from '../../components/ui'
import takeFiveIcon from '../../assets/takefiveicon.svg'
import vehiclePreStartIcon from '../../assets/vehicleprestarticon.svg'
import reportHazardsIcon from '../../assets/reporthazardsicon.svg'
import fatigueManagementIcon from '../../assets/fatiguemanagementicon.svg'
import workOrderNumberIcon from '../../assets/jobs/workordernumbericon.svg'
import BMAaustralia from '../../assets/minesites/bhp/BMAaustralia.png'

interface BHPForm {
  id: string
  name: string
  icon: string
  status?: 'active' | 'coming-soon'
}

interface BHPFormSelectionPageProps {
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

const BHPFormSelectionPage: React.FC<BHPFormSelectionPageProps> = ({
  contractor,
  selectedSite = {
    id: 'bma-australia',
    name: 'BMA Australia',
    location: 'Bowen Basin, QLD',
    image: BMAaustralia,
  },
  onClose,
  onEditSite,
  onFormSelect,
}) => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null)

  // Define contractor-specific forms based on mine company
  const contractorForms: { [key: string]: BHPForm[] } = {
    warrikal: [
      // Take Control is only available for Warrikal on FMG (not BHP)
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

  const bhpForms: BHPForm[] = [
    {
      id: 'take-5',
      name: 'Take 5',
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
      id: 'jha-builder',
      name: 'JHA Builder',
      icon: takeFiveIcon,
      status: 'coming-soon',
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
      id: 'supervisor-checklist',
      name: 'Supervisor Checklist',
      icon: workOrderNumberIcon,
      status: 'coming-soon',
    },
  ]

  const handleFormSelect = (formId: string) => {
    setSelectedForm(formId)
    console.log('Selected BHP form:', formId)
    onFormSelect?.(formId)
    // Handle form selection - navigate to next step
  }

  const handleClose = () => {
    console.log('Close form selection')
    onClose?.()
  }

  const handleEditSite = () => {
    console.log('Edit site clicked')
    onEditSite?.()
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithClose
        title={contractor ? `Choose a ${contractor.charAt(0).toUpperCase() + contractor.slice(1)} Form` : "Choose a BHP Form"}
        onClose={handleClose}
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 px-4 py-3 space-y-6 overflow-y-auto">
        {/* Selected Site Display */}
        <SelectedSiteDisplay
          name={selectedSite.name}
          location={selectedSite.location}
          image={selectedSite.image}
          onEdit={handleEditSite}
        />

        {/* Forms Section */}
        <div className="space-y-2">
          <h2 className="font-semibold text-[#475467] text-base leading-6">
            Choose your Forms
          </h2>
          
          <div className="space-y-2">
            {(() => {
              // Use contractor forms if contractor is selected, otherwise use BHP forms
              const forms = contractor ? contractorForms[contractor] || [] : bhpForms
              return [...forms]
                .sort((a, b) => {
                  const aComing = a.status === 'coming-soon'
                  const bComing = b.status === 'coming-soon'
                  if (aComing && !bComing) return 1
                  if (!aComing && bComing) return -1
                  return 0
                })
                .map((form) => (
                <FormCard
                  key={form.id}
                  name={form.name}
                  icon={form.icon}
                  onClick={() => form.status !== 'coming-soon' && handleFormSelect(form.id)}
                  status={form.status}
                  disabled={form.status === 'coming-soon'}
                  className={selectedForm === form.id ? 'bg-gray-50' : ''}
                />
              ))
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BHPFormSelectionPage 