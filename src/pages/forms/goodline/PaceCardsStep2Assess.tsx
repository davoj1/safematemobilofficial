import React, { useState } from 'react'
import { Button } from '../../../components/ui'
import { cn } from '../../../utils/cn'

// Import "What can kill you" hazard icons
import fallFromHeightIcon from '../../../assets/whatcankillyou/fallfromheight.png'
import liftingOperationsIcon from '../../../assets/whatcankillyou/liftingoperationsicon.png'
import fallingObjectsIcon from '../../../assets/whatcankillyou/fallingobjectsicon.png'
import entanglementAndCrushingIcon from '../../../assets/whatcankillyou/entanglementandcrushingicon.png'
import uncontrolledReleaseOfEnergyIcon from '../../../assets/whatcankillyou/releaseofenergyicon.png'
import confinedSpaceIcon from '../../../assets/whatcankillyou/confinedspacesicon.png'
import vehicleImpactOnPersonIcon from '../../../assets/whatcankillyou/vehicleimpactonperson.png'
import vehicleCollisionOrRolloverIcon from '../../../assets/whatcankillyou/vehiclecollisionicon.png'
import contactWithElectricityIcon from '../../../assets/whatcankillyou/contactwithelectricityicon.png'
import exposureToHazardousSubstancesIcon from '../../../assets/whatcankillyou/exposuretohzardoussubstances.png'
import exposureToThermalExtremesIcon from '../../../assets/whatcankillyou/exposuretothermalextreme.png'
import slopeFailureIcon from '../../../assets/whatcankillyou/slopefailureicon.png'
import drowningIcon from '../../../assets/whatcankillyou/drowningicon.png'
import exposureToDustAndFumesIcon from '../../../assets/whatcankillyou/exposuretodustfumesicon.png'
import unplannedInitiationOfExplosivesIcon from '../../../assets/whatcankillyou/unplannedexplosicesicon.png'
import mooringOperationsIcon from '../../../assets/whatcankillyou/mooringoperationsicon.png'
import contactWithMoltenMaterialIcon from '../../../assets/whatcankillyou/contactwithmoltenmaterialicon.png'
import vehicleAutonomousHaulageOperationsIcon from '../../../assets/whatcankillyou/haulageoperationsicon.png'
import remoteTransportLocationIcon from '../../../assets/whatcankillyou/remotetransporticon.png'
import culturalHeritageIcon from '../../../assets/whatcankillyou/culturalheritageicon.png'

interface PaceCardsStep2AssessProps {
  selectedHazards: string[]
  likelihood: string
  consequence: string
  riskRating: string
  onNext: (selectedHazards: string[], likelihood: string, consequence: string, riskRating: string) => void
  onBack: () => void
}

const PaceCardsStep2Assess: React.FC<PaceCardsStep2AssessProps> = ({
  selectedHazards,
  likelihood,
  consequence,
  riskRating,
  onNext,
  onBack,
}) => {
  const [hazards, setHazards] = useState<string[]>(selectedHazards)
  const [currentLikelihood, setCurrentLikelihood] = useState(likelihood)
  const [currentConsequence, setCurrentConsequence] = useState(consequence)
  const [currentRiskRating, setCurrentRiskRating] = useState(riskRating)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const hazardOptions = [
    {
      id: 'fall-from-height',
      name: 'Fall from Height',
      icon: fallFromHeightIcon
    },
    {
      id: 'lifting-operations',
      name: 'Lifting Operations',
      icon: liftingOperationsIcon
    },
    {
      id: 'falling-objects',
      name: 'Falling Objects',
      icon: fallingObjectsIcon
    },
    {
      id: 'entanglement-crushing',
      name: 'Entanglement and Crushing',
      icon: entanglementAndCrushingIcon
    },
    {
      id: 'uncontrolled-release-energy',
      name: 'Uncontrolled Release of Energy',
      icon: uncontrolledReleaseOfEnergyIcon
    },
    {
      id: 'confined-spaces',
      name: 'Confined Spaces',
      icon: confinedSpaceIcon
    },
    {
      id: 'vehicle-impact-person',
      name: 'Vehicle Impact on Person',
      icon: vehicleImpactOnPersonIcon
    },
    {
      id: 'vehicle-collision-rollover',
      name: 'Vehicle Collision or Rollover',
      icon: vehicleCollisionOrRolloverIcon
    },
    {
      id: 'contact-electricity',
      name: 'Contact with Electricity',
      icon: contactWithElectricityIcon
    },
    {
      id: 'exposure-hazardous-substances',
      name: 'Exposure to Hazardous Substances',
      icon: exposureToHazardousSubstancesIcon
    },
    {
      id: 'exposure-thermal-extremes',
      name: 'Exposure to Thermal Extremes',
      icon: exposureToThermalExtremesIcon
    },
    {
      id: 'slope-failure',
      name: 'Slope Failure',
      icon: slopeFailureIcon
    },
    {
      id: 'drowning',
      name: 'Drowning',
      icon: drowningIcon
    },
    {
      id: 'exposure-dust-fumes',
      name: 'Exposure to Dust and Fumes',
      icon: exposureToDustAndFumesIcon
    },
    {
      id: 'unplanned-explosives',
      name: 'Unplanned Initiation of Explosives',
      icon: unplannedInitiationOfExplosivesIcon
    },
    {
      id: 'mooring-operations',
      name: 'Mooring Operations',
      icon: mooringOperationsIcon
    },
    {
      id: 'contact-molten-material',
      name: 'Contact with Molten Material',
      icon: contactWithMoltenMaterialIcon
    },
    {
      id: 'haulage-operations',
      name: 'Haulage Operations',
      icon: vehicleAutonomousHaulageOperationsIcon
    },
    {
      id: 'remote-transport',
      name: 'Remote Transport',
      icon: remoteTransportLocationIcon
    },
    {
      id: 'cultural-heritage',
      name: 'Cultural Heritage',
      icon: culturalHeritageIcon
    }
  ]

  const likelihoodOptions = [
    { value: 'A', label: 'A - Almost Certain', color: '#DC2626' },
    { value: 'B', label: 'B - Likely', color: '#DC2626' },
    { value: 'C', label: 'C - Possible', color: '#FFC107' },
    { value: 'D', label: 'D - Unlikely', color: '#47CD89' },
    { value: 'E', label: 'E - Rare', color: '#47CD89' }
  ]

  const consequenceOptions = [
    { value: '1', label: '1 - Negligible', color: '#47CD89' },
    { value: '2', label: '2 - Minor', color: '#47CD89' },
    { value: '3', label: '3 - Moderate', color: '#FFC107' },
    { value: '4', label: '4 - Major', color: '#DC2626' },
    { value: '5', label: '5 - Catastrophic', color: '#DC2626' }
  ]

  const riskRatingOptions = [
    { value: 'Low', label: 'Low', color: '#47CD89' },
    { value: 'Mod', label: 'Moderate', color: '#FFC107' },
    { value: 'High', label: 'High', color: '#DC2626' },
    { value: 'Ext', label: 'Extreme', color: '#DC2626' }
  ]

  const handleHazardToggle = (hazardId: string) => {
    setHazards(prev => 
      prev.includes(hazardId) 
        ? prev.filter(h => h !== hazardId)
        : [...prev, hazardId]
    )
  }

  const handleNext = () => {
    onNext(hazards, currentLikelihood, currentConsequence, currentRiskRating)
  }

  const isFormValid = hazards.length > 0 && currentLikelihood && currentConsequence && currentRiskRating

  return (
    <>
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto">
        {/* Step Title */}
        <div className="text-center space-y-2">
          <h1 className="font-bold text-[#266273] text-xl leading-7">
            Assess the Hazards
          </h1>
          <p className="text-[#667085] text-base font-normal leading-6">
            Determine the Hazards you will or may come in contact with
          </p>
        </div>

        {/* Hazard Selection */}
        <div className="space-y-4">
          <h2 className="font-semibold text-[#344054] text-base leading-6">
            Select Hazards
          </h2>
          
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

          {/* Selected count */}
          <div className="mb-4">
            <h3 className="font-semibold text-[#266273] text-base">
              Selected ({hazards.length})
            </h3>
          </div>

          {/* Hazards list with tickbox styling */}
          <div className="space-y-1">
            {hazardOptions
              .filter(hazard => 
                hazard.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((hazard) => {
                const isSelected = hazards.includes(hazard.id)
                
                return (
                  <div key={hazard.id} className="flex items-center justify-between p-1 rounded-lg hover:bg-gray-50 transition-colors">
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
                      onClick={() => handleHazardToggle(hazard.id)}
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
                )
              })}
          </div>
        </div>

        {/* Risk Rating */}
        <div className="space-y-4">
          <h2 className="font-semibold text-[#344054] text-base leading-6">
            Risk Rating
          </h2>
          
          {/* Likelihood */}
          <div className="space-y-3">
            <h3 className="font-medium text-[#344054] text-sm leading-5">
              Likelihood
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {likelihoodOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setCurrentLikelihood(option.value)}
                  className={`p-3 rounded-xl border text-left font-medium text-sm leading-5 transition-all ${
                    currentLikelihood === option.value
                      ? 'border-white text-white'
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                  style={{
                    backgroundColor: currentLikelihood === option.value ? option.color : undefined,
                    borderColor: currentLikelihood === option.value ? option.color : undefined,
                    color: currentLikelihood === option.value ? 'white' : undefined
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Consequence */}
          <div className="space-y-3">
            <h3 className="font-medium text-[#344054] text-sm leading-5">
              Consequence
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {consequenceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setCurrentConsequence(option.value)}
                  className={`p-3 rounded-xl border text-left font-medium text-sm leading-5 transition-all ${
                    currentConsequence === option.value
                      ? 'border-white text-white'
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                  style={{
                    backgroundColor: currentConsequence === option.value ? option.color : undefined,
                    borderColor: currentConsequence === option.value ? option.color : undefined,
                    color: currentConsequence === option.value ? 'white' : undefined
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Risk Rating */}
          <div className="space-y-3">
            <h3 className="font-medium text-[#344054] text-sm leading-5">
              Risk Rating
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {riskRatingOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setCurrentRiskRating(option.value)}
                  className={`p-3 rounded-xl border text-center font-medium text-sm leading-5 transition-all ${
                    currentRiskRating === option.value
                      ? `bg-[${option.color}] border-[${option.color}] text-white`
                      : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                  }`}
                  style={{
                    backgroundColor: currentRiskRating === option.value ? option.color : undefined,
                    borderColor: currentRiskRating === option.value ? option.color : undefined,
                    color: currentRiskRating === option.value ? 'white' : undefined
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-[#f8f7f2] border border-[#eaf0f2] rounded-xl p-4 space-y-2">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-[#266273] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold text-[#266273] text-sm leading-5">
                Instructions
              </h4>
              <p className="text-[#667085] text-sm leading-5">
                ✓ Tick the Hazards you may come in contact with. If any potential hazard is circled RED a JHA is Mandatory. Use the Goodline Risk Assessment Matrix to determine level of risk! Circle the Likelihood, Consequence & Risk Rating
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button - Fixed */}
      <div className="px-5 py-3 flex-shrink-0">
        <Button
          onClick={handleNext}
          disabled={!isFormValid}
          className="w-full"
          variant={isFormValid ? 'primary' : 'secondary'}
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default PaceCardsStep2Assess
