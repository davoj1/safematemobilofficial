import React, { useState } from 'react'
import { HeaderWithClose } from '../../components/layout'
import { FormCard, SelectedSiteDisplay } from '../../components/ui'
import takeFiveIcon from '../../assets/takefiveicon.svg'
import vehiclePreStartIcon from '../../assets/vehicleprestarticon.svg'
import reportHazardsIcon from '../../assets/reporthazardsicon.svg'
import fatigueManagementIcon from '../../assets/fatiguemanagementicon.svg'
import BMAaustralia from '../../assets/minesites/bhp/BMAaustralia.png'
import fmgPortHedland from '../../assets/minesites/fmg/fmgporthedland.png'

interface MineForm {
  id: string
  name: string
  icon: string
}

interface FormSelectionPageProps {
  company: 'bhp' | 'fmg'
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
  selectedSite,
  onClose,
  onEditSite,
  onFormSelect,
}) => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null)

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

  // Define forms for each company with company-specific naming
  const mineForms: { [key: string]: MineForm[] } = {
    bhp: [
      {
        id: 'take-5',
        name: 'Take 5',
        icon: takeFiveIcon,
      },
      {
        id: 'vehicle-pre-start',
        name: 'Vehicle Pre Start',
        icon: vehiclePreStartIcon,
      },
      {
        id: 'report-hazard-issue',
        name: 'Report Hazard / Issue',
        icon: reportHazardsIcon,
      },
      {
        id: 'fatigue-management',
        name: 'Fatigue Management',
        icon: fatigueManagementIcon,
      },
    ],
    fmg: [
      {
        id: 'take-control',
        name: 'Take Control',
        icon: takeFiveIcon,
      },
      {
        id: 'vehicle-pre-start',
        name: 'Vehicle Pre Start',
        icon: vehiclePreStartIcon,
      },
      {
        id: 'report-hazard-issue',
        name: 'Report Hazard / Issue',
        icon: reportHazardsIcon,
      },
      {
        id: 'fatigue-management',
        name: 'Fatigue Management',
        icon: fatigueManagementIcon,
      },
    ],
  }

  const forms = mineForms[company] || []

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

  const getCompanyDisplayName = () => {
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
            {forms.map((form) => (
              <FormCard
                key={form.id}
                name={form.name}
                icon={form.icon}
                onClick={() => handleFormSelect(form.id)}
                className={selectedForm === form.id ? 'bg-gray-50' : ''}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormSelectionPage 