import React, { useState } from 'react'
import { cn } from '../../utils/cn'
import ControlSelector from './ControlSelector'

// Import PNG hazard category icons
import commonHazardsIcon from '../../assets/hazardicons/commonhazardsicon.png'
import handInjuryIcon from '../../assets/hazardicons/handandfingerinjuryicon.png'
import energySourceIcon from '../../assets/hazardicons/energysourcesicon.png'
import fireIcon from '../../assets/hazardicons/fireandexplosionsicon.png'
import temperatureIcon from '../../assets/hazardicons/tmperatureicon.png'
import workAreaIcon from '../../assets/hazardicons/workareaicon.png'
import electricalIcon from '../../assets/hazardicons/electricalicon.png'
import fitnessForWorkIcon from '../../assets/hazardicons/fitnessforworkicon.png'
import hotWorksIcon from '../../assets/hazardicons/hotworksicon.png'
import mechanicalIcon from '../../assets/hazardicons/mechanicalicon.png'
import vehicleCollisionIcon from '../../assets/hazardicons/vehiclecollisionicon.png'
import wasteIcon from '../../assets/hazardicons/wasteicon.png'
import noiseIcon from '../../assets/hazardicons/noiseicon.png'
import toxicGasesIcon from '../../assets/hazardicons/toxicgasesicon.png'
import pressureIcon from '../../assets/hazardicons/pressureicon.png'
import biologicalIcon from '../../assets/hazardicons/biologicalicon.png'
import environmentalIcon from '../../assets/hazardicons/environmentalicon.png'
import vehiclePersonInteractionIcon from '../../assets/hazardicons/vehiclepersoninteractionicon.png'
import hazardousSubstancesIcon from '../../assets/hazardicons/hazardoussubstances.png'
import weatherIcon from '../../assets/hazardicons/weathericon.png'
import gravityIcon from '../../assets/hazardicons/gravityicon.png'
import ergonomicsIcon from '../../assets/hazardicons/ergonomicsicon.png'
import whatCanKillYouIcon from '../../assets/hazardicons/whatcankillyouicon.png'

// Import "What can kill you" specific icons
import fallFromHeightIcon from '../../assets/whatcankillyou/fallfromheight.png'
import liftingOperationsIcon from '../../assets/whatcankillyou/liftingoperationsicon.png'
import fallingObjectsIcon from '../../assets/whatcankillyou/fallingobjectsicon.png'
import entanglementAndCrushingIcon from '../../assets/whatcankillyou/entanglementandcrushingicon.png'
import uncontrolledReleaseOfEnergyIcon from '../../assets/whatcankillyou/releaseofenergyicon.png'
import confinedSpaceIcon from '../../assets/whatcankillyou/confinedspacesicon.png'
import vehicleImpactOnPersonIcon from '../../assets/whatcankillyou/vehicleimpactonperson.png'
import vehicleCollisionOrRolloverIcon from '../../assets/whatcankillyou/vehiclecollisionicon.png'
import contactWithElectricityIcon from '../../assets/whatcankillyou/contactwithelectricityicon.png'
import exposureToHazardousSubstancesIcon from '../../assets/whatcankillyou/exposuretohzardoussubstances.png'
import exposureToThermalExtremesIcon from '../../assets/whatcankillyou/exposuretothermalextreme.png'
import slopeFailureIcon from '../../assets/whatcankillyou/slopefailureicon.png'
import drowningIcon from '../../assets/whatcankillyou/drowningicon.png'
import exposureToDustAndFumesIcon from '../../assets/whatcankillyou/exposuretodustfumesicon.png'
import unplannedInitiationOfExplosivesIcon from '../../assets/whatcankillyou/unplannedexplosicesicon.png'
import mooringOperationsIcon from '../../assets/whatcankillyou/mooringoperationsicon.png'
import contactWithMoltenMaterialIcon from '../../assets/whatcankillyou/contactwithmoltenmaterialicon.png'
import vehicleAutonomousHaulageOperationsIcon from '../../assets/whatcankillyou/haulageoperationsicon.png'
import remoteTransportLocationIcon from '../../assets/whatcankillyou/remotetransporticon.png'
import culturalHeritageIcon from '../../assets/whatcankillyou/culturalheritageicon.png'

interface HazardCategory {
  id: string
  name: string
  icon: string
  count?: number
}

interface Hazard {
  id: string
  name: string
  icon: string
  category: string
}

interface HazardSelectorProps {
  selectedHazards: string[]
  onHazardToggle: (hazardId: string) => void
  onCategoryChange?: (category: string | null) => void
  onControlScreenChange?: (isInControlScreen: boolean, hazardName?: string) => void
  currentCategory?: string | null
  isInControlScreen?: boolean
  className?: string
}

interface Control {
  id: string
  name: string
  hazardId: string
}

const otherCategories: HazardCategory[] = [
  {
    id: 'common-hazards',
    name: 'Common Hazards',
    icon: commonHazardsIcon
  }
]

const hazardCategories: HazardCategory[] = [
  {
    id: 'what-can-kill-you',
    name: 'What can kill you',
    icon: whatCanKillYouIcon
  },
  {
    id: 'hand-injuries',
    name: 'Hand or Finger Injury',
    icon: handInjuryIcon
  },
  {
    id: 'hot-works',
    name: 'Hot Work',
    icon: hotWorksIcon
  },
  {
    id: 'energy-source',
    name: 'Energy sources',
    icon: energySourceIcon
  },
  {
    id: 'waste',
    name: 'Waste',
    icon: wasteIcon
  },
  {
    id: 'vehicle-collision',
    name: 'Vehicle collision',
    icon: vehicleCollisionIcon
  },
  {
    id: 'mechanical',
    name: 'Mechanical',
    icon: mechanicalIcon
  },
  {
    id: 'temperature',
    name: 'Heat / Cold',
    icon: temperatureIcon
  },
  {
    id: 'work-area',
    name: 'Work Area',
    icon: workAreaIcon
  },
  {
    id: 'ergonomics',
    name: 'Ergonomics',
    icon: ergonomicsIcon
  },
  {
    id: 'gravity',
    name: 'Gravity',
    icon: gravityIcon
  },
  {
    id: 'electrical',
    name: 'Electrical / Magnetic',
    icon: electricalIcon
  },
  {
    id: 'fitness-for-work',
    name: 'Fitness for Work',
    icon: fitnessForWorkIcon
  },
  {
    id: 'noise',
    name: 'Noise',
    icon: noiseIcon
  },
  {
    id: 'toxic-gases',
    name: 'Toxic Gasses',
    icon: toxicGasesIcon
  },
  {
    id: 'fire-explosion',
    name: 'Fire / Explosion',
    icon: fireIcon
  },
  {
    id: 'biological',
    name: 'Biological',
    icon: biologicalIcon
  },
  {
    id: 'pressure',
    name: 'Pressure',
    icon: pressureIcon
  },
  {
    id: 'climatic-natural',
    name: 'Climatic / Natural Events',
    icon: weatherIcon
  },
  {
    id: 'hazardous-substances',
    name: 'Hazardous Substances',
    icon: hazardousSubstancesIcon
  },
  {
    id: 'vehicle-person-interaction',
    name: 'Vehicle / Person interaction',
    icon: vehiclePersonInteractionIcon
  },
  {
    id: 'natural-environment',
    name: 'Natural Environment / Ecosystem',
    icon: environmentalIcon
  }
]

const whatCanKillYouHazards: Hazard[] = [
  {
    id: 'fall-from-height',
    name: 'Fall from height',
    icon: fallFromHeightIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'lifting-operations',
    name: 'Lifting operations',
    icon: liftingOperationsIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'falling-objects',
    name: 'Falling objects',
    icon: fallingObjectsIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'entanglement-and-crushing',
    name: 'Entanglement and crushing',
    icon: entanglementAndCrushingIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'uncontrolled-release-of-energy',
    name: 'Uncontrolled release of energy',
    icon: uncontrolledReleaseOfEnergyIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'confined-space',
    name: 'Confined Space',
    icon: confinedSpaceIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'vehicle-impact-on-person',
    name: 'Vehicle impact on person',
    icon: vehicleImpactOnPersonIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'vehicle-collision-or-rollover',
    name: 'Vehicle collision or rollover',
    icon: vehicleCollisionOrRolloverIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'contact-with-electricity',
    name: 'Contact with electricity',
    icon: contactWithElectricityIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'exposure-to-hazardous-substances',
    name: 'Exposure to hazardous substances',
    icon: exposureToHazardousSubstancesIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'exposure-to-thermal-extremes',
    name: 'Exposure to Thermal Extremes',
    icon: exposureToThermalExtremesIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'slope-failure',
    name: 'Slope Failure',
    icon: slopeFailureIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'drowning',
    name: 'Drowning',
    icon: drowningIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'exposure-to-dust-and-fumes',
    name: 'Exposure to Dust and Fumes',
    icon: exposureToDustAndFumesIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'unplanned-initiation-of-explosives',
    name: 'Unplanned Initiation of Explosives',
    icon: unplannedInitiationOfExplosivesIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'mooring-operations',
    name: 'Mooring Operations',
    icon: mooringOperationsIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'contact-with-molten-material',
    name: 'Contact with Molten Material',
    icon: contactWithMoltenMaterialIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'vehicle-autonomous-haulage-operations',
    name: 'Vehicle Autonomous Haulage Operations',
    icon: vehicleAutonomousHaulageOperationsIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'remote-transport-location',
    name: 'Remote Transport Location',
    icon: remoteTransportLocationIcon,
    category: 'what-can-kill-you'
  },
  {
    id: 'cultural-heritage',
    name: 'Cultural Heritage',
    icon: culturalHeritageIcon,
    category: 'what-can-kill-you'
  }
]

const HazardSelector: React.FC<HazardSelectorProps> = ({
  selectedHazards,
  onHazardToggle,
  onCategoryChange,
  onControlScreenChange,
  currentCategory,
  isInControlScreen,
  className
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedControls, setSelectedControls] = useState<Control[]>([])
  const [showControlSelector, setShowControlSelector] = useState<boolean>(false)
  const [selectedHazardForControls, setSelectedHazardForControls] = useState<string>('')

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    onCategoryChange?.(categoryId)
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
    onCategoryChange?.(null)
  }

  const handleAddControl = (hazardId: string, hazardName: string) => {
    setSelectedHazardForControls(hazardName)
    setShowControlSelector(true)
    onControlScreenChange?.(true, hazardName)
  }

  const handleControlToggle = (controlId: string) => {
    setSelectedControls(prev => {
      const existingControl = prev.find(control => control.id === controlId && control.hazardId === selectedHazardForControls)
      if (existingControl) {
        return prev.filter(control => !(control.id === controlId && control.hazardId === selectedHazardForControls))
      } else {
        return [...prev, { id: controlId, name: controlId, hazardId: selectedHazardForControls }]
      }
    })
  }

  const handleBackFromControls = () => {
    setShowControlSelector(false)
    setSelectedHazardForControls('')
    onControlScreenChange?.(false)
  }

  // Sync internal state with parent state
  React.useEffect(() => {
    if (currentCategory !== undefined) {
      setSelectedCategory(currentCategory)
      if (currentCategory === null) {
        setSearchQuery('')
      }
    }
  }, [currentCategory])

  // Sync control screen state with parent
  React.useEffect(() => {
    if (isInControlScreen !== undefined && !isInControlScreen) {
      setShowControlSelector(false)
      setSelectedHazardForControls('')
    }
  }, [isInControlScreen])

  const currentHazards = selectedCategory === 'what-can-kill-you'
    ? whatCanKillYouHazards
    : []

  const selectedCategoryData = hazardCategories.find(cat => cat.id === selectedCategory)

  if (showControlSelector) {
    const hazardControls = selectedControls.filter(control => control.hazardId === selectedHazardForControls)
    const selectedControlIds = hazardControls.map(control => control.id)
    
    return (
      <ControlSelector
        selectedControls={selectedControlIds}
        onControlToggle={handleControlToggle}
        onBack={handleBackFromControls}
        hazardName={selectedHazardForControls}
        className={className}
      />
    )
  }

  if (selectedCategory === 'what-can-kill-you') {
    // Filter hazards based on search query
    const filteredHazards = whatCanKillYouHazards.filter(hazard =>
      hazard.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
      <div className={cn('space-y-4', className)}>
        {/* Search Input */}
        <div className="space-y-2">
          <div className="bg-white rounded-xl border border-[#eaecf0] px-3.5 py-2.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search your hazard"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-[#667085] text-base placeholder-[#667085] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Category title */}
        <div className="mb-4">
          <h3 className="font-semibold text-[#266273] text-base">
            Selected ({selectedHazards.filter(id => whatCanKillYouHazards.some(hazard => hazard.id === id)).length})
          </h3>
        </div>

        {/* Hazards list */}
        <div className="space-y-1">
          {filteredHazards.map((hazard) => {
            const isSelected = selectedHazards.includes(hazard.id)
            const hazardControls = selectedControls.filter(control => control.hazardId === hazard.id)
            
            return (
              <div key={hazard.id} className="space-y-2">
                <div className="flex items-center justify-between p-1 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <img 
                        src={hazard.icon} 
                        alt={hazard.name} 
                        className="w-8 h-8"
                      />
                    </div>
                    <span className="font-medium text-[#101828] text-base">
                      {hazard.name}
                    </span>
                  </div>
                  <button
                    onClick={() => onHazardToggle(hazard.id)}
                    className={cn(
                      'w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors',
                      isSelected
                        ? 'bg-[#266273] border-[#266273]'
                        : 'bg-white border-[#d0d5dd] hover:border-[#266273]/30'
                    )}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-[#ebfe5c]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
                
                {/* Add Control section - only show when hazard is selected */}
                {isSelected && (
                  <div className="ml-12 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#266273]">
                        Add Control
                      </span>
                      <span className="text-sm text-[#667085]">
                        {hazardControls.length} selected
                      </span>
                    </div>
                    <button 
                      onClick={() => handleAddControl(hazard.id, hazard.name)}
                      className="w-full flex items-center justify-center gap-2 p-2 rounded-lg border border-[#266273] bg-white hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-4 h-4">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5V19M5 12H19" stroke="#266273" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-[#266273]">
                        Add Control
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Other section */}
      <div className="space-y-3">
        <h3 className="font-semibold text-[#266273] text-base">
          Other
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {otherCategories.map((category) => {
            const selectedCount = selectedHazards.includes(category.id) ? 1 : 0

            return (
              <button
                key={category.id}
                onClick={() => onHazardToggle(category.id)}
                className="flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 min-h-[80px] bg-white shadow-sm border-[#eaecf0] hover:border-[#266273]/30 relative"
              >
                {/* Counter badge */}
                {selectedCount > 0 && (
                  <div className="absolute bg-[#2a6c7e] flex items-center justify-center px-2 py-0.5 right-2 top-2 rounded-full">
                    <span className="font-semibold text-[#ebfe5c] text-sm tracking-tight">
                      {selectedCount}
                    </span>
                  </div>
                )}
                
                <div className="w-10 h-10 mb-2 flex items-center justify-center">
                  <img 
                    src={category.icon} 
                    alt={category.name} 
                    className="w-7 h-7"
                  />
                </div>
                <span className="text-sm font-medium text-center leading-tight text-[#101828]">
                  {category.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Categories section */}
      <div className="space-y-3">
        <h3 className="font-semibold text-[#266273] text-base">
          Categories
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {hazardCategories.map((category) => {
            // Count selected hazards for this category
            const selectedCount = category.id === 'what-can-kill-you' 
              ? selectedHazards.filter(id => whatCanKillYouHazards.some(hazard => hazard.id === id)).length
              : selectedHazards.includes(category.id) ? 1 : 0

            return (
              <button
                key={category.id}
                onClick={() => {
                  if (category.id === 'what-can-kill-you') {
                    handleCategorySelect(category.id)
                  } else {
                    onHazardToggle(category.id)
                  }
                }}
                className="flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 min-h-[80px] bg-white shadow-sm border-[#eaecf0] hover:border-[#266273]/30 relative"
              >
                {/* Counter badge */}
                {selectedCount > 0 && (
                  <div className="absolute bg-[#2a6c7e] flex items-center justify-center px-2 py-0.5 right-2 top-2 rounded-full">
                    <span className="font-semibold text-[#ebfe5c] text-sm tracking-tight">
                      {selectedCount}
                    </span>
                  </div>
                )}
                
                <div className="w-10 h-10 mb-2 flex items-center justify-center">
                  <img 
                    src={category.icon} 
                    alt={category.name} 
                    className="w-7 h-7"
                  />
                </div>
                <span className="text-sm font-medium text-center leading-tight text-[#101828]">
                  {category.name} {category.count && `(${category.count})`}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HazardSelector 