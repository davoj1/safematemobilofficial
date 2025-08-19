import React, { useState } from 'react'
import { HeaderWithBack } from '../../components/layout'
import { HazardSelector, Button } from '../../components/ui'

interface HazardSelectionPageProps {
  selectedSite?: {
    id: string
    name: string
    location: string
    image: string
  }
  onBack?: () => void
  onNext?: (formData: HazardSelectionData) => void
}

interface HazardSelectionData {
  selectedHazards: string[]
}

const HazardSelectionPage: React.FC<HazardSelectionPageProps> = ({
  selectedSite,
  onBack,
  onNext,
}) => {
  const [selectedHazards, setSelectedHazards] = useState<string[]>([])
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const [isInControlScreen, setIsInControlScreen] = useState<boolean>(false)
  const [currentHazardName, setCurrentHazardName] = useState<string>('')

  const handleHazardToggle = (hazardId: string) => {
    setSelectedHazards(prev => 
      prev.includes(hazardId)
        ? prev.filter(id => id !== hazardId)
        : [...prev, hazardId]
    )
  }

  const handleNext = () => {
    console.log('Hazard selection data:', { selectedHazards })
    onNext?.({ selectedHazards })
  }

  const handleBack = () => {
    console.log('Back to previous step')
    onBack?.()
  }

  const handleDone = () => {
    // Save selected hazards and return to main hazard screen
    console.log('Done - returning to main hazard screen')
    setCurrentCategory(null)
  }

  const isFormValid = selectedHazards.length > 0

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithBack
        title={
          isInControlScreen 
            ? `${currentHazardName}: Control`
            : currentCategory === 'what-can-kill-you' 
              ? 'What can kill you' 
              : 'Take Control'
        }
        progress={
          isInControlScreen || currentCategory === 'what-can-kill-you' 
            ? undefined 
            : "3/4"
        }
        onBack={
          isInControlScreen 
            ? () => setIsInControlScreen(false)
            : currentCategory === 'what-can-kill-you' 
              ? () => setCurrentCategory(null) 
              : handleBack
        }
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-4 overflow-y-auto">
        {/* Hazard Identification Title - Only show when not in a specific category */}
        {!currentCategory && (
          <div className="text-center">
            <h2 className="font-bold text-[#266273] text-lg leading-7">
              Hazard Identification
            </h2>
          </div>
        )}

        {/* Hazard Selector */}
        <HazardSelector
          selectedHazards={selectedHazards}
          onHazardToggle={handleHazardToggle}
          onCategoryChange={setCurrentCategory}
          onControlScreenChange={(isInControl, hazardName) => {
            setIsInControlScreen(isInControl)
            setCurrentHazardName(hazardName || '')
          }}
          currentCategory={currentCategory}
          isInControlScreen={isInControlScreen}
        />

        {/* Add Another Button */}
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl border border-[#266273] bg-white">
            <div className="w-6 h-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="#344054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-semibold text-[#344054] text-base">
              Add another control
            </span>
          </button>
        </div>

        {/* Note */}
        <div className="text-center">
          <p className="text-[#667085] text-xs">
            🔔 <span className="font-medium">Note:</span> The task involves risk work. Consider if risks are better managed as a Task.
          </p>
        </div>
      </div>

      {/* Bottom Buttons - Fixed */}
      <div className="px-5 py-3 flex-shrink-0">
        {currentCategory === 'what-can-kill-you' ? (
          /* Done button for What can kill you screen */
          <Button
            onClick={handleDone}
            className="w-full"
            variant="primary"
          >
            Done
          </Button>
        ) : (
          /* Previous/Next buttons for main hazard screen */
          <div className="flex gap-4">
            <Button
              onClick={handleBack}
              variant="secondary"
              className="flex-1"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isFormValid}
              className="flex-1"
              variant={isFormValid ? 'primary' : 'secondary'}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default HazardSelectionPage 