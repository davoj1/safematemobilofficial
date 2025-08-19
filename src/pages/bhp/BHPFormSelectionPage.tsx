import React, { useState } from 'react'
import { HeaderWithClose } from '../../components/layout'
import { FormCard, SelectedSiteDisplay } from '../../components/ui'
import takeFiveIcon from '../../assets/takefiveicon.svg'
import vehiclePreStartIcon from '../../assets/vehicleprestarticon.svg'
import reportHazardsIcon from '../../assets/reporthazardsicon.svg'
import fatigueManagementIcon from '../../assets/fatiguemanagementicon.svg'
import BMAaustralia from '../../assets/minesites/bhp/BMAaustralia.png'

interface BHPForm {
  id: string
  name: string
  icon: string
}

interface BHPFormSelectionPageProps {
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

  const bhpForms: BHPForm[] = [
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
        title="Choose a Form"
        progress="2/6"
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
            {bhpForms.map((form) => (
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

export default BHPFormSelectionPage 