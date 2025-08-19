import React, { useState } from 'react'
import { cn } from '../../utils/cn'

// Import control icons
import isolationsIcon from '../../assets/controls/isolations.png'
import ppeArcFlashIcon from '../../assets/controls/ppearcflash.png'
import ppeHandsIcon from '../../assets/controls/ppehands.png'
import ppeFeetIcon from '../../assets/controls/ppefeet.png'
import ppeEyesIcon from '../../assets/controls/ppeeyes.png'
import ppeHearingIcon from '../../assets/controls/ppehearing.png'
import ppeHeadIcon from '../../assets/controls/ppehead.png'
import ppeClothingIcon from '../../assets/controls/ppeclothingicon.png'
import controlsUsedPreviouslyIcon from '../../assets/controls/controlsusedpreviously.png'
import hazardSpecificSuggestionsIcon from '../../assets/controls/hazardspecifcsuggestionsicon.png'

interface Control {
  id: string
  name: string
  icon: string
  category: string
  options?: ControlOption[]
}

interface ControlOption {
  id: string
  name: string
}

interface ControlSelectorProps {
  selectedControls: string[]
  onControlToggle: (controlId: string) => void
  onBack: () => void
  hazardName: string
  className?: string
}

const controls: Control[] = [
  {
    id: 'hazard-specific-suggestions',
    name: 'Hazard Specific Suggestions',
    icon: hazardSpecificSuggestionsIcon,
    category: 'procedural',
    options: [
      { id: 'use-spotters', name: 'Use spotters when operating heavy machinery in tight areas' },
      { id: 'dust-suppression', name: 'Apply dust suppression methods (water spray, misting)' },
      { id: 'no-go-zones', name: 'Implement "no-go zones" around live equipment' }
    ]
  },
  {
    id: 'controls-used-previously',
    name: 'Other Controls Used Previously',
    icon: controlsUsedPreviouslyIcon,
    category: 'procedural',
    options: [
      { id: 'lessons-learned', name: 'Lessons learned shared in pre-start meetings' },
      { id: 'review-jhas', name: 'Review previous JHAs for similar jobs' },
      { id: 'standard-procedures', name: 'Apply standard safe work procedures from past tasks' }
    ]
  },
  {
    id: 'ppe-clothing',
    name: 'PPE - Clothing',
    icon: ppeClothingIcon,
    category: 'ppe',
    options: [
      { id: 'flame-retardant', name: 'Flame-retardant coveralls for hot work' },
      { id: 'high-visibility', name: 'High-visibility long-sleeve shirt' },
      { id: 'long-pants', name: 'Long pants to protect from abrasions and burns' }
    ]
  },
  {
    id: 'ppe-head',
    name: 'PPE - Head',
    icon: ppeHeadIcon,
    category: 'ppe',
    options: [
      { id: 'hard-hat-strap', name: 'Hard hat with chin strap in windy conditions' },
      { id: 'bump-cap', name: 'Bump cap in low-clearance areas' },
      { id: 'face-shield', name: 'Face shield attachment for grinding or cutting' }
    ]
  },
  {
    id: 'ppe-hearing',
    name: 'PPE - Hearing',
    icon: ppeHearingIcon,
    category: 'ppe',
    options: [
      { id: 'disposable-earplugs', name: 'Disposable earplugs for short-duration high noise' },
      { id: 'earmuffs', name: 'Earmuffs for prolonged exposure' },
      { id: 'communication-headsets', name: 'Communication headsets in high-noise environments' }
    ]
  },
  {
    id: 'ppe-eyes',
    name: 'PPE - Eyes',
    icon: ppeEyesIcon,
    category: 'ppe',
    options: [
      { id: 'tinted-glasses', name: 'Tinted safety glasses for outdoor glare' },
      { id: 'chemical-goggles', name: 'Chemical splash goggles in handling areas' },
      { id: 'prescription-glasses', name: 'Prescription safety glasses where required' }
    ]
  },
  {
    id: 'ppe-feet',
    name: 'PPE - Feet',
    icon: ppeFeetIcon,
    category: 'ppe',
    options: [
      { id: 'steel-toe', name: 'Steel-toe boots for crush protection' },
      { id: 'slip-resistant', name: 'Slip-resistant soles for wet or oily floors' },
      { id: 'metatarsal-guards', name: 'Metatarsal guards in high impact zones' }
    ]
  },
  {
    id: 'ppe-hands',
    name: 'PPE - Hands',
    icon: ppeHandsIcon,
    category: 'ppe',
    options: [
      { id: 'cut-resistant', name: 'Cut-resistant gloves for sharp materials' },
      { id: 'nitrile-gloves', name: 'Nitrile gloves for chemical handling' },
      { id: 'impact-resistant', name: 'Impact-resistant gloves for power tools' }
    ]
  },
  {
    id: 'ppe-arc-flash',
    name: 'PPE - Arc Flash',
    icon: ppeArcFlashIcon,
    category: 'ppe',
    options: [
      { id: 'arc-face-shield', name: 'Full arc-rated face shield with balaclava' },
      { id: 'arc-clothing', name: 'Arc-rated flame-resistant clothing' },
      { id: 'insulated-gloves', name: 'Insulated gloves rated for electrical tasks' }
    ]
  },
  {
    id: 'isolations',
    name: 'Isolation',
    icon: isolationsIcon,
    category: 'engineering',
    options: [
      { id: 'loto-procedures', name: 'Lock-out tag-out (LOTO) procedures on energy sources' },
      { id: 'barricading', name: 'Barricading live work areas with physical barriers' },
      { id: 'permit-to-work', name: 'Permit-to-work system for hot work or confined spaces' }
    ]
  }
]

const ControlSelector: React.FC<ControlSelectorProps> = ({
  selectedControls,
  onControlToggle,
  onBack,
  hazardName,
  className
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [expandedControls, setExpandedControls] = useState<string[]>([])
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  // Filter controls based on search query
  const filteredControls = controls.filter(control =>
    control.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleControlToggle = (controlId: string) => {
    setExpandedControls(prev => 
      prev.includes(controlId) 
        ? prev.filter(id => id !== controlId)
        : [...prev, controlId]
    )
  }

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    )
  }

  const getSelectedCount = (controlId: string) => {
    const control = controls.find(c => c.id === controlId)
    if (!control?.options) return 0
    return control.options.filter(option => selectedOptions.includes(option.id)).length
  }

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
              placeholder="Search controls"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-[#667085] text-base placeholder-[#667085] outline-none"
            />
          </div>
        </div>
      </div>

                {/* Title */}
          <div className="mb-4">
            <h3 className="font-semibold text-[#266273] text-base">
              Selected ({selectedOptions.length})
            </h3>
          </div>

      {/* Controls list */}
      <div className="space-y-1">
        {filteredControls.map((control) => {
          const isExpanded = expandedControls.includes(control.id)
          const selectedCount = getSelectedCount(control.id)
          
          return (
            <div key={control.id} className="space-y-1">
              <button
                onClick={() => handleControlToggle(control.id)}
                className="w-full flex items-center justify-between p-1 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img 
                      src={control.icon} 
                      alt={control.name} 
                      className="w-8 h-8"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#101828] text-base">
                      {control.name}
                    </span>
                    {selectedCount > 0 && (
                      <span className="text-sm text-[#667085]">
                        ({selectedCount})
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-2">
                  <svg 
                    className={cn(
                      'w-5 h-5 transition-transform',
                      isExpanded ? 'text-[#266273] rotate-90' : 'text-[#667085]'
                    )} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
              
              {/* Expanded options */}
              {isExpanded && control.options && (
                <div className="ml-12 space-y-1">
                  {control.options.map((option) => {
                    const isOptionSelected = selectedOptions.includes(option.id)
                    return (
                      <div
                        key={option.id}
                        className="flex items-start justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm text-[#101828] flex-1 leading-relaxed">
                          {option.name}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOptionToggle(option.id)
                          }}
                          className={cn(
                            'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 mt-0.5',
                            isOptionSelected
                              ? 'bg-[#266273] border-[#266273]'
                              : 'bg-white border-[#d0d5dd] hover:border-[#266273]/30'
                          )}
                        >
                          {isOptionSelected && (
                            <svg className="w-3 h-3 text-[#ebfe5c]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ControlSelector 